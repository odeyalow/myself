import { View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { LinearTransition, FadeIn, FadeOut } from "react-native-reanimated";
import Button from "@/components/ui/button";
import ScreenWrapper from "@/components/layout/screenWrapper";
import TitleBlock from "@/components/layout/titleBlock";
import ChapterCard from "@/components/layout/chapterCard";
import RouteArticle from "@/components/layout/routeArticle";

import { useState } from "react";
import { useRouter } from "expo-router";

import TextLogo from '@/assets/logos/TextLogo.svg';
import SearchIcon from '@/assets/icons/tab/search.svg'
import CrossIcon from '@/assets/icons/system/cross.svg';
// Temporary icons
import HomeIcon from '@/assets/icons/decoration/home.svg';
import StudiesIcon from '@/assets/icons/decoration/studies.svg';
import JobIcon from '@/assets/icons/decoration/job.svg';
import FinanceIcon from '@/assets/icons/decoration/finance.svg';
import RighstIcon from '@/assets/icons/decoration/rights.svg';
import LifeIcon from '@/assets/icons/decoration/life.svg';

import useIconColor from "@/hooks/useIconColor";
import { useTranslation } from "react-i18next";
import AppText from "@/components/ui/appText";

const CHAPTERS_PLACHOLDER_DATA = [
    {
      title: 'Home', icon: HomeIcon, categories: [
        { title: 'Cleaning'
          // ...other category data
        },
        { title: 'Cooking'
          // ...other category data
        },
        { title: 'Repairing'
          // ...other category data
        },
        { title: 'Neighborhood'
          // ...other category data
        },
      ]
    },
    {
      title: 'Studies', icon: StudiesIcon, categories: [
        { title: 'Education'
          // ...other category data
        },
        { title: 'Grades'
          // ...other category data
        },
        { title: 'Profession'
          // ...other category data
        },
        { title: 'Future'
          // ...other category data
        },
      ]
    },
    {
      title: 'Work', icon: JobIcon, categories: [
        { title: 'Searching'
          // ...other category data
        },
        { title: 'Preparing'
          // ...other category data
        },
        { title: 'Skills'
          // ...other category data
        },
        { title: 'Experience'
          // ...other category data
        },
      ]
    },
    {
      title: 'Finance', icon: FinanceIcon, categories: [
        { title: 'Salary'
          // ...other category data
        },
        { title: 'Investments'
          // ...other category data
        },
        { title: 'Savings'
          // ...other category data
        },
        { title: 'Plans'
          // ...other category data
        },
      ]
    },
    {
      title: 'Rights', icon: RighstIcon, categories: [
        { title: 'Socium'
          // ...other category data
        },
        { title: 'Constitution'
          // ...other category data
        },
        { title: 'Policy'
          // ...other category data
        },
        { title: 'Defence'
          // ...other category data
        },
      ]
    },
    {
      title: 'Life', icon: LifeIcon, categories: [
        { title: 'Health'
          // ...other category data
        },
        { title: 'Psychology'
          // ...other category data
        },
        { title: 'Achievments'
          // ...other category data
        },
        { title: 'Meaning'
          // ...other category data
        },
      ]
    }
];
const ARTICLE_PLACEHOLDER_DATA = [
  {
    title: 'How to keep the house clean?',
    category: 'Cleaning',
    chapter: 'Home'
  },
  {
    title: 'Look at these 3 things when choosing a job!',
    category: 'Searching',
    chapter: 'Job'
  },
  {
    title: 'How to maintain hygiene?',
    category: 'Health',
    chapter: 'Life'
  },
  {
    title: 'Do you want to get a pet?',
    category: 'Neighborhood',
    chapter: 'Home'
  },
];

export default function HomeTab() {
  const color = useIconColor();
  const { t } = useTranslation('home');
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);
  const { push } = useRouter();
  const layoutTransition = LinearTransition.springify();

  return (
    <ScreenWrapper className="flex-col gap-[15px]">
      <Animated.View
      layout={layoutTransition}
      className="flex-row justify-between items-center">
        <TextLogo width={150} height={35.06} color={color}/>
        <Button
        onPress={() => push({
          pathname: '/(tabs)/search',
          params: { input: 'focus' }
        })}
        appearance="accentLight"
        className="aspect-square min-w-[54px] min-h-[54px] rounded-full"
        >
          <SearchIcon color={color}/>
        </Button>
      </Animated.View>
      {
        showWelcomeCard && (
          <Animated.View
          layout={layoutTransition}
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(140)}
          >
            <LinearGradient
            colors={["#3A3A3A", "#1F1F1F"]}
            locations={[0.03, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ borderRadius: 14, paddingVertical: 14, paddingHorizontal: 18, position: 'relative' }}
            >
              <Pressable
              onPress={() => setShowWelcomeCard(false)}
              hitSlop={10}
              className="absolute right-4 top-4 z-10 p-2">
                <CrossIcon width={15} height={15} color="#F6F6F6" />
              </Pressable>
              <AppText
              weight="extrabold"
              size="mediumTitle"
              color="forceLight"
              className="mb-[10px]">
                {t('welcome_card.title')}
              </AppText>
              <AppText
              weight="regular"
              size="text"
              color="forceLight">
                {t('welcome_card.text')}
              </AppText>
            </LinearGradient>
          </Animated.View>
        )
      }
      <Animated.View layout={layoutTransition} className="w-full">
        <TitleBlock
        title={t('chapters')}
        className="w-full flex-row flex-wrap justify-between">
            {CHAPTERS_PLACHOLDER_DATA.map((chapter, index) => (
            <View key={index} className="w-[48%] mb-[12px]">
              <ChapterCard
                chapterId={index}
                title={chapter.title}
                categories={chapter.categories}
                icon={<chapter.icon width={25} height={25} color={color} />}
              />
            </View>
          ))}
        </TitleBlock>
      </Animated.View>
      <Animated.View layout={layoutTransition} className="w-full">
        <TitleBlock
        title={t('fast_recomendations')}
        className="flex-col gap-[14px]">
          {
            ARTICLE_PLACEHOLDER_DATA.map((article, index) => {
              return (
                <RouteArticle
                key={index}
                title={article.title}
                category={article.category}
                chapter={article.chapter}/>
              )
            })
          }
        </TitleBlock>
      </Animated.View>
    </ScreenWrapper>
  );
}
