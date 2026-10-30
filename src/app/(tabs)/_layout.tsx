import { View, Image, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs, useRouter } from 'expo-router'
import { useAuth } from '@clerk/expo'
import { useEffect } from 'react'
import { tabs } from '@/constants/data'
import clsx from 'clsx'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { components , colors} from '@/constants/theme'
import { SubscriptionProvider } from '@/contexts/SubscriptionContext'


const tabBar = components.tabBar


const TabIcon = ({ focused, icon }: TabIconProps) => {

  
  return (
    <View className="tabs-icon">
      <View className={clsx('tabs-pill', focused && 'tabs-active')}>
        <Image source={icon} resizeMode="contain" className="tabs-glyph" />
      </View>
    </View>
  )
}

const Tablayout = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  const insets = useSafeAreaInsets()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/(auth)/signin')
    }
  }, [isLoaded, isSignedIn, router])

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
      <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false , tabBarStyle:{
        position: 'absolute',
        bottom: Math.max(insets.bottom, tabBar.horizontalInset),
        height: tabBar.height,
        marginHorizontal: tabBar.horizontalInset,
        borderRadius: tabBar.radius,
        backgroundColor: colors.primary,
        borderTopWidth:0,
        elevation:0
    },
    tabBarItemStyle:{
        paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6
    },

    tabBarIconStyle:{
        width: tabBar.iconFrame,
        height: tabBar.iconFrame,
        alignItems:'center'
    }
    
    }}>
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