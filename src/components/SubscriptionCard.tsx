import { memo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { HomeSubscription } from '@/components/types'

const styles = StyleSheet.create({
  cardWrapper: {
    gap: 0,
  },
  card: {
    backgroundColor: '#fff8e7',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  cardSelected: {
    backgroundColor: '#7ec8b8',
    borderColor: 'rgba(0,0,0,0.12)',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLetter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardInfo: {
    flex: 1,
  },
  subName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#081126',
  },
  subPlan: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
    marginTop: 2,
  },
  cardPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#081126',
  },
  periodText: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.5)',
    marginTop: 2,
  },
  detailPanel: {
    backgroundColor: '#7ec8b8',
    borderRadius: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 16,
    paddingTop: 12,
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    marginTop: -4,
    overflow: 'hidden',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#081126',
  },
  detailButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  detailButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#081126',
  },
  cancelButton: {
    backgroundColor: '#081126',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
})

type SubscriptionCardProps = {
  item: HomeSubscription
  isSelected: boolean
  onPress: () => void
}

function SubscriptionCardBase({ item, isSelected, onPress }: SubscriptionCardProps) {
  const price = typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price
  const period = item.billing === 'Yearly' ? '1 year' : '1 month'
  const iconColor = item.color.replace('bg-[', '').replace(']', '') || '#ea7a53'

  return (
    <View style={styles.cardWrapper}>
      <Pressable
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={onPress}
      >
        <View style={styles.cardRow}>
          <View style={[styles.iconBox, { backgroundColor: isSelected ? '#fff' : '#f5f0dc' }]}>
            <View style={[styles.iconCircle, { backgroundColor: iconColor }]}>
              <Text style={styles.iconLetter}>{item.icon}</Text>
            </View>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.subName}>{item.name}</Text>
            <Text style={styles.subPlan}>{item.plan}</Text>
          </View>
          <View style={styles.cardPrice}>
            <Text style={styles.priceText}>{price}</Text>
            <Text style={styles.periodText}>{period}</Text>
          </View>
        </View>
      </Pressable>

      {isSelected && <SubscriptionDetail item={item} />}
    </View>
  )
}

export const SubscriptionCard = memo(SubscriptionCardBase)

type SubscriptionDetailProps = {
  item: HomeSubscription
}

function SubscriptionDetailBase({ item }: SubscriptionDetailProps) {
  return (
    <View style={styles.detailPanel}>
      <View style={styles.detailRow}>
        <View style={styles.detailLeft}>
          <Text style={styles.detailLabel}>Payment info:</Text>
          <Text style={styles.detailValue}>{item.paymentMethod}</Text>
        </View>
        <Pressable style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Manage</Text>
        </Pressable>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.detailLeft}>
          <Text style={styles.detailLabel}>Plan details:</Text>
          <Text style={styles.detailValue}>{item.category}</Text>
        </View>
        <Pressable style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Change</Text>
        </Pressable>
      </View>

      <Pressable style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
      </Pressable>
    </View>
  )
}

export const SubscriptionDetail = memo(SubscriptionDetailBase)
