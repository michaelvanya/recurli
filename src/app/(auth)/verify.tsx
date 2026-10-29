import { View, Text, Pressable, TextInput, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useAuth, useSignUp } from '@clerk/expo'
import { SafeAreaView as RnSafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'nativewind'

const SafeAreaView = styled(RnSafeAreaView)

const Verify = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const { signUp } = useSignUp()
  const { mode } = useLocalSearchParams()

  const [code, setCode] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const isSignUpMode = mode === 'signup'

  React.useEffect(() => {
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ea7a53" />
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1" style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoText}>R</Text>
              </View>
              <View>
                <Text style={styles.appName}>Recurly</Text>
                <Text style={styles.appTagline}>SMART BILLING</Text>
              </View>
            </View>
            <Text style={styles.welcomeTitle}>Verify your email</Text>
            <Text style={styles.welcomeSubtitle}>
              {isSignUpMode
                ? 'Enter the code sent to your email to complete sign up'
                : 'Enter the code sent to your email to sign in'}
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Verification Code</Text>
              <TextInput
                style={styles.codeInput}
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

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Pressable style={styles.verifyButton} onPress={handleVerify} disabled={isLoading}>
              <Text style={styles.verifyButtonText}>
                {isLoading ? 'Verifying...' : isSignUpMode ? 'Verify & Create Account' : 'Verify & Sign In'}
              </Text>
            </Pressable>

            <Pressable style={styles.resendButton} onPress={handleResendCode} disabled={isLoading}>
              <Text style={styles.resendButtonText}>Resend code</Text>
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Wrong email? </Text>
              <Pressable onPress={() => router.replace(isSignUpMode ? '/(auth)/signup' : '/(auth)/signin')}>
                <Text style={styles.linkText}>Go back</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9e3',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff9e3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  header: {
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#ea7a53',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff9e3',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#081126',
  },
  appTagline: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
    letterSpacing: 1,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#081126',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff8e7',
    borderRadius: 16,
    padding: 24,
    paddingTop: 64,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#081126',
    marginBottom: 8,
  },
  codeInput: {
    backgroundColor: '#fff9e3',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 8,
  },
  verifyButton: {
    backgroundColor: '#ea7a53',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff9e3',
  },
  resendButton: {
    alignItems: 'center',
    padding: 8,
    marginBottom: 16,
  },
  resendButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ea7a53',
  },
  errorText: {
    fontSize: 14,
    color: '#dc2626',
    marginBottom: 12,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ea7a53',
  },
})

export default Verify
