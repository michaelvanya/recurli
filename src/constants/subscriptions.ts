export interface SubscriptionData {
  id: string
  name: string
  plan: string
  price: string
  billingPeriod: string
  iconColor: string
  iconText: string
  paymentInfo: string
  planDetails: string
}

export const SUBSCRIPTIONS: SubscriptionData[] = [
  {
    id: '1',
    name: 'Dropbox',
    plan: 'Premium',
    price: '$16.96',
    billingPeriod: '1 month',
    iconColor: '#0061FF',
    iconText: 'D',
    paymentInfo: '****4242',
    planDetails: 'Basic',
  },
  {
    id: '2',
    name: 'Spotify',
    plan: 'Family Plan',
    price: '$76.77',
    billingPeriod: '3 months',
    iconColor: '#1DB954',
    iconText: 'S',
    paymentInfo: '****8831',
    planDetails: 'Family',
  },
  {
    id: '3',
    name: 'GitHub Copilot',
    plan: 'Pro Business',
    price: '$49.99',
    billingPeriod: '1 month',
    iconColor: '#24292E',
    iconText: 'G',
    paymentInfo: '****8530',
    planDetails: 'Premium',
  },
  {
    id: '4',
    name: 'Adobe',
    plan: 'Family Plan',
    price: '$98.10',
    billingPeriod: '2 months',
    iconColor: '#FF0000',
    iconText: 'A',
    paymentInfo: '****1234',
    planDetails: 'Standard',
  },
  {
    id: '5',
    name: 'Figma',
    plan: 'Premium',
    price: '$19.23',
    billingPeriod: '1 month',
    iconColor: '#A259FF',
    iconText: 'F',
    paymentInfo: '****5678',
    planDetails: 'Professional',
  },
]
