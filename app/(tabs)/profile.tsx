import { View } from "react-native";
import ScreenWrapper from "@/components/layout/screenWrapper";
import AppText from "@/components/ui/appText";
import SettingsButton from "@/components/ui/settingsButton";
import Button from "@/components/ui/button";
import SelectModal from "@/components/layout/selectModal";

import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import useIconColor from "@/hooks/useIconColor";
import { useThemeMode } from "@/contexts/themeModeContext";
import type { ThemeMode } from "@/contexts/themeModeContext";
import { useState } from "react";

import SuggestIcon from '@/assets/icons/decoration/suggest.svg';
import LoginIcon from '@/assets/icons/system/login.svg';

const ProfileTab = () => {
    const { t, i18n } = useTranslation(['profile', 'common', 'auth']);
    const color = useIconColor(true);
    const { push } = useRouter();
    const [showThemeModal, setShowThemeModal] = useState(false);
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const { themeMode, setThemeMode } = useThemeMode();
    // USER IMITATION
    const user = false;

    const THEMES = [
        { id: 'light', value: t('theme_modal.light') },
        { id: 'dark', value: t('theme_modal.dark') },
        { id: 'system', value: t('theme_modal.system') },
    ];
    const LANGUAGES = [
        { id: 'kk', value: t('kazakh', { ns: 'common'}) },
        { id: 'ru', value: t('russian', { ns: 'common'}) },
        { id: 'en', value: t('english', { ns: 'common'}) },
    ];
      
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
    const onThemeChange = (theme: ThemeMode) => {
        setThemeMode(theme);
    }
    const onLocaleChange = (locale: 'kk' | 'ru' | 'en') => {
        i18n.changeLanguage(locale);
    }
    
    return (
        <>
            <ScreenWrapper className="flex-col gap-[15px]">
                <AppText
                    weight="extrabold"
                    size="bigTitle"
                    color="commonDark"
                    className="mb-[10px]"
                >
                    {t("title")}
                </AppText>
                <Button
                onPress={() => push('/(auth)/login')}
                appearance="dark"
                className="gap-[10px] justify-center">
                    <AppText
                    weight="semibold"
                    size="text"
                    color="commonLightInverted"
                    >
                        {t('login.button', { ns: 'auth' })}
                    </AppText>
                    <LoginIcon width={20} height={20} color={color}/>
                </Button>
                {
                    user && (
                        <>
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
                        </>
                    )
                }
                <View className="flex-col gap-[25px]">
                    {
                        user && (
                            <>
                                <SettingsButton text={t('change')} onPress={() => push('/editProfile')}/>
                                <View className="flex-col gap-[10px]">
                                    <SettingsButton text={t('saved')} onPress={() => push('/savedArticles')}/>
                                    <SettingsButton text={t('viewed')} onPress={() => push('/viewedArticles')}/>
                                </View>
                            </>
                        )
                    }
                    <View className="flex-col gap-[10px]">
                        <SettingsButton text={t('language')} onPress={() => setShowLanguageModal(true)}/>
                        <SettingsButton text={t('theme')} onPress={() => setShowThemeModal(true)}/>
                    </View>
                    <View className="flex-col gap-[10px]">
                        <SettingsButton text={t('about_app.title')} onPress={() => push('/(screens)/aboutApp')}/>
                        {
                            user && (
                                <>
                                    <SettingsButton text={t('logout')} onPress={() => {}}/>
                                    <Button
                                    onPress={() => {}}
                                    appearance="dark"
                                    className="gap-[10px] justify-center">
                                        <SuggestIcon width={25} height={25} color={color}/>
                                        <AppText
                                        weight="semibold"
                                        size="text"
                                        color="commonLightInverted"
                                        >
                                            {t('suggest')}
                                        </AppText>
                                    </Button>
                                </>
                            )
                        }
                        
                    </View>
                </View>
            </ScreenWrapper>
            {
                showThemeModal && (
                    <SelectModal
                    title={t('theme_modal.title')}
                    options={THEMES}
                    defaultValue={themeMode}
                    onSelect={onThemeChange}
                    onClose={() => setShowThemeModal(false)}
                    />
                )
            }
            {
                showLanguageModal && (
                    <SelectModal
                    title={t('language_modal_title')}
                    options={LANGUAGES}
                    defaultValue={i18n.language}
                    onSelect={onLocaleChange}
                    onClose={() => setShowLanguageModal(false)}
                    />
                )
            }
        </>
    );
};

export default ProfileTab;
