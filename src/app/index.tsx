import { useAuth } from '@clerk/expo'
import { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        router.replace('/(tabs)')
      } else {
        router.replace('/(auth)/signin')
      }
    }
  }, [isLoaded, isSignedIn, router])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ea7a53" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff9e3',
  },
})
