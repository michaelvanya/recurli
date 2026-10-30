import { memo, useCallback, useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  panel: {
    backgroundColor: '#fff9e3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 32,
    maxHeight: '80%',
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#081126',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff8e7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#081126',
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff8e7',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  chipSelected: {
    backgroundColor: '#ea7a53',
    borderColor: '#ea7a53',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#081126',
  },
  chipTextSelected: {
    color: '#fff9e3',
  },
  priceRangeContainer: {
    gap: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#081126',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#fff8e7',
    borderRadius: 2,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#ea7a53',
    borderRadius: 2,
  },
  applyButton: {
    backgroundColor: '#ea7a53',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff9e3',
  },
  clearButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.5)',
  },
})

export type FilterOptions = {
  planType: string[]
  maxPrice: number
}

type FilterPanelProps = {
  visible: boolean
  onClose: () => void
  onApply: (filters: FilterOptions) => void
  currentFilters: FilterOptions
}

const PLAN_TYPES = ['All', 'Basic', 'Family', 'Premium', 'Standard', 'Professional']

function FilterPanelBase({ visible, onClose, onApply, currentFilters }: FilterPanelProps) {
  const [selectedPlans, setSelectedPlans] = useState<string[]>(() => {
    if (currentFilters.planType.length === 0 || currentFilters.planType.includes('All')) {
      return ['All']
    }
    return currentFilters.planType
  })
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice)

  const togglePlan = useCallback((plan: string) => {
    setSelectedPlans((prev) => {
      if (plan === 'All') {
        return ['All']
      }
      if (prev.includes('All')) {
        return [plan]
      }
      if (prev.includes(plan)) {
        const next = prev.filter((p) => p !== plan)
        return next.length === 0 ? ['All'] : next
      }
      return [...prev, plan]
    })
  }, [])

  const handleApply = useCallback(() => {
    const planFilter = selectedPlans[0] === 'All' ? [] : selectedPlans
    onApply({ planType: planFilter, maxPrice })
    onClose()
  }, [selectedPlans, maxPrice, onApply, onClose])

  const handleClear = useCallback(() => {
    setSelectedPlans(['All'])
    setMaxPrice(100)
  }, [])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.panel} onPress={() => {}}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Filters</Text>
            <Pressable style={styles.closeBtn} onPress={handleClose}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Plan Type</Text>
              <View style={styles.chipRow}>
                {PLAN_TYPES.map((plan) => {
                  const isSelected = selectedPlans.includes(plan)
                  return (
                    <TouchableOpacity
                      key={plan}
                      style={[styles.chip, isSelected && styles.chipSelected]}
                      onPress={() => togglePlan(plan)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                        {plan}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Max Price per Month</Text>
              <View style={styles.priceRangeContainer}>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Price range</Text>
                  <Text style={styles.priceValue}>${maxPrice}/mo</Text>
                </View>
                <View style={styles.sliderTrack}>
                  <View style={[styles.sliderFill, { width: `${maxPrice}%` }]} />
                </View>
                <View style={styles.chipRow}>
                  {[25, 50, 75, 100].map((value) => (
                    <TouchableOpacity
                      key={value}
                      style={[styles.chip, maxPrice === value && styles.chipSelected]}
                      onPress={() => setMaxPrice(value)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.chipText, maxPrice === value && styles.chipTextSelected]}>
                        ${value}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>

          <Pressable style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </Pressable>

          <Pressable style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>Clear all filters</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export const FilterPanel = memo(FilterPanelBase)
