import { View } from "react-native";
import AppText from "../ui/appText";
import Button from "../ui/button";
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from "react-native-reanimated";

import { useTranslation } from "react-i18next";
import useIconColor from "@/hooks/useIconColor";

import CheckmarkIcon from '@/assets/icons/system/checkmark.svg';

type OptionType = {
    id: string;
    value: string;
}

interface Props {
    title: string;
    options: OptionType[];
    defaultValue: string;
    onSelect: (value: any) => void
    onClose: () => void;
}

const SelectModal = ({ title, options, defaultValue, onSelect, onClose }: Props ) => {
    const { t } = useTranslation(['profile', 'common']);
    const color = useIconColor();

    return (
        <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        className="absolute w-full h-full bg-black/25 dark:bg-black/50">
            <Animated.View
            entering={SlideInDown.duration(200)}
            exiting={SlideOutDown.duration(500)}
            className="bg-light dark:bg-dark p-[20px] rounded-t-[20px] min-h-min mt-auto flex-col gap-[20px]">
                <AppText
                weight="extrabold"
                size="bigTitle"
                color="commonDark">
                    {title}
                </AppText>
                <View className="flex-col gap-[5px]">
                    {
                        options?.map(option => {
                            return (
                                <Button
                                key={option.id}
                                appearance={option.id === defaultValue ? "accentLight" : "light"}
                                disabled={option.id === defaultValue}
                                onPress={() => onSelect(option.id)}
                                className="justify-between">
                                    <AppText
                                    weight="semibold"
                                    size="text"
                                    color="commonDark">
                                        {option.value}
                                    </AppText>
                                    {
                                        option.id === defaultValue && <CheckmarkIcon width={20} height={20} color={color}/>
                                    }
                                </Button>
                            )
                        })
                    }
                </View>
                <Button
                appearance="dark"
                onPress={onClose}
                className="justify-center">
                    <AppText
                    weight="semibold"
                    size="text"
                    color="commonLightInverted">
                        {t('close', { ns: 'common' })}
                    </AppText>
                </Button>
            </Animated.View>
        </Animated.View>
    );
}
 
export default SelectModal;