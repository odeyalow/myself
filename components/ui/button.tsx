import { Pressable } from "react-native";

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

interface ButtonProps {
    onPress: () => void;
    appearance: "light" | "dark" | "accentLight" | "accentDark",
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

const BUTTON_APPEARANCES = {
    light: "bg-light dark:bg-dark",
    dark: "bg-dark dark:bg-light",
    accentLight: "bg-lightGray dark:bg-darkGray",
    accentDark: "bg-darkGray dark:bg-lightGray"
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({ onPress, appearance, fullWidth, disabled, className, children }: ButtonProps) => {
    const scale = useSharedValue(1);
    const style = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    return (
        <AnimatedPressable
        onPressIn={() => scale.value = withSpring(0.95, {duration: 100})}
        onPressOut={() => scale.value = withSpring(1, {duration: 100})}
        style={style}
        disabled={disabled}
        onPress={onPress}
        className={`rounded-[14px] min-h-[54px] px-[16px] flex-row items-center ${BUTTON_APPEARANCES[appearance]} ${fullWidth ? 'w-full flex-1' : ''} ${className ?? ''}`}
        >
            {children}
        </AnimatedPressable>
    );
}
 
export default Button;