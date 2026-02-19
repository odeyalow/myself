import BackButtonWrapper from "@/components/layout/backButtonWrapper";
import AppText from "@/components/ui/appText";
import { View } from "react-native";

import { useTranslation } from "react-i18next";
import useIconColor from "@/hooks/useIconColor";

import Logo from '@/assets/logos/Logo.svg';
import TextLogo from '@/assets/logos/TextLogo.svg';

const AboutAppScreen = () => {
    const { t } = useTranslation('profile');
    const color = useIconColor();

    return (
        <View className="bg-light dark:bg-dark h-full">
            <BackButtonWrapper
            scrollLock
            title={t('about_app.title')}
            className="flex-col">
                <View className="flex-col items-center gap-[10px] mb-[20px]">
                    <Logo width={150} height={150} color={color}/>
                    <TextLogo width={125} height={35} color={color}/>
                </View>
                <AppText
                weight="semibold"
                size="text"
                color="commonDark"
                className="mb-[20px]">
                    {t('about_app.text')}
                </AppText>
                <AppText
                weight="regular"
                size="description"
                color="muted"
                >
                    {t('about_app.subtext')}
                </AppText>
            </BackButtonWrapper>
            <AppText
            weight="semibold"
            size="subtext"
            color="muted"
            className="text-center mb-[50px]">
                {t('about_app.version')} 1.0.0
            </AppText>
        </View>
    );
}
 
export default AboutAppScreen;