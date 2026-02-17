import { Pressable } from 'react-native';
import AppText from './appText';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import useIconColor from '@/hooks/useIconColor';

import HistoryIcon from '@/assets/icons/system/history.svg';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const HistoryButton = ({ text, handleHistory }: { text: string, handleHistory: (value: string) => void }) => {
    const color = useIconColor();
    const scale = useSharedValue(1);
    const style = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    return (
        <AnimatedPressable
        onPress={() => handleHistory(text)}
        onPressIn={() => scale.value = withSpring(0.95, {duration: 100})}
        onPressOut={() => scale.value = withSpring(1, {duration: 100})}
        style={style}
        className="bg-lightGray dark:bg-darkGray rounded-[14px] p-[14px] w-full flex-row items-center gap-[10px]">
            <HistoryIcon width={18} height={18} color={color}/>
            <AppText
            weight='semibold'
            size='description'
            color='commonDark'>
                {text}
            </AppText>
        </AnimatedPressable>
    );
}
 
export default HistoryButton;