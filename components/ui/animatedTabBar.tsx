import { useEffect } from "react";
import { Pressable, type PressableProps, StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import type { SvgProps } from "react-native-svg";

const ACTIVE_COLOR = "#FFFFFF";
const INACTIVE_COLOR = "#747474";
const ICON_SIZE = 22;

type TabIconComponent = React.ComponentType<SvgProps>;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const TAB_BAR_STYLE = {
  paddingTop: 10,
  paddingBottom: 8,
  backgroundColor: "#1F1F1F",
  borderTopWidth: 0,
  elevation: 0,
} as const;

export function SpringTabButton(props: PressableProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      {...props}
      onPressIn={(event) => {
        scale.value = withSpring(0.88, { damping: 14, stiffness: 300, mass: 0.35 });
        props.onPressIn?.(event);
      }}
      onPressOut={(event) => {
        scale.value = withSpring(1, { damping: 16, stiffness: 260, mass: 0.4 });
        props.onPressOut?.(event);
      }}
      style={[props.style, animatedStyle]}
    >
      {props.children}
    </AnimatedPressable>
  );
}

export function AnimatedTabLabel({ focused, children }: { focused: boolean; children: string }) {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, { duration: 220 });
  }, [focused, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], [INACTIVE_COLOR, ACTIVE_COLOR]) as string,
  }));

  return <Animated.Text style={[styles.label, animatedStyle]}>{children}</Animated.Text>;
}

export function AnimatedTabIcon({
  focused,
  activeIcon: ActiveIcon,
  inactiveIcon: InactiveIcon,
}: {
  focused: boolean;
  activeIcon: TabIconComponent;
  inactiveIcon: TabIconComponent;
}) {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, { duration: 220 });
  }, [focused, progress]);

  const activeStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.92 + progress.value * 0.08 }],
  }));

  const inactiveStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [{ scale: 1 - progress.value * 0.08 }],
  }));

  return (
    <Animated.View style={styles.iconContainer}>
      <Animated.View style={[styles.iconLayer, inactiveStyle]}>
        <InactiveIcon width={ICON_SIZE} height={ICON_SIZE} color={INACTIVE_COLOR} />
      </Animated.View>
      <Animated.View style={[styles.iconLayer, activeStyle]}>
        <ActiveIcon width={ICON_SIZE} height={ICON_SIZE} color={ACTIVE_COLOR} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  iconLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    fontFamily: "Montserrat",
    lineHeight: 16,
    fontWeight: "700",
  },
});
