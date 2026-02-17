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
  const { push, back } = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>(null);

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

  const handleValidation = () => {
    const login = email?.trim() ?? "";
    const pass = password?.trim() ?? "";

    if (!login || !pass) {
      setErrorMessage("fill_all_fields");
      return;
    }

    if (!emailRegex.test(login)) {
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
          {t('login.title')}
        </AppText>
        <Input
        value={email}
        appearance="dark"
        placeholder={t('email')}
        keyboardType={'default'}
        onChangeText={setEmail}
        />
        <Input
        value={password}
        isPassword
        appearance="dark"
        placeholder={t('password')}
        keyboardType="default"
        onChangeText={setPassword}
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
       <View className="flex-row justify-between">
         <TouchableOpacity
            onPress={() => push("/(auth)/login")}>
            <AppText
            weight="semibold"
            size="subtext"
            color="commonLight">
                {t('login.forgot_password')}
            </AppText>
        </TouchableOpacity>
         <TouchableOpacity
            onPress={() => back()}>
            <AppText
            weight="semibold"
            size="subtext"
            color="commonLight">
                {t('login.no_account')}
            </AppText>
        </TouchableOpacity>
       </View>
        <View className="flex-row gap-[14px]">
          <Button
          onPress={() => back()}
          appearance="accentDark"
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
          fullWidth>
            <AppText
            weight="semibold"
            size="text"
            color="commonDark">
            {t('login.button')}
            </AppText>
          </Button>
        </View>
      </View>
    </KeyboardDismissView>
  );
}
