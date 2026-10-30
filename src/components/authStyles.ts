import { Dimensions, StyleSheet } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const IS_SMALL = SCREEN_WIDTH < 375
const H_PADDING = IS_SMALL ? 16 : 20
const FORM_PADDING = IS_SMALL ? 20 : 24
const FORM_TOP_PADDING = IS_SMALL ? 48 : 64
const LOGO_MARGIN = IS_SMALL ? 28 : 40
const WELCOME_SIZE = IS_SMALL ? 24 : 28

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9e3',
    padding: H_PADDING,
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
    marginBottom: LOGO_MARGIN,
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
    fontSize: WELCOME_SIZE,
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
    padding: FORM_PADDING,
    paddingTop: FORM_TOP_PADDING,
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
  primaryButton: {
    backgroundColor: '#ea7a53',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  secondaryButton: {
    alignItems: 'center',
    padding: 8,
    marginBottom: 16,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff9e3',
  },
  secondaryButtonText: {
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
