import { Pressable } from "react-native";
import AppText from "./appText";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SettingsButton = ({ text, onPress }: { text: string, onPress: () => void }) => {
    const scale = useSharedValue(1);
    const style = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    return (
        <AnimatedPressable
        onPress={onPress}
        onPressIn={() => scale.value = withSpring(0.95, {duration: 100})}
        onPressOut={() => scale.value = withSpring(1, {duration: 100})}
        style={style}
        className='bg-lightGray dark:bg-darkGray rounded-[14px] min-h-[54px] px-[16px] flex-row justify-start items-center w-full'
        >
            <AppText
            weight="semibold"
            size="text"
            color="commonDark"
            >
                {text}
            </AppText>
        </AnimatedPressable>
    );
}
 
export default SettingsButton;