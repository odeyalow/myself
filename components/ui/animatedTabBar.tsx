import { useEffect, useRef } from "react";
import { Pressable, type PressableProps, StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { SvgProps } from "react-native-svg";

const ACTIVE_COLOR = "#FFFFFF";
const INACTIVE_COLOR = "#747474";
const ICON_SIZE = 22;
const TAB_PRESS_SCALE = 0.965;
const PRESS_IN_DURATION = 90;
const PRESS_OUT_DURATION = 170;
const NAVIGATION_DELAY = 70;

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
  const delayedPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdPressedState = useRef(false);

  useEffect(() => {
    return () => {
      if (delayedPressTimer.current) {
        clearTimeout(delayedPressTimer.current);
      }
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      {...props}
      onPressIn={(event) => {
        scale.value = withTiming(TAB_PRESS_SCALE, { duration: PRESS_IN_DURATION });
        props.onPressIn?.(event);
      }}
      onPressOut={(event) => {
        if (!holdPressedState.current) {
          scale.value = withTiming(1, { duration: PRESS_OUT_DURATION });
        }
        props.onPressOut?.(event);
      }}
      onPress={(event) => {
        if (delayedPressTimer.current) {
          clearTimeout(delayedPressTimer.current);
        }

        const isSelected = Boolean(props.accessibilityState?.selected);
        if (isSelected) {
          scale.value = withTiming(1, { duration: PRESS_OUT_DURATION });
          props.onPress?.(event);
          return;
        }

        holdPressedState.current = true;
        event.persist?.();
        delayedPressTimer.current = setTimeout(() => {
          props.onPress?.(event);
          scale.value = withTiming(1, { duration: PRESS_OUT_DURATION });
          holdPressedState.current = false;
          delayedPressTimer.current = null;
        }, NAVIGATION_DELAY);
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
