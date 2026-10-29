import { Stack } from "expo-router";
import '../../global.css'
import * as SplashScreen from "expo-splash-screen";
import {useFonts} from 'expo-font'
import { useEffect } from "react";
export default function RootLayout() {

SplashScreen.preventAutoHideAsync()
   const [fontsLoaded, fontError] = useFonts({
    "Roboto-Black": require("../../assets/fonts/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("../../assets/fonts/Roboto-BlackItalic.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-ExtraBold": require("../../assets/fonts/Roboto-ExtraBold.ttf"),
    "Roboto-Light": require("../../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("@/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto-SemiBold.ttf"),
    "Roboto-Thin": require("@/assets/fonts/Roboto-Thin.ttf"),
  });


  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();

    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Stack screenOptions={{ headerShown:false}}/>;
}
 