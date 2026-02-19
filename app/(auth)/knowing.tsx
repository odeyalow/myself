import { TouchableOpacity, View } from "react-native";
import AppText from "@/components/ui/appText";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import KeyboardDismissView from "@/components/layout/keyboardDismissView";

import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useState } from "react";

import TextLogo from '@/assets/logos/TextLogo.svg';

export default function RegistrationScreen() {
  const { t } = useTranslation(['auth', 'common']);
  const { back, replace } = useRouter();

  return (
    <KeyboardDismissView className="bg-dark h-full p-[25px] pt-0 flex-col items-center">
      <View className="mt-[50px] mb-[35px]">
        <TextLogo width={124} height={28.98} color="#fff"/>
      </View>
      <View className="flex-col self-start gap-[14px] w-full">
        <AppText
        weight="bold"
        size="smallTitle"
        color="commonLight"
        >
          {t('password_reset.title')}
        </AppText>
        <View className="flex-row gap-[14px]">
          <Button
          onPress={() => back()}
          appearance="accentDark"
          className="justify-center"
          fullWidth>
            <AppText
            weight="semibold"
            size="text"
            color="commonLight">
            {t('start_screen.back', { ns: 'common' })}
            </AppText>
          </Button>
          <Button
          onPress={() => {}}
          appearance="light"
          className="justify-center"
          fullWidth>
            <AppText
            weight="semibold"
            size="text"
            color="commonDark">
            {t('next', { ns: 'common' })}
            </AppText>
          </Button>
        </View>
      </View>
    </KeyboardDismissView>
  );
}