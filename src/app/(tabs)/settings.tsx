import { useCallback } from 'react'
import { ActivityIndicator, Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { useAuth, useUser, useClerk } from '@clerk/expo'
import { SafeAreaView as RnSafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'nativewind'

const SafeAreaView = styled(RnSafeAreaView)

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const IS_SMALL = SCREEN_WIDTH < 375
const H_PADDING = IS_SMALL ? 16 : 24
const CARD_MARGIN = IS_SMALL ? 16 : 24
const SECTION_MARGIN = IS_SMALL ? 16 : 24
const BOTTOM_PADDING = IS_SMALL ? 80 : 100
const BOTTOM_SPACER = IS_SMALL ? 40 : 60

export default function Settings() {
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  const { signOut } = useClerk()

  const firstName = user?.firstName ?? ''
  const email = user?.primaryEmailAddress?.emailAddress ?? ''

  const handleLogout = useCallback(async () => {
    Alert.alert(
      'Sign out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign out',
          style: 'destructive',
          onPress: async () => {
            await signOut()
            router.replace('/(auth)/signin')
          },
        },
      ]
    )
  }, [signOut])

  const handleForgotPassword = useCallback(() => {
    Alert.alert(
      'Forgot password',
      'A password reset link will be sent to your email address.',
      [{ text: 'OK' }]
    )
  }, [])

  const handleEditProfile = useCallback(() => {
    // Navigate to edit profile screen (future implementation)
    Alert.alert(
      'Edit profile',
      'Profile editing coming soon.',
      [{ text: 'OK' }]
    )
  }, [])

  if (!isLoaded || !isSignedIn) {
    return (
      <SafeAreaView className="flex-1 bg-background" style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ea7a53" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Profile card */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {firstName.charAt(0).toUpperCase() || email.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {firstName || 'User'}
              </Text>
              <Text style={styles.profileEmail} numberOfLines={1}>
                {email}
              </Text>
            </View>
            <Pressable onPress={handleEditProfile}>
              <Text style={styles.editLink}>Edit</Text>
            </Pressable>
          </View>
        </View>

        {/* Account section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <Pressable style={styles.menuItem} onPress={handleEditProfile}>
              <Text style={styles.menuIcon}>👤</Text>
              <Text style={styles.menuLabel}>Change information</Text>
              <Text style={styles.menuArrow}>›</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.menuItem} onPress={handleForgotPassword}>
              <Text style={styles.menuIcon}>🔒</Text>
              <Text style={styles.menuLabel}>Forgot password</Text>
              <Text style={styles.menuArrow}>›</Text>
            </Pressable>
          </View>
        </View>

        {/* Notifications section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.card}>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuIcon}>🔔</Text>
              <Text style={styles.menuLabel}>Push notifications</Text>
              <Text style={styles.menuArrow}>›</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuIcon}>📧</Text>
              <Text style={styles.menuLabel}>Email notifications</Text>
              <Text style={styles.menuArrow}>›</Text>
            </Pressable>
          </View>
        </View>

        {/* Support section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.card}>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuIcon}>❓</Text>
              <Text style={styles.menuLabel}>Help center</Text>
              <Text style={styles.menuArrow}>›</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuIcon}>💬</Text>
              <Text style={styles.menuLabel}>Contact us</Text>
              <Text style={styles.menuArrow}>›</Text>
            </Pressable>
          </View>
        </View>

        {/* Logout button */}
        <View style={styles.logoutSection}>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Sign out</Text>
          </Pressable>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: BOTTOM_PADDING,
  },
  header: {
    paddingHorizontal: H_PADDING,
    paddingVertical: IS_SMALL ? 12 : 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#081126',
    fontFamily: 'Roboto-Bold',
  },
  card: {
    marginHorizontal: CARD_MARGIN,
    backgroundColor: '#fff8e7',
    borderRadius: 16,
    padding: IS_SMALL ? 12 : 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ea7a53',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff9e3',
    fontFamily: 'Roboto-Bold',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#081126',
    fontFamily: 'Roboto-SemiBold',
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    fontFamily: 'Roboto-Regular',
    marginTop: 2,
  },
  editLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ea7a53',
    fontFamily: 'Roboto-SemiBold',
  },
  section: {
    marginTop: SECTION_MARGIN,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.6)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: H_PADDING,
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: '#081126',
    fontFamily: 'Roboto-Regular',
  },
  menuArrow: {
    fontSize: 24,
    color: 'rgba(0,0,0,0.3)',
    fontFamily: 'Roboto-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginHorizontal: 20,
  },
  logoutSection: {
    marginHorizontal: CARD_MARGIN,
    marginTop: IS_SMALL ? 24 : 32,
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff9e3',
    fontFamily: 'Roboto-SemiBold',
  },
  bottomSpacer: {
    height: BOTTOM_SPACER,
  },
})
