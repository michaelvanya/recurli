import { memo } from 'react'
import { Text, View } from 'react-native'
import { authStyles } from './authStyles'

type AuthHeaderProps = {
  title: string
  subtitle: string
}

function AuthHeaderBase({ title, subtitle }: AuthHeaderProps) {
  return (
    <View style={authStyles.header}>
      <View style={authStyles.logoContainer}>
        <View style={authStyles.logoIcon}>
          <Text style={authStyles.logoText}>R</Text>
        </View>
        <View>
          <Text style={authStyles.appName}>Recurly</Text>
          <Text style={authStyles.appTagline}>SMART BILLING</Text>
        </View>
      </View>
      <Text style={authStyles.welcomeTitle}>{title}</Text>
      <Text style={authStyles.welcomeSubtitle}>{subtitle}</Text>
    </View>
  )
}

export const AuthHeader = memo(AuthHeaderBase)
