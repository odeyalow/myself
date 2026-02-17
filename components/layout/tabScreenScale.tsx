import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const START_SCALE = 0.99;
const FOCUS_DURATION = 300;
const BLUR_DURATION = 120;

const TabScreenScale = ({ children }: { children: React.ReactNode }) => {
  const isFocused = useIsFocused();
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isFocused) {
      scale.value = START_SCALE;
      scale.value = withTiming(1, {
        duration: FOCUS_DURATION,
        easing: Easing.out(Easing.cubic),
      });
      return;
    }

    scale.value = withTiming(START_SCALE, {
      duration: BLUR_DURATION,
      easing: Easing.out(Easing.quad),
    });
  }, [isFocused, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    flex: 1,
    transform: [{ scale: scale.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default TabScreenScale;
