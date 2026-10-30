import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { HomeSubscription } from '@/components/types'
import { HOME_SUBSCRIPTIONS } from '@/constants/home_data/h.data'

type SubscriptionContextType = {
  subscriptions: HomeSubscription[]
  addSubscription: (sub: HomeSubscription) => void
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  subscriptions: [],
  addSubscription: () => {},
})

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<HomeSubscription[]>(HOME_SUBSCRIPTIONS)

  const addSubscription = useCallback((sub: HomeSubscription) => {
    setSubscriptions((prev) => [sub, ...prev])
  }, [])

  const value = useMemo(() => ({ subscriptions, addSubscription }), [subscriptions, addSubscription])

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscriptions() {
  return useContext(SubscriptionContext)
}
