import { View, ScrollView } from "react-native";
import AppText from "@/components/ui/appText";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import KeyboardDismissView from "@/components/layout/keyboardDismissView";
import PillSelect from "@/components/layout/pillsSelect";

import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useState } from "react";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

import TextLogo from '@/assets/logos/TextLogo.svg';

type SelectType = "single" | "multiple";

type SituationOption = {
  id: string;
  value: string;
  isSelected: boolean;
};

type Situation = {
  id: string;
  type: SelectType;
  options: SituationOption[];
};

export default function RegistrationScreen() {
  const { t } = useTranslation(['knowing', 'common', 'auth']);
  const { back, replace } = useRouter();
  const [step, setStep] = useState(1);
  const [situations, setSituations] = useState<Situation[]>(
    [
      {
        id: "studies", type: "single", options: [
          { id: "not_studying", value: "1", isSelected: false },
          { id: "wants_to_enroll", value: "2", isSelected: false },
          { id: "studying", value: "3", isSelected: false },
        ]
      },
      {
        id: "work", type: "single", options: [
          { id: "not_employeed", value: "1", isSelected: false },
          { id: "looking_for_job", value: "2", isSelected: false },
          { id: "employeed", value: "3", isSelected: false },
          { id: "works_part_time", value: "4", isSelected: false },
        ]
      },
      {
        id: "living", type: "single", options: [
          { id: "living_with_parents", value: "1", isSelected: false },
          { id: "living_alone", value: "2", isSelected: false },
          { id: "living_with_someone", value: "3", isSelected: false },
        ]
      },
      {
        id: "worryings", type: "multiple", options: [
          { id: "no_rights_knowledge", value: "1", isSelected: false },
          { id: "no_everyday_life_knowledge", value: "2", isSelected: false },
          { id: "not_enough_money", value: "3", isSelected: false },
          { id: "no_documents_knowledge", value: "4", isSelected: false },
        ]
      },
      {
        id: "importants", type: "multiple", options: [
          { id: "finding_a_job", value: "1", isSelected: false },
          { id: "finance_management", value: "2", isSelected: false },
          { id: "living_alone", value: "3", isSelected: false },
          { id: "rights_knowledge", value: "4", isSelected: false },
          { id: "get_studying", value: "5", isSelected: false },
        ]
      },
    ]
  )
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSelect = (topicId: string, optionId: string, type: SelectType) => {
    setSituations((prev) =>
      prev.map((situation) => {
        if (situation.id !== topicId) {
          return situation;
        }

        if (type === "single") {
          const selectedOption = situation.options.find((option) => option.id === optionId);
          const shouldSelect = !selectedOption?.isSelected;

          return {
            ...situation,
            options: situation.options.map((option) => ({
              ...option,
              isSelected: option.id === optionId ? shouldSelect : false,
            })),
          };
        }

        return {
          ...situation,
          options: situation.options.map((option) =>
            option.id === optionId
              ? { ...option, isSelected: !option.isSelected }
              : option,
          ),
        };
      }),
    );
  };

  const handleValidation = () => {
    if (name.trim().length === 0 || age.trim().length === 0) setErrorMessage("fill_all_fields");
    else {
      setErrorMessage(null);
      if (step < 2)  setStep(prev => prev+1);
      else replace('/(auth)/gettingReady')
    }
  }

  const STEP_ANIMATIONS = {
    entering: FadeIn.duration(300),
    exiting: FadeOut.duration(300),
  };
  const buttonLayoutAnimation = LinearTransition
    .duration(220)
    .easing(Easing.inOut(Easing.ease));

  return (
    <ScrollView className="bg-dark">
      <KeyboardDismissView className="bg-dark h-full p-[25px] pt-0 flex-col items-center">
        <View className="mt-[50px] mb-[35px]">
          <TextLogo width={124} height={28.98} color="#fff"/>
        </View>
        <View className="flex-col self-start gap-[14px] w-full">
          <View className="overflow-hidden">
            <Animated.View
            key={`step-${step}`}
            entering={STEP_ANIMATIONS.entering}
            exiting={STEP_ANIMATIONS.exiting}
            className="flex-col gap-[14px]">
              {
                step === 1 && (
                  <>
                    <AppText
                    weight="bold"
                    size="smallTitle"
                    color="commonLight"
                    >
                      {t('main_info.title')}
                    </AppText>
                    <Input
                    placeholder={t('main_info.name', { ns: 'knowing'})}
                    keyboardType="default"
                    onChangeText={(text) => setName(text)}
                    appearance="dark"
                    value={name}
                    />
                    <Input
                    placeholder={t('main_info.age', { ns: 'knowing'})}
                    keyboardType="number-pad"
                    onChangeText={(text) => setAge(text)}
                    appearance="dark"
                    value={age}
                    />
                    {
                      errorMessage && (
                        <AppText
                        weight="regular"
                        size="description"
                        color="error">
                          {t(`validation.${errorMessage}`, { ns: 'auth' })}
                        </AppText>
                      )
                    }
                  </>
                )
              }
              {
                step === 2 && (
                  <>
                    <AppText
                    weight="bold"
                    size="smallTitle"
                    color="commonLight"
                    >
                      {t('about_user.title')}
                    </AppText>
                    <View className="flex-col gap-[30px]">
                      {
                        situations.map(situation => {
                          return (
                            <PillSelect
                            key={situation.id}
                            topicId={situation.id}
                            type={situation.type}
                            title={t(`about_user.${situation.id}.label`)}
                            options={situation.options}
                            onSelect={onSelect}/>
                          )
                        })
                      }
                    </View>
                  </>
                )
              }
            </Animated.View>
          </View>
          <Animated.View
          layout={buttonLayoutAnimation}
          className="flex-row gap-[14px]">
            <Button
            onPress={() => {
              if (step > 1) {
                setStep((prev) => prev - 1);
                return;
              }

              back();
            }}
            appearance="forceAccentDark"
            className="justify-center"
            fullWidth>
              <AppText
              weight="semibold"
              size="text"
              color="forceLight">
              {t('start_screen.back', { ns: 'common' })}
              </AppText>
            </Button>
            <Button
            onPress={handleValidation}
            appearance="forceLight"
            className="justify-center"
            fullWidth>
              <AppText
              weight="semibold"
              size="text"
              color="forceDark">
              {
                step === 2 ? t('start_screen.ready', { ns: 'common' }) : t('start_screen.next', { ns: 'common' })
              }
              </AppText>
            </Button>
          </Animated.View>
        </View>
      </KeyboardDismissView>
    </ScrollView>
  );
}
