import { useEffect, useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useAuth, useSignUp } from '@clerk/expo'
import { SafeAreaView as RnSafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'nativewind'
import { AuthButton } from '@/components/AuthButton'
import { AuthHeader } from '@/components/AuthHeader'
import { authStyles } from '@/components/authStyles'

const SafeAreaView = styled(RnSafeAreaView)

export default function Verify() {
  const { isLoaded, isSignedIn } = useAuth()
  const { signUp } = useSignUp()
  const { mode } = useLocalSearchParams()

  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const isSignUpMode = mode === 'signup'

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/(tabs)')
    }
  }, [isSignedIn])

  const handleVerify = async () => {
    if (!code || code.length < 4) {
      setError('Please enter the complete verification code')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      if (isSignUpMode && signUp) {
        const { error: verifyError } = await signUp.verifications.verifyEmailCode({ code })
        if (verifyError) {
          setError(verifyError.message || 'Invalid verification code. Please try again.')
          return
        }

        const { error: finalizeError } = await signUp.finalize()
        if (finalizeError) {
          setError(finalizeError.message || 'Failed to complete sign up.')
          return
        }
      }

      router.replace('/(tabs)')
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Failed to verify code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsLoading(true)
    setError('')

    try {
      if (isSignUpMode && signUp) {
        const { error: sendError } = await signUp.verifications.sendEmailCode()
        if (sendError) {
          setError(sendError.message || 'Failed to resend verification code.')
          return
        }
      }
      setError('')
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Failed to resend code.')
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
            title="Verify your email"
            subtitle={
              isSignUpMode
                ? 'Enter the code sent to your email to complete sign up'
                : 'Enter the code sent to your email to sign in'
            }
          />

          <View style={authStyles.formContainer}>
            <View style={authStyles.fieldGroup}>
              <Text style={authStyles.label}>Verification Code</Text>
              <TextInput
                style={authStyles.codeInput}
                placeholder="Enter your code"
                placeholderTextColor="rgba(0,0,0,0.6)"
                value={code}
                onChangeText={setCode}
                keyboardType="numeric"
                textAlign="center"
                maxLength={10}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {error ? <Text style={authStyles.errorText}>{error}</Text> : null}

            <AuthButton
              title={isSignUpMode ? 'Verify & Create Account' : 'Verify & Sign In'}
              isLoading={isLoading}
              onPress={handleVerify}
            />

            <Pressable style={authStyles.secondaryButton} onPress={handleResendCode} disabled={isLoading}>
              <Text style={authStyles.secondaryButtonText}>Resend code</Text>
            </Pressable>

            <View style={authStyles.footer}>
              <Text style={authStyles.footerText}>Wrong email? </Text>
              <Pressable onPress={() => router.replace(isSignUpMode ? '/(auth)/signup' : '/(auth)/signin')}>
                <Text style={authStyles.linkText}>Go back</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
