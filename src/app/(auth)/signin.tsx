import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const SignIn = () => {
  return (
    <View>
      <Text>signin</Text>
      <Link href="./(auth)/signup">Login</Link>
    </View>
  )
}

export default SignIn