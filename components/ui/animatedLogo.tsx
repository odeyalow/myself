import { useEffect } from "react";
import Svg, { G, Path, type GProps, type SvgProps } from "react-native-svg";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const AnimatedG = Animated.createAnimatedComponent(G);

const LOOP_DURATION = 1500;
const LOW_OPACITY = 0.5;
const LOW_SCALE = 0.85;
const RETURN_START = 0.6;

interface AnimatedLogoProps extends SvgProps {
  color?: string;
}

const getElementState = (progress: number, start: number, end: number) => {
  "worklet";

  if (progress < start) {
    return { opacity: 1, scale: 1 };
  }

  if (progress < end) {
    const k = (progress - start) / (end - start);
    return {
      opacity: 1 - (1 - LOW_OPACITY) * k,
      scale: 1 - (1 - LOW_SCALE) * k,
    };
  }

  if (progress < RETURN_START) {
    return { opacity: LOW_OPACITY, scale: LOW_SCALE };
  }

  const k = (progress - RETURN_START) / (1 - RETURN_START);
  return {
    opacity: LOW_OPACITY + (1 - LOW_OPACITY) * k,
    scale: LOW_SCALE + (1 - LOW_SCALE) * k,
  };
};

const AnimatedLogo = ({ color = "#FFFFFF", ...svgProps }: AnimatedLogoProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: LOOP_DURATION,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    return () => {
      cancelAnimation(progress);
    };
  }, [progress]);

  const element1AnimatedProps = useAnimatedProps<GProps>(() => {
    const { opacity, scale } = getElementState(progress.value, 0, 0.2);

    return {
      opacity,
      scale: [scale, scale],
    };
  });

  const element2AnimatedProps = useAnimatedProps<GProps>(() => {
    const { opacity, scale } = getElementState(progress.value, 0.2, 0.4);

    return {
      opacity,
      scale: [scale, scale],
    };
  });

  const element3AnimatedProps = useAnimatedProps<GProps>(() => {
    const { opacity, scale } = getElementState(progress.value, 0.4, 0.6);

    return {
      opacity,
      scale: [scale, scale],
    };
  });

  return (
    <Svg {...svgProps} viewBox="0 0 1025 1172.11" fill="none">
      <AnimatedG animatedProps={element1AnimatedProps} originX={472.7} originY={474.5}>
        <Path
          d="M0 0L945.387 0L424.284 491.285L605.223 491.285L512.5 949.074L0 0Z"
          fill={color}
          fillRule="evenodd"
        />
      </AnimatedG>
      <AnimatedG animatedProps={element2AnimatedProps} originX={787.5} originY={522}>
        <Path
          d="M605.223 424.292L945.387 94.9073L1025 424.292L909.199 424.292L550.463 949.074L728.261 424.292L605.223 424.292Z"
          fill={color}
          fillRule="evenodd"
        />
      </AnimatedG>
      <AnimatedG animatedProps={element3AnimatedProps} originX={531.5} originY={1079.5}>
        <Path
          d="M728.743 1172.11C728.743 1172.11 635.88 987.036 531.482 987.036C427.083 987.036 334.22 1172.11 334.22 1172.11L728.743 1172.11Z"
          fill={color}
          fillRule="evenodd"
        />
      </AnimatedG>
    </Svg>
  );
};

export default AnimatedLogo;
