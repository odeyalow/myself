import { Stack, usePathname, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import "@/app/globals.css";
import "@/i18n";
import { ThemeModeProvider } from "@/contexts/themeModeContext";

export default function RootLayout() {
  const [loaded] = useFonts({
    'Montserrat': require('@/assets/fonts/Montserrat-Variable.ttf')
  })
  const { colorScheme } = useColorScheme();
  const pathname = usePathname();
  const segments = useSegments();
  const isRootIndexRoute = pathname === "/" || pathname === "/index";
  const isAuthRoute = segments[0] === "(auth)";
  const isDarkStatusArea = isRootIndexRoute || isAuthRoute;

  const STATUSBAR_BG_COLOR = isDarkStatusArea
    ? "bg-dark"
    : colorScheme === "dark" ? "bg-dark" : "bg-light";

  
  if (!loaded) {
    return null;
  }

  return (
    <ThemeModeProvider>
      <SafeAreaView className={`flex-1 ${STATUSBAR_BG_COLOR}`} edges={['top', 'left', 'right']}>
        <StatusBar barStyle={isDarkStatusArea ? 'light-content' : colorScheme === 'light' ? 'dark-content' : 'light-content'} />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </ThemeModeProvider>
  );
}
