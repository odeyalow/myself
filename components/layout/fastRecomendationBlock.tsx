import { View, Pressable } from "react-native";
import AppText from "../ui/appText";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import useIconColor from "@/hooks/useIconColor";

import ArrowRightIcon from '@/assets/icons/system/arrow_right.svg';

type ArticleType = {
    title: string;
    category: string;
    chapter: string;
    // other data
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FastRecomendationBlock = ({ title, category, chapter }: ArticleType) => {
    const color = useIconColor();
    const scale = useSharedValue(1);
    const style = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    return (
        <AnimatedPressable
        onPressIn={() => scale.value = withSpring(0.95, {duration: 100})}
        onPressOut={() => scale.value = withSpring(1, {duration: 100})}
        style={style}
        className="bg-lightGray dark:bg-darkGray rounded-[14px] w-full px-[18px] py-[14px] flex-row justify-between items-center gap-[10px]">
            <View className="flex-col gap-[5px] flex-1">
                <AppText
                weight="semibold"
                size="text"
                color="commonDark">
                    {title}
                </AppText>
                <View className="flex-row items-center gap-[5px]">
                    <AppText
                    weight="semibold"
                    size="description"
                    color="muted">
                        {chapter}
                    </AppText>
                    <ArrowRightIcon width={10} height={10} color="#747474"/>
                    <AppText
                    weight="semibold"
                    size="description"
                    color="muted">
                        {category}
                    </AppText>
                </View>
            </View>
            <ArrowRightIcon width={18} height={18} color={color}/>
        </AnimatedPressable>
    );
}
 
export default FastRecomendationBlock;