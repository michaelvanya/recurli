import { memo } from 'react'
import { Pressable, Text } from 'react-native'
import { authStyles } from './authStyles'

type AuthButtonProps = {
  title: string
  isLoading: boolean
  onPress: () => void
  disabled?: boolean
}

function AuthButtonBase({ title, isLoading, onPress, disabled }: AuthButtonProps) {
  return (
    <Pressable
      style={authStyles.primaryButton}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      <Text style={authStyles.primaryButtonText}>
        {isLoading ? 'Please wait...' : title}
      </Text>
    </Pressable>
  )
}

export const AuthButton = memo(AuthButtonBase)
