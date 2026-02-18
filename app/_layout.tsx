import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import { usePathname } from "expo-router";

import "@/app/globals.css";
import "@/i18n";

export default function RootLayout() {
  const [loaded] = useFonts({
    'Montserrat': require('@/assets/fonts/Montserrat-Variable.ttf')
  })
  const { colorScheme } = useColorScheme();
  const pathname = usePathname();
  const isRootIndexRoute = pathname === "/" || pathname === "/index";

  const STATUSBAR_BG_COLOR = !isRootIndexRoute
    ? colorScheme === "dark" ? "bg-dark" : "bg-light"
    : "bg-dark";

  
  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView className={`flex-1 ${STATUSBAR_BG_COLOR}`} edges={['top', 'left', 'right']}>
      <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
