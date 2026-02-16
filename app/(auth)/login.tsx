import { TouchableOpacity, View } from "react-native";
import AppText from "@/components/ui/appText";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

import TextLogo from '@/assets/logos/TextLogo.svg';

export default function RegistrationScreen() {
  const { t } = useTranslation(['auth', 'common']);
  const { push, back, replace } = useRouter();

  return (
    <View className="bg-dark h-full p-[25px] pt-0 flex-col items-center">
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
        appearance="dark"
        placeholder={t('login_placeholder')}
        keyboardType="default"
        onChangeText={() => {}}
        />
        <Input
        isPassword
        appearance="dark"
        placeholder={t('password')}
        keyboardType="default"
        onChangeText={() => {}}
        />
        {/* ERROR MESSAGE TEXT */}
          {/* <AppText
          weight="regular"
          size="description"
          color="error">
            Some Error Text Placeholder
          </AppText> */}
        {/* ERROR MESSAGE TEXT */}
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
          onPress={() => push('/(auth)/login')}
          appearance="light"
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
    </View>
  );
}