// constants/insights_data.ts

export type WeeklySpending = {
  day: string
  amount: number
  isHighlighted?: boolean
}

export type HistoryItem = {
  id: string
  icon: string
  name: string
  date: string
  price: number
  bgColor: string
  iconBg: string
}

export const WEEKLY_SPENDING: WeeklySpending[] = [
  { day: 'Mon', amount: 36 },
  { day: 'Tue', amount: 31 },
  { day: 'Wed', amount: 22 },
  { day: 'Thr', amount: 40, isHighlighted: true },
  { day: 'Fri', amount: 35 },
  { day: 'Sat', amount: 18 },
  { day: 'Sun', amount: 24 },
]

export const EXPENSES_SUMMARY = {
  label: 'Expenses',
  period: 'March 2026',
  amount: -424.63,
  changePercent: 12,
}

export const HISTORY_ITEMS: HistoryItem[] = [
  {
    id: 'claude',
    icon: '✦',
    name: 'Claude',
    date: 'June 25, 12:00',
    price: 9.84,
    bgColor: '#FFDA4D',
    iconBg: '#FFF0A7',
  },
  {
    id: 'canva',
    icon: 'C',
    name: 'Canva',
    date: 'June 30, 16:00',
    price: 43.89,
    bgColor: '#8fd1bd',
    iconBg: '#B4E0D3',
  },
  {
    id: 'notion',
    icon: 'N',
    name: 'Notion',
    date: 'June 28, 09:00',
    price: 12.00,
    bgColor: '#9BB9E0',
    iconBg: '#B7D0ED',
  },
  {
    id: 'spotify',
    icon: '♫',
    name: 'Spotify',
    date: 'June 22, 08:00',
    price: 10.99,
    bgColor: '#C7DDA5',
    iconBg: '#DDEBC7',
  },
]
