import { memo, useMemo } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import type { WeeklySpending } from '@/constants/insights_data'

type WeeklyChartProps = {
  data: WeeklySpending[]
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_SMALL = SCREEN_WIDTH < 375;

const Y_AXIS_WIDTH = 36
const X_AXIS_HEIGHT = IS_SMALL ? 24 : 30
const CHART_HEIGHT = IS_SMALL ? 160 : 208
const TOP_PADDING = IS_SMALL ? 20 : 31

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#f5eed4',
    borderRadius: 16,
    padding: 16,
    paddingTop: TOP_PADDING,
  },
  gridLines: {
    position: 'absolute',
    left: Y_AXIS_WIDTH,
    right: 0,
    top: 0,
    bottom: X_AXIS_HEIGHT,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  yAxis: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: X_AXIS_HEIGHT,
    width: Y_AXIS_WIDTH,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingRight: 6,
  },
  yAxisLabel: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.4)',
    fontFamily: 'Roboto-Medium',
  },
  barsContainer: {
    marginLeft: Y_AXIS_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: CHART_HEIGHT,
    paddingBottom: 0,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#081126',
    marginBottom: 4,
    fontFamily: 'Roboto-Bold',
  },
  bar: {
    width: 20,
    borderRadius: 10,
    maxHeight: CHART_HEIGHT,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 8,
    marginLeft: Y_AXIS_WIDTH,
  },
  barLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    color: 'rgba(0,0,0,0.5)',
    fontFamily: 'Roboto-Medium',
  },
})

function WeeklyChartBase({ data }: WeeklyChartProps) {
  const maxAmount = useMemo(() => Math.max(...data.map((d) => d.amount)), [data])

  const gridValues = useMemo(() => {
    const step = Math.ceil(maxAmount / 4 / 5) * 5
    return [0, step, step * 2, step * 3, step * 4].filter((v) => v <= maxAmount + step)
  }, [maxAmount])

  return (
    <View style={styles.chartContainer}>
      {/* Y-axis labels */}
      <View style={styles.yAxis}>
        {gridValues.map((val, i) => (
          <Text key={i} style={styles.yAxisLabel}>
            {val}
          </Text>
        ))}
      </View>

      {/* Grid lines */}
      <View style={styles.gridLines}>
        {gridValues.map((val, i) => {
          const ratio = val / gridValues[gridValues.length - 1]
          const top = CHART_HEIGHT * (1 - ratio)
          return <View key={i} style={[styles.gridLine, { top }]} />
        })}
      </View>

      {/* Bars */}
      <View style={styles.barsContainer}>
        {data.map((item, index) => {
          const height = (item.amount / maxAmount) * CHART_HEIGHT
          const isHighlighted = item.isHighlighted || false

          return (
            <View key={index} style={styles.barWrapper}>
              {isHighlighted && (
                <Text style={styles.barValue}>
                  ${item.amount}
                </Text>
              )}
              <View
                style={[
                  styles.bar,
                  {
                    height: Math.max(Math.min(height, CHART_HEIGHT), 8),
                    backgroundColor: isHighlighted ? '#ea7a53' : '#081126',
                  },
                ]}
              />
            </View>
          )
        })}
      </View>

      {/* X-axis labels */}
      <View style={styles.xAxis}>
        {data.map((item, index) => (
          <Text key={index} style={styles.barLabel}>{item.day}</Text>
        ))}
      </View>
    </View>
  )
}

export const WeeklyChart = memo(WeeklyChartBase)
