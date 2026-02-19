import { TouchableOpacity, View } from "react-native";
import AppText from "@/components/ui/appText";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import KeyboardDismissView from "@/components/layout/keyboardDismissView";

import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useState } from "react";

import TextLogo from '@/assets/logos/TextLogo.svg';

type ErrorMessageType = 'fill_all_fields' | 'incorrect_email_format' | 'not_enough_pass_symbols' | null;

export default function RegistrationScreen() {
  const { t } = useTranslation(['auth', 'common']);
  const { back, replace } = useRouter();
  const [email, setEmail] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>(null);

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

   const handleValidation = () => {
    const emailTrimmed = email?.trim() ?? "";

    if (!emailTrimmed) {
      setErrorMessage("fill_all_fields");
      return;
    }

    if (!emailRegex.test(emailTrimmed)) {
      setErrorMessage("incorrect_email_format");
      return;
    }

    setErrorMessage(null);
  }

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
        <Input
        value={email}
        appearance="dark"
        placeholder={t('email')}
        keyboardType={'default'}
        onChangeText={setEmail}
        />
        {
          errorMessage && (
            <AppText
            weight="regular"
            size="description"
            color="error">
              {t(`validation.${errorMessage}`)}
            </AppText>
          )
        }
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
          onPress={() => handleValidation()}
          appearance="light"
          className="justify-center"
          fullWidth>
            <AppText
            weight="semibold"
            size="text"
            color="commonDark">
            {t('password_reset.button')}
            </AppText>
          </Button>
        </View>
        <AppText
        weight="regular"
        size="description"
        color="muted">
            {t('password_reset.description')}
        </AppText>
      </View>
    </KeyboardDismissView>
  );
}
