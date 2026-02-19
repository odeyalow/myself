import { View } from "react-native";
import AppText from "../ui/appText";
import Button from "../ui/button";
import Animated, { Easing, LinearTransition } from "react-native-reanimated";

import { useTranslation } from "react-i18next";

import CheckmarkIcon from "@/assets/icons/system/checkmark.svg";

interface PillOptionType {
    id: string;
    value: string
    isSelected: boolean
}

interface Props {
    topicId: string;
    type: "single" | "multiple";
    title: string;
    options: PillOptionType[];
    onSelect: (topicId: string, optionId: string, type: "single" | "multiple") => void;
}

const PillSelect = ({ topicId, type, title, options, onSelect }: Props) => {
    const { t } = useTranslation('knowing');
    const pillLayoutTransition = LinearTransition
        .duration(220)
        .easing(Easing.inOut(Easing.ease));

    return (
        <View>
            <AppText
            weight="semibold"
            size="description"
            color="muted"
            className="mb-[10px]">
                {title}
            </AppText>
            <Animated.View
            layout={pillLayoutTransition}
            className="flex-row flex-wrap gap-[5px]">
                {
                    options.map(option => {
                        return (
                            <Animated.View key={option.id} layout={pillLayoutTransition}>
                                <Button
                                appearance={option.isSelected ? "forceAccentDark" : "forceDark"}
                                onPress={() => onSelect(topicId, option.id, type)}
                                className="min-h-[43px] px-[18px] rounded-full gap-[5px]">
                                    <AppText
                                    weight="regular"
                                    size="subtext"
                                    color="forceLight">
                                        {t(`about_user.${topicId}.option_${option.value}`)}
                                    </AppText>
                                    {option.isSelected && <CheckmarkIcon width={12} height={12} color="#F6F6F6"/>}
                                </Button>
                            </Animated.View>
                        )
                    })
                }
            </Animated.View>
        </View>
    );
}
 
export default PillSelect;
