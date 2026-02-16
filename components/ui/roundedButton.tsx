import { useEffect, useRef, useState } from "react";
import { Pressable } from "react-native";
import AppText from "./appText";
import Animated, {
    LinearTransition,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    ZoomIn,
    ZoomOut,
} from "react-native-reanimated";

import { ColorVariants } from "./appText";

interface Props {
    onPress?: () => void;
    appearance: 'light' | 'dark' | 'muted';
    disabled?: boolean
    fullWidth?: boolean
    icon?: React.ReactNode;
    className?: string;
    children: React.ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const PRESS_LOCK_MS = 300;

const BUTTON_APPEARANCES = {
    light: {
        bg: 'bg-white',
        text: 'commonDark'
    },
    dark: {
        bg: 'bg-dark',
        text: 'commonLight'
    },
    muted: {
        bg: 'bg-darkGray',
        text: 'commonLight'
    },
}

const RoudedButton = ({ onPress, appearance, disabled, fullWidth, icon, className, children }: Props) => {
    const [isPressLocked, setIsPressLocked] = useState(false);
    const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const scale = useSharedValue(1);
    const isDisabled = !!disabled || isPressLocked;

    useEffect(() => {
        return () => {
            if (lockTimerRef.current) {
                clearTimeout(lockTimerRef.current);
            }
        };
    }, []);

    const handlePress = () => {
        if (!onPress || isDisabled) return;

        onPress();
        setIsPressLocked(true);

        if (lockTimerRef.current) {
            clearTimeout(lockTimerRef.current);
        }

        lockTimerRef.current = setTimeout(() => {
            setIsPressLocked(false);
            lockTimerRef.current = null;
        }, PRESS_LOCK_MS);
    };

    const style = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    return (
        <Animated.View
        className={fullWidth ? 'flex-1' : ''}
        layout={LinearTransition.springify(750)}
        entering={ZoomIn.duration(250)}
        exiting={ZoomOut.duration(250)}>
            <AnimatedPressable
            onPressIn={() => scale.value = withSpring(0.9, {duration: 100})}
            onPressOut={() => scale.value = withSpring(1, {duration: 100})}
            style={style}
            disabled={isDisabled}
            onPress={handlePress}
            className={`p-[20px] rounded-full h-[60px] flex-row justify-center items-center gap-[10px] ${BUTTON_APPEARANCES[appearance].bg} ${fullWidth ? 'w-full' : ''} ${className ?? ''}`}
            >
                <AppText
                size="text"
                weight="semibold"
                color={BUTTON_APPEARANCES[appearance].text as ColorVariants}
                className="text-center leading-[20px]">
                    {children}
                </AppText>
                {icon}
            </AnimatedPressable>
        </Animated.View>
    );
}
 
export default RoudedButton;
