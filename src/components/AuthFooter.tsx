import { memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { authStyles } from './authStyles'

type AuthFooterProps = {
  text: string
  linkText: string
  linkHref: any
}

function AuthFooterBase({ text, linkText, linkHref }: AuthFooterProps) {
  return (
    <View style={authStyles.footer}>
      <Text style={authStyles.footerText}>{text}</Text>
      <Link href={linkHref} asChild>
        <Pressable>
          <Text style={authStyles.linkText}>{linkText}</Text>
        </Pressable>
      </Link>
    </View>
  )
}

export const AuthFooter = memo(AuthFooterBase)
