import { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView as RnSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterPanel, type FilterOptions } from "@/components/FilterPanel";
import { useSubscriptions } from "@/contexts/SubscriptionContext";
import type { HomeSubscription } from "@/components/types";

const SafeAreaView = styled(RnSafeAreaView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9e3',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#081126',
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
    gap: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
  },
  activeFiltersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
    flexWrap: 'wrap',
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#ea7a53',
    gap: 6,
  },
  activeFilterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff9e3',
  },
  activeFilterRemove: {
    fontSize: 14,
    color: '#fff9e3',
  },
});

const defaultFilters: FilterOptions = {
  planType: [],
  maxPrice: 100,
};

export default function Subscriptions() {
  const { subscriptions } = useSubscriptions();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const toggleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleApplyFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(defaultFilters);
    setSearchText('');
  }, []);

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub: HomeSubscription) => {
      const searchLower = searchText.toLowerCase()
      const matchesSearch = searchLower === '' ||
        sub.name.toLowerCase().includes(searchLower) ||
        sub.plan.toLowerCase().includes(searchLower)

      const matchesPlan = filters.planType.length === 0 ||
        filters.planType.includes(sub.category)

      const priceValue = typeof sub.price === 'number' ? sub.price : 0
      const monthlyPrice = sub.billing === 'Yearly' ? priceValue / 12 : priceValue
      const matchesPrice = monthlyPrice <= filters.maxPrice

      return matchesSearch && matchesPlan && matchesPrice
    })
  }, [subscriptions, searchText, filters])

  const hasActiveFilters = searchText.length > 0 || filters.planType.length > 0 || filters.maxPrice < 100

  return (
    <SafeAreaView className="flex-1" style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Subscriptions</Text>
      </View>

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        onFilterPress={() => setShowFilterPanel(true)}
        isFilterActive={hasActiveFilters}
      />

      {hasActiveFilters && (
        <View style={styles.activeFiltersContainer}>
          {searchText && (
            <View style={styles.activeFilterChip}>
              <Text style={styles.activeFilterText}>{`"${searchText}"`}</Text>
              <Text style={styles.activeFilterRemove} onPress={() => setSearchText('')}>✕</Text>
            </View>
          )}
          {filters.planType.map((plan) => (
            <View key={plan} style={styles.activeFilterChip}>
              <Text style={styles.activeFilterText}>{plan}</Text>
              <Text
                style={styles.activeFilterRemove}
                onPress={() => setFilters((prev) => ({
                  ...prev,
                  planType: prev.planType.filter((p) => p !== plan),
                }))}
              >✕</Text>
            </View>
          ))}
          {filters.maxPrice < 100 && (
            <View style={styles.activeFilterChip}>
              <Text style={styles.activeFilterText}>≤${filters.maxPrice}/mo</Text>
              <Text
                style={styles.activeFilterRemove}
                onPress={() => setFilters((prev) => ({ ...prev, maxPrice: 100 }))}
              >✕</Text>
            </View>
          )}
          <Text
            style={[styles.activeFilterText, { color: '#ea7a53', marginLeft: 4 }]}
            onPress={clearAllFilters}
          >
            Clear all
          </Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {filteredSubscriptions.length > 0 ? (
          filteredSubscriptions.map((sub) => (
            <SubscriptionCard
              key={sub.id}
              item={sub}
              isSelected={selectedId === sub.id}
              onPress={() => toggleSelect(sub.id)}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No subscriptions found</Text>
          </View>
        )}
      </ScrollView>

      <FilterPanel
        visible={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />
    </SafeAreaView>
  );
}
