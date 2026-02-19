import { TouchableOpacity, View } from "react-native";
import AppText from "@/components/ui/appText";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import KeyboardDismissView from "@/components/layout/keyboardDismissView";

import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useState } from "react";

import TextLogo from '@/assets/logos/TextLogo.svg';

type ErrorMessageType = 'fill_all_fields' | 'pass_missmatch' | 'incorrect_email_format' | 'not_enough_pass_symbols' | null;

export default function RegistrationScreen() {
  const { t } = useTranslation(['auth', 'common']);
  const { push, back, replace } = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>(null);

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

  const handleValidation = () => {
    const login = email?.trim() ?? "";
    const pass = password?.trim() ?? "";
    const confirm = confirmPassword?.trim() ?? "";

    if (!login || !pass) {
      setErrorMessage("fill_all_fields");
      return;
    }

    if (!emailRegex.test(login)) {
      setErrorMessage("incorrect_email_format");
      return;
    }

    if (pass.length < 8) {
      setErrorMessage("not_enough_pass_symbols");
      return;
    }

    if (pass !== confirm) {
      setErrorMessage("pass_missmatch");
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
          {t('registration.title')}
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
        <Input
        value={confirmPassword}
        isPassword
        appearance="dark"
        placeholder={t('confirm_password')}
        keyboardType="default"
        onChangeText={setConfirmPassword}
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
        <TouchableOpacity
        onPress={() => replace("/(auth)/login")}>
          <AppText
          weight="semibold"
          size="subtext"
          color="commonLight">
            {t('registration.have_account')}
          </AppText>
        </TouchableOpacity>
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
            {t('start_screen.next', { ns: 'common' })}
            </AppText>
          </Button>
        </View>
      </View>
    </KeyboardDismissView>
  );
}
