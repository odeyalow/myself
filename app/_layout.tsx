import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import "@/app/globals.css";
import "@/i18n";

export default function RootLayout() {
  const [loaded] = useFonts({
    'Montserrat': require('@/assets/fonts/Montserrat-Variable.ttf')
  })
  const { colorScheme } = useColorScheme();

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-dark" edges={['top', 'left', 'right']}>
      <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
