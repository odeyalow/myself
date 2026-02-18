import { View } from "react-native";
import ScreenWrapper from "@/components/layout/screenWrapper";
import AppText from "@/components/ui/appText";
import SettingsButton from "@/components/ui/settingsButton";
import Button from "@/components/ui/button";

import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import useIconColor from "@/hooks/useIconColor";

import SuggestIcon from '@/assets/icons/decoration/suggest.svg';

const ProfileTab = () => {
    const { t, i18n } = useTranslation("profile");
    const color = useIconColor(true);
    const { push } = useRouter();

    const formatAge = (age: number): string => {
    const n = Math.abs(Math.trunc(age));
    const currentLanguage = i18n.resolvedLanguage ?? i18n.language;
    const isRussian = currentLanguage.startsWith("ru");
    

    if (isRussian) {
      const last = n % 10;
      const lastTwo = n % 100;

      if (last === 1 && lastTwo !== 11) {
        return `${n} ${t("year_2")}`;
      }

      if (last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) {
        return `${n} ${t("year_3")}`;
      }

      return `${n} ${t("year_1")}`;
    }

    return `${n} ${t("years_old")}`;
    };

    return (
        <ScreenWrapper className="flex-col gap-[15px]">
        <AppText
            weight="extrabold"
            size="bigTitle"
            color="commonDark"
            className="mb-[10px]"
        >
            {t("title")}
        </AppText>
        <AppText
            weight="extrabold"
            size="bigTitle"
            color="commonDark"
            className="text-[36px]"
        >
            Алдияр
        </AppText>
        <AppText
            weight="regular"
            size="text"
            color="commonDark"
            className="-mt-[5px] mb-[10px]"
        >
            {formatAge(19)}
        </AppText>
        <View className="flex-col gap-[25px]">
            <SettingsButton text={t('change')} onPress={() => {}}/>
            <View className="flex-col gap-[10px]">
                <SettingsButton text={t('saved')} onPress={() => {}}/>
                <SettingsButton text={t('viewed')} onPress={() => {}}/>
            </View>
            <View className="flex-col gap-[10px]">
                <SettingsButton text={t('language')} onPress={() => {}}/>
                <SettingsButton text={t('theme')} onPress={() => {}}/>
            </View>
            <View className="flex-col gap-[10px]">
                <SettingsButton text={t('about_app.title')} onPress={() => {}}/>
                <SettingsButton text={t('logout')} onPress={() => {}}/>
                <Button
                onPress={() => {}}
                appearance="dark"
                className="gap-[10px]">
                    <SuggestIcon width={25} height={25} color={color}/>
                    <AppText
                    weight="semibold"
                    size="text"
                    color="commonLightInverted"
                    >
                        {t('suggest')}
                    </AppText>
                </Button>
            </View>
        </View>
        </ScreenWrapper>
    );
};

export default ProfileTab;
