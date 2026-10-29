import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const SignUp = () => {
  return (
    <View>
      <Text>signup</Text>
      {/* route group that allows grouping of similiar routes in a folder without that folder name being part of the url as react native is file based routing by wrapping the folder with () it mask the folder name */}
      <Link href='./(auth)/signin'>Login</Link>
    </View>
  )
}

export default SignUp