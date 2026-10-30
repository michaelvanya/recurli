import { useEffect, useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native'
import { router } from 'expo-router'
import { useAuth, useSignIn } from '@clerk/expo'
import { SafeAreaView as RnSafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'nativewind'
import { AuthButton } from '@/components/AuthButton'
import { AuthFooter } from '@/components/AuthFooter'
import { AuthHeader } from '@/components/AuthHeader'
import { authStyles } from '@/components/authStyles'

const SafeAreaView = styled(RnSafeAreaView)

export default function SignIn() {
  const { isLoaded, isSignedIn } = useAuth()
  const { signIn } = useSignIn()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/(tabs)')
    }
  }, [isSignedIn])

  const handleSignIn = async () => {
    if (!emailAddress || !password) {
      setError('Please enter your email and password')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const { error: signInError } = await signIn.password({
        identifier: emailAddress,
        password,
      })

      if (signInError) {
        setError(signInError.message || 'Failed to sign in. Please check your credentials.')
        return
      }

      if (signIn.status === 'complete') {
        await signIn.finalize({
          navigate: () => {
            router.replace('/(tabs)')
          },
        })
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Failed to sign in. Please check your credentials.')
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
            title="Welcome back"
            subtitle="Sign in to continue managing your subscriptions"
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
                placeholder="Enter your password"
                placeholderTextColor="rgba(0,0,0,0.6)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {error ? <Text style={authStyles.errorText}>{error}</Text> : null}

            <AuthButton title="Sign in" isLoading={isLoading} onPress={handleSignIn} />

            <AuthFooter
              text="New to Recurly? "
              linkText="Create an account"
              linkHref="/(auth)/signup"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}