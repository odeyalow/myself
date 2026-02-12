import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import AppText from "@/components/ui/appText";
import RoudedButton from "@/components/roundedButton";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

import Logo from '@/assets/logos/Logo.svg';
import TextLogo from '@/assets/logos/TextLogo.svg';
import ArrowRightIcon from '@/assets/icons/system/arrow_right.svg';
import ArrowLeftIcon from '@/assets/icons/system/arrow_left.svg';
import LoginIcon from '@/assets/icons/system/login.svg';

export default function Index() {
  const { replace, push } = useRouter();
  const [slide, setSlide] = useState(1);
  const { t } = useTranslation('welcome');
  const { width } = useWindowDimensions();

  const getLogoPositionStyle = () => {
    switch (slide) {
      case 1: return { left: -100 };
      case 2: return { left: width / 2 - 200 };
      case 3: return { left: 130 };
      case 4: return null;
      default: return { left: -100 };
    }
  }

  return (
    <View className="bg-dark h-full p-[25px] flex-col justify-end items-center">
      <View className="absolute top-[50px] left-0 right-0 items-center z-10">
        <TextLogo width={124} height={28.98} color="#fff"/>
      </View>
      <View className={`${slide === 4 ? 'items-center left-0 right-0 mb-[70px]' : 'absolute bottom-0'}`} style={getLogoPositionStyle()}>
        <Logo
          width={slide === 4 ? 250 : 400}
          height={slide === 4 ? 285.88 : 457.41}
          color={slide === 4 ? "#fff" : "#1F1F1F"}/>
      </View>
      <View>
        {
          slide < 4 ? (
            <View className="mb-[50px]">
              <AppText
              size="bigTitle"
              weight="extrabold"
              color="commonLight"
              className="pb-[10px]">
                {t(`slide_${slide}.title`)}
              </AppText>
              <AppText
              size="text"
              weight="regular"
              color="commonLight">
                {t(`slide_${slide}.description`)}
              </AppText>
            </View>
          ) : (
            <AppText
            size="bigTitle"
            weight="extrabold"
            color="commonLight"
            className="text-center mb-[30px]">
              {t(`pre_auth.title`)}
            </AppText>
          )
        }
        {
          slide < 4 ? (
            <View className="flex-row items-center justify-between">
              <AppText
              size="subtext"
              weight="semibold"
              color="muted">
                {slide === 3 ? " " : t(`slide_${slide}.subtext`)}
              </AppText>
              <View className="flex-row gap-[10px]">
                {
                  slide > 1 && (
                    <RoudedButton
                    type="light"
                    onPress={() => setSlide((prev) => Math.max(prev - 1, 1))}
                    >
                      <ArrowLeftIcon width={20} height={20} color="#1F1F1F"/>
                    </RoudedButton>
                  )
                }
                <RoudedButton
                type="light"
                fullWidth={slide === 3 && true}
                onPress={() => setSlide((prev) => Math.min(prev + 1, 4))}
                >
                  {
                    slide < 3 ? (
                      <ArrowRightIcon width={20} height={20} color="#1F1F1F"/>
                    ) : (
                      <AppText
                      size="text"
                      weight="semibold"
                      color="commonDark"
                      className="text-center leading-[20px]">
                        {t('slide_3.start')}
                      </AppText>
                    )
                  }
                </RoudedButton>
              </View>
            </View>
          ) : (
            <View className="flex-col gap-[20px]">
              <View className="flex-row items-center justify-between gap-[10px]">
                <RoudedButton
                type="muted"
                fullWidth
                onPress={() => replace('/(tabs)/home')}
                >
                  {t('pre_auth.skip')}
                </RoudedButton>
                <RoudedButton
                type="light"
                fullWidth
                icon={<LoginIcon width={22.5} height={22.5}/>}
                onPress={() => push('/auth')}
                >
                  {t('pre_auth.letsgo')}
                </RoudedButton>
              </View>
              <AppText
              size="subtext"
              weight="semibold"
              color="muted"
              className="text-center w-full">
                {t('pre_auth.subtext')}
              </AppText>
            </View>
          )
        }
      </View>
    </View>
  );
}
