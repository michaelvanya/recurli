import { memo, useCallback, useEffect, useMemo } from 'react'
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native'
import { Tabs, useRouter } from 'expo-router'
import { useAuth } from '@clerk/expo'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { tabs } from '@/constants/data'
import { components, colors } from '@/constants/theme'
import { SubscriptionProvider } from '@/contexts/SubscriptionContext'

const tabBar = components.tabBar

// Memoized tab icon to prevent re-renders
const TabIcon = memo(function TabIcon({ focused, icon }: { focused: boolean; icon: number }) {
  const pillStyle = useMemo(() => ({
    backgroundColor: focused ? colors.accent : 'transparent',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  }), [focused])

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={pillStyle}>
        <Image source={icon} resizeMode="contain" style={{ width: 24, height: 24 }} />
      </View>
    </View>
  )
})

const Tablayout = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  const insets = useSafeAreaInsets()

  // Memoize tab bar style to prevent re-renders
  const tabBarStyle = useMemo(() => ({
    position: 'absolute' as const,
    bottom: Math.max(insets.bottom, tabBar.horizontalInset),
    height: tabBar.height,
    marginHorizontal: tabBar.horizontalInset,
    borderRadius: tabBar.radius,
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    elevation: 0,
  }), [insets.bottom])

  const tabBarItemStyle = useMemo(() => ({
    paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
  }), [])

  const tabBarIconStyle = useMemo(() => ({
    width: tabBar.iconFrame,
    height: tabBar.iconFrame,
    alignItems: 'center' as const,
  }), [])

  // Memoize screen options to prevent re-renders
  const screenOptions = useMemo(() => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle,
    tabBarItemStyle,
    tabBarIconStyle,
    // Freeze inactive tabs to prevent unnecessary re-renders
    freezeOnBlur: true,
  }), [tabBarStyle, tabBarItemStyle, tabBarIconStyle])

  const handleAuthRedirect = useCallback(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/(auth)/signin')
    }
  }, [isLoaded, isSignedIn, router])

  useEffect(() => {
    handleAuthRedirect()
  }, [handleAuthRedirect])

  if (!isLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ea7a53" />
      </View>
    )
  }

  if (!isSignedIn) {
    return null
  }

  return (
    <SubscriptionProvider>
      <Tabs screenOptions={screenOptions}>
        {tabs.map((tab) => {
          if (!tab) return null;
          return (
            <Tabs.Screen
              key={tab.id}
              name={tab.name}
              options={{
                title: tab.title,
                tabBarIcon: ({ focused }) => (
                  <TabIcon focused={focused} icon={tab.icon} />
                ),
              }}
            />
          );
        })}
      </Tabs>
    </SubscriptionProvider>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff9e3',
  },
})

export default Tablayout