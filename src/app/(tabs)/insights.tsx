import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView as RnSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { router } from "expo-router";
import { WeeklyChart } from "@/components/WeeklyChart";
import { ExpensesCard } from "@/components/ExpensesCard";
import { HistoryItem } from "@/components/HistoryItem";
import { WEEKLY_SPENDING, EXPENSES_SUMMARY, HISTORY_ITEMS } from "@/constants/insights_data";

const SafeAreaView = styled(RnSafeAreaView);

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_SMALL = SCREEN_WIDTH < 375;
const H_PADDING = IS_SMALL ? 16 : 24;
const SECTION_MARGIN_TOP = IS_SMALL ? 16 : 24;
const SECTION_MARGIN_BOTTOM = IS_SMALL ? 8 : 12;
const HEADER_PADDING_V = IS_SMALL ? 8 : 12;
const BOTTOM_PADDING = IS_SMALL ? 80 : 100;
const SEPARATOR_HEIGHT = IS_SMALL ? 12 : 20;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: H_PADDING,
    paddingVertical: HEADER_PADDING_V,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#081126',
    fontFamily: 'Roboto-Bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: H_PADDING,
    marginTop: SECTION_MARGIN_TOP,
    marginBottom: SECTION_MARGIN_BOTTOM,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#081126',
    fontFamily: 'Roboto-Bold',
  },
  viewAll: {
    fontSize: 13,
    color: '#081126',
    fontFamily: 'Roboto-Medium',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  chartSection: {
    paddingHorizontal: H_PADDING,
  },
  separator: {
    height: SEPARATOR_HEIGHT,
  },
  expensesCardWrapper: {
    paddingHorizontal: H_PADDING,
    marginBottom: IS_SMALL ? 8 : 12,
  },
})

export default function Insights() {
  const keyExtractor = (item: typeof HISTORY_ITEMS[0]) => item.id;

  const renderItem = ({ item }: { item: typeof HISTORY_ITEMS[0] }) => (
    <View style={{ paddingHorizontal: 16, marginBottom: IS_SMALL ? 8 : 12 }}>
      <HistoryItem item={item} />
    </View>
  );

  const ListHeaderComponent = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.headerButton} onPress={() => router.back()}>
          <Text style={{ fontSize: 18, color: '#081126' }}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Monthly Insights</Text>
        <Pressable style={styles.headerButton}>
          <Text style={{ fontSize: 16, color: '#081126', letterSpacing: 1 }}>•••</Text>
        </Pressable>
      </View>

      {/* Upcoming section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      {/* Weekly chart */}
      <View style={styles.chartSection}>
        <WeeklyChart data={WEEKLY_SPENDING} />
      </View>

      <View style={styles.separator} />

      {/* Expenses card */}
      <View style={styles.expensesCardWrapper}>
        <ExpensesCard
          label={EXPENSES_SUMMARY.label}
          period={EXPENSES_SUMMARY.period}
          amount={EXPENSES_SUMMARY.amount}
          changePercent={EXPENSES_SUMMARY.changePercent}
        />
      </View>

      {/* History section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>History</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>
    </>
  );

  const ListFooterComponent = () => (
    <View style={{ height: BOTTOM_PADDING }} />
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={HISTORY_ITEMS}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews
      />
    </SafeAreaView>
  );
}
