import { View, Text, Pressable, TextInput, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { useAuth, useSignIn } from '@clerk/expo'
import { SafeAreaView as RnSafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'nativewind'

const SafeAreaView = styled(RnSafeAreaView)

const SignIn = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const { signIn } = useSignIn()
  
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
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
            <Text style={styles.welcomeTitle}>Welcome back</Text>
            <Text style={styles.welcomeSubtitle}>Sign in to continue managing your subscriptions</Text>
          </View>

          <View style={styles.formContainer}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="rgba(0,0,0,0.6)"
            value={emailAddress}
            onChangeText={setEmailAddress}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="rgba(0,0,0,0.6)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable style={styles.signInButton} onPress={handleSignIn} disabled={isLoading}>
          <Text style={styles.signInButtonText}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New to Recurly? </Text>
          <Link href="/(auth)/signup" asChild>
            <Pressable>
              <Text style={styles.linkText}>Create an account</Text>
            </Pressable>
          </Link>
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
  input: {
    backgroundColor: '#fff9e3',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  placeholder: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
  },
  signInButton: {
    backgroundColor: '#ea7a53',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff9e3',
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

export default SignIn