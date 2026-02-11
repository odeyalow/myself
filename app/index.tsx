import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="m-[100px]">
      <Text>Welcome to the App!</Text>
      <Link href='/(tabs)'>go</Link>
    </View>
  );
}
