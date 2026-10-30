import { useEffect, useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native'
import { router } from 'expo-router'
import { useAuth, useSignUp } from '@clerk/expo'
import { SafeAreaView as RnSafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'nativewind'
import { AuthButton } from '@/components/AuthButton'
import { AuthFooter } from '@/components/AuthFooter'
import { AuthHeader } from '@/components/AuthHeader'
import { authStyles } from '@/components/authStyles'

const SafeAreaView = styled(RnSafeAreaView)

export default function SignUp() {
  const { isLoaded, isSignedIn } = useAuth()
  const { signUp } = useSignUp()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/(tabs)')
    }
  }, [isSignedIn])

  const handleSignUp = async () => {
    if (!emailAddress || !password) {
      setError('Please enter your email and password')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const { error: signUpError } = await signUp.password({
        emailAddress,
        password,
      })

      if (signUpError) {
        setError(signUpError.message || 'Failed to create account. Please try again.')
        return
      }

      const { error: sendError } = await signUp.verifications.sendEmailCode()
      if (sendError) {
        setError(sendError.message || 'Failed to send verification code.')
        return
      }

      router.push('/(auth)/verify?mode=signup')
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <View style={authStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#ea7a53" />
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1" style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={authStyles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AuthHeader
            title="Get started"
            subtitle="Create your account to manage subscriptions"
          />

          <View style={authStyles.formContainer}>
            <View style={authStyles.fieldGroup}>
              <Text style={authStyles.label}>Email</Text>
              <TextInput
                style={authStyles.input}
                placeholder="Enter your email"
                placeholderTextColor="rgba(0,0,0,0.6)"
                value={emailAddress}
                onChangeText={setEmailAddress}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={authStyles.fieldGroup}>
              <Text style={authStyles.label}>Password</Text>
              <TextInput
                style={authStyles.input}
                placeholder="Create a password"
                placeholderTextColor="rgba(0,0,0,0.6)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {error ? <Text style={authStyles.errorText}>{error}</Text> : null}

            <AuthButton title="Create account" isLoading={isLoading} onPress={handleSignUp} />

            <AuthFooter
              text="Already have an account? "
              linkText="Sign in"
              linkHref="/(auth)/signin"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}