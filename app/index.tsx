import { View, useWindowDimensions } from "react-native";
import AppText from "@/components/ui/appText";
import RoudedButton from "@/components/ui/roundedButton";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import {
  FadeIn,
  FadeOut,
  withDelay,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";

import Logo from '@/assets/logos/Logo.svg';
import TextLogo from '@/assets/logos/TextLogo.svg';
import ArrowRightIcon from '@/assets/icons/system/arrow_right.svg';
import ArrowLeftIcon from '@/assets/icons/system/arrow_left.svg';
import LoginIcon from '@/assets/icons/system/login.svg';

const SCREEN_PADDING = 25;
const LOGO_WIDTH = 400;
const LOGO_HEIGHT = 457.41;
const PRE_AUTH_LOGO_SCALE = 0.625;
const LOGO_ANIMATION_DURATION = 450;
const SLIDE_2_LOGO_X_OFFSET = 8;
const PRE_AUTH_LOGO_X_OFFSET = 14;
const LOGO_CENTER_DURATION = 700;
const LOGO_CENTER_DAMPING_RATIO = 0.95;
const LOGO_COLOR_FADE_DURATION = 750;
const LOGO_COLOR_START_DELAY = 0;

const TITLE_ANIMATIONS = {
  entering: FadeIn.duration(300).delay(250),
  exiting: FadeOut.duration(300),
};
const DESCRIPTION_ANIMATIONS = {
  entering: FadeIn.duration(600).delay(400),
  exiting: FadeOut.duration(300),
};
const SUBTEXT_ANIMATIONS = {
  entering: FadeIn.duration(300).delay(550),
  exiting: FadeOut.duration(300),
}

export default function Index() {
  const { replace, push } = useRouter();
  const [slide, setSlide] = useState(1);
  const { t } = useTranslation('welcome');
  const { width, height } = useWindowDimensions();
  const logoLeft = useSharedValue(-100);
  const logoBottom = useSharedValue(0);
  const logoScale = useSharedValue(1);
  const logoWhiteOpacity = useSharedValue(0);

  useEffect(() => {
    const contentWidth = Math.max(width - SCREEN_PADDING * 2, 0);
    const contentHeight = Math.max(height - SCREEN_PADDING * 2, 0);
    const nextLeft =
      slide === 1 ? -100 :
      slide === 2 ? (contentWidth - LOGO_WIDTH) / 2 + SLIDE_2_LOGO_X_OFFSET :
      slide === 3 ? 130 :
      (contentWidth - LOGO_WIDTH) / 2 + PRE_AUTH_LOGO_X_OFFSET;
    const nextBottom =
      slide === 4
        ? Math.max((contentHeight - LOGO_HEIGHT) / 2, 0)
        : 0;
    const nextScale = slide === 4 ? PRE_AUTH_LOGO_SCALE : 1;

    logoWhiteOpacity.value = withTiming(0, { duration: LOGO_COLOR_FADE_DURATION });

    if (slide === 4) {
      const centerSpringConfig = {
        duration: LOGO_CENTER_DURATION,
        dampingRatio: LOGO_CENTER_DAMPING_RATIO,
      } as const;

      logoLeft.value = withSpring(nextLeft, centerSpringConfig);
      logoScale.value = withSpring(nextScale, centerSpringConfig);
      logoBottom.value = withSpring(nextBottom, centerSpringConfig, (finished) => {
        if (finished) {
          logoWhiteOpacity.value = withDelay(
            LOGO_COLOR_START_DELAY,
            withTiming(1, { duration: LOGO_COLOR_FADE_DURATION })
          );
        }
      });
      return;
    }

    logoLeft.value = withTiming(nextLeft, { duration: LOGO_ANIMATION_DURATION });
    logoBottom.value = withTiming(nextBottom, { duration: LOGO_ANIMATION_DURATION });
    logoScale.value = withTiming(nextScale, { duration: LOGO_ANIMATION_DURATION });
  }, [height, slide, width]);

  const logoStyle = useAnimatedStyle(() => ({
    left: logoLeft.value,
    bottom: logoBottom.value,
    transform: [{ scale: logoScale.value }],
  }));
  const darkLogoStyle = useAnimatedStyle(() => ({
    opacity: 1 - logoWhiteOpacity.value,
  }));
  const lightLogoStyle = useAnimatedStyle(() => ({
    opacity: logoWhiteOpacity.value,
  }));

  return (
    <View className="bg-dark h-full p-[25px] flex-col justify-end items-center">
      <View className="absolute top-[50px] left-0 right-0 items-center z-10">
        <TextLogo width={124} height={28.98} color="#fff"/>
      </View>
      <Animated.View className="absolute" style={logoStyle}>
        <Animated.View style={darkLogoStyle}>
          <Logo
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            color="#1F1F1F"/>
        </Animated.View>
        <Animated.View className="absolute left-0 top-0" style={lightLogoStyle}>
          <Logo
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            color="#fff"/>
        </Animated.View>
      </Animated.View>
      <View className="w-full">
        {
          slide < 4 && (
            <View className="mb-[50px]">
              {
                slide === 1 && (
                  <>
                    <AppText
                    size="bigTitle"
                    weight="extrabold"
                    color="commonLight"
                    className="pb-[10px]"
                    {...TITLE_ANIMATIONS}>
                      {t('slide_1.title')}
                    </AppText>
                    <AppText
                    size="text"
                    weight="regular"
                    color="commonLight"
                    {...DESCRIPTION_ANIMATIONS}>
                      {t('slide_1.description')}
                    </AppText>
                  </>
                )
              }
              {
                slide === 2 && (
                  <>
                    <AppText
                    size="bigTitle"
                    weight="extrabold"
                    color="commonLight"
                    className="pb-[10px]"
                    {...TITLE_ANIMATIONS}>
                      {t('slide_2.title')}
                    </AppText>
                    <AppText
                    size="text"
                    weight="regular"
                    color="commonLight"
                    {...DESCRIPTION_ANIMATIONS}>
                      {t('slide_2.description')}
                    </AppText>
                  </>
                )
              }
              {
                slide === 3 && (
                  <>
                    <AppText
                    size="bigTitle"
                    weight="extrabold"
                    color="commonLight"
                    className="pb-[10px]"
                    {...TITLE_ANIMATIONS}>
                      {t('slide_3.title')}
                    </AppText>
                    <AppText
                    size="text"
                    weight="regular"
                    color="commonLight"
                    {...DESCRIPTION_ANIMATIONS}>
                      {t('slide_3.description')}
                    </AppText>
                  </>
                )
              }
            </View>
          )
        }
        {
          slide < 4 ? (
            <View className="w-full flex-row items-center justify-between">
              {
                slide === 1 && (
                  <AppText
                  size="subtext"
                  weight="semibold"
                  color="muted"
                  {...SUBTEXT_ANIMATIONS}
                  >
                    {t('slide_1.subtext')}
                  </AppText>
                )
              }
              {
                slide === 2 && (
                  <AppText
                  size="subtext"
                  weight="semibold"
                  color="muted"
                  {...SUBTEXT_ANIMATIONS}>
                    {t('slide_2.subtext')}
                  </AppText>
                )
              }
              <View className={`flex-row gap-[10px] ${slide === 3 ? 'flex-1 justify-end' : ''}`}>
                {
                  slide > 1 && (
                    <RoudedButton
                    appearance="light"
                    onPress={() => setSlide((prev) => Math.max(prev - 1, 1))}
                    >
                      <ArrowLeftIcon width={20} height={20} color="#1F1F1F"/>
                    </RoudedButton>
                  )
                }
                <RoudedButton
                appearance="light"
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
              <AppText
              size="bigTitle"
              weight="extrabold"
              color="commonLight"
              className="text-center"
              entering={FadeIn.duration(300).delay(250)}>
                {t(`pre_auth.title`)}
              </AppText>
              <View className="flex-row items-center justify-between gap-[10px]">
                <RoudedButton
                appearance="muted"
                fullWidth
                onPress={() => replace('/(tabs)/home')}
                >
                  {t('pre_auth.skip')}
                </RoudedButton>
                <RoudedButton
                appearance="light"
                fullWidth
                icon={<LoginIcon width={22.5} height={22.5}/>}
                onPress={() => push('/(auth)/registration')}
                >
                  {t('pre_auth.letsgo')}
                </RoudedButton>
              </View>
              <AppText
              size="subtext"
              weight="semibold"
              color="muted"
              className="text-center w-full"
              entering={FadeIn.duration(300).delay(550)}>
                {t('pre_auth.subtext')}
              </AppText>
            </View>
          )
        }
      </View>
    </View>
  );
}
