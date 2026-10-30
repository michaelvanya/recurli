import { memo, useCallback } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import type { HistoryItem as HistoryItemData } from '@/constants/insights_data'
import { handleSelect } from './actions'

type HistoryItemProps = {
  item: HistoryItemData
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const IS_SMALL = SCREEN_WIDTH < 375
const ICON_SIZE = IS_SMALL ? 54 : 66
const MIN_HEIGHT = IS_SMALL ? 86 : 100
const NAME_SIZE = IS_SMALL ? 18 : 22
const PRICE_SIZE = IS_SMALL ? 17 : 21

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: IS_SMALL ? 8 : 12,
  },
  card: {
    minHeight: MIN_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: IS_SMALL ? 14 : 18,
    paddingVertical: IS_SMALL ? 12 : 16,
  },
  iconBox: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginRight: IS_SMALL ? 12 : 16,
  },
  iconText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#081126',
    fontFamily: 'Roboto-Bold',
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontSize: NAME_SIZE,
    fontWeight: '700',
    color: '#081126',
    fontFamily: 'Roboto-Bold',
  },
  date: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 8,
    fontFamily: 'Roboto-Medium',
  },
  priceSection: {
    alignItems: 'flex-end',
    paddingLeft: 8,
  },
  price: {
    fontSize: PRICE_SIZE,
    fontWeight: '700',
    color: '#081126',
    fontFamily: 'Roboto-Bold',
  },
  period: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 8,
    fontFamily: 'Roboto-Medium',
  },
})

function HistoryItemBase({ item }: HistoryItemProps) {
  const onPress = useCallback(() => handleSelect(item.name), [item.name])

  return (
    <View style={styles.itemContainer}>
      <Pressable style={[styles.card, { backgroundColor: item.bgColor }]} onPress={onPress}>
        <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
          <Text style={styles.iconText}>{item.icon}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View style={styles.priceSection}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <Text style={styles.period}>per month</Text>
        </View>
      </Pressable>
    </View>
  )
}

export const HistoryItem = memo(HistoryItemBase)
