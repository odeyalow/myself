import { View } from "react-native";
import Button from "../ui/button";
import ScreenWrapper from "./screenWrapper";
import AppText from "../ui/appText";

import useIconColor from "@/hooks/useIconColor";
import { useRouter } from "expo-router";
import ArrowLeft from '@/assets/icons/system/arrow_left.svg';

const BackButtonWrapper = ({ title, innerRoute, className, children }: { title: string, innerRoute?: boolean; className?: string; children: React.ReactNode }) => {
    const color = useIconColor();
    const { back } = useRouter();

    return (
        <ScreenWrapper>
            <View className="flex-row gap-[10px] items-center mb-[20px]">
                <Button
                appearance="accentLight"
                onPress={() => back()}
                className="w-[px]">
                    <ArrowLeft width={20} height={20} color={color} />
                </Button>
                <AppText
                weight="bold"
                size={innerRoute ? "smallTitle" : "mediumTitle"}
                color="commonDark"
                >
                    {title}
                </AppText>
            </View>
            <View className={className}>
                {children}
            </View>
        </ScreenWrapper>
    );
}
 
export default BackButtonWrapper;