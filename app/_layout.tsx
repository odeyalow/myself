import { Stack } from "expo-router";
import { View } from "react-native";
import "@/app/globals.css";
import "@/i18n";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Montserrat': require('@/assets/fonts/Montserrat-Variable.ttf')
  })

  return (
    <View className="flex-1">
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
