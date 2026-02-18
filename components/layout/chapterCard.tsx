import { View, Pressable } from "react-native";
import AppText from "../ui/appText";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

interface Props {
    title: string;
    categories: CategoryType[];
    icon: React.ReactNode;
    chapterId: string | number;
}

interface CategoryType {
    title: string
    // other data
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ChapterCard = ({ title, categories, icon, chapterId }: Props) => {
    const { push } = useRouter();
    const scale = useSharedValue(1);
    const style = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))
    const categoriesText = categories
        .map((category) => category.title.trim())
        .filter((title) => title.length > 0)
        .join(", ");

    return ( 
        <AnimatedPressable
        onPress={() => push({
            pathname: "/chapter/[chapterId]",
            params: { chapterId }
        })}
        onPressIn={() => scale.value = withSpring(0.95, {duration: 100})}
        onPressOut={() => scale.value = withSpring(1, {duration: 100})}
        style={style}
        className="bg-lightGray dark:bg-darkGray py-[14px] px-[18px] w-full rounded-[14px] flex-col gap-[7px]">
            <View className="flex-row items-center justify-between w-full">
                <AppText
                weight="bold"
                size="smallTitle"
                color="commonDark"
                >
                    {title}
                </AppText>
                {icon}
            </View>
            <View className="w-full">
                <AppText
                weight="regular"
                size="description"
                color="muted"
                numberOfLines={2}
                ellipsizeMode="tail"
                >
                    {categoriesText}
                </AppText>
            </View>
        </AnimatedPressable>
    );
}

export default ChapterCard;
