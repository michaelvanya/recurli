import { memo } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

type ExpensesCardProps = {
  label: string
  period: string
  amount: number
  changePercent: number
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const IS_SMALL = SCREEN_WIDTH < 375
const PADDING = IS_SMALL ? 12 : 16
const LABEL_SIZE = IS_SMALL ? 14 : 16
const AMOUNT_SIZE = IS_SMALL ? 17 : 20

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5eed4',
    borderRadius: 16,
    padding: PADDING,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
  },
  label: {
    fontSize: LABEL_SIZE,
    fontWeight: '700',
    color: '#081126',
    fontFamily: 'Roboto-Bold',
  },
  period: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.5)',
    marginTop: 4,
    fontFamily: 'Roboto-Medium',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: AMOUNT_SIZE,
    fontWeight: '700',
    color: '#081126',
    fontFamily: 'Roboto-Bold',
  },
  change: {
    fontSize: 13,
    color: '#dc2626',
    marginTop: 4,
    fontFamily: 'Roboto-Medium',
  },
})

function ExpensesCardBase({ label, period, amount, changePercent }: ExpensesCardProps) {
  const formattedAmount = `$${Math.abs(amount).toFixed(2)}`
  const changeText = `+${changePercent}%`

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.period}>{period}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amount}>-{formattedAmount}</Text>
        <Text style={styles.change}>{changeText}</Text>
      </View>
    </View>
  )
}

export const ExpensesCard = memo(ExpensesCardBase)
