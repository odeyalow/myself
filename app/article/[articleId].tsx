import BackButtonWrapper from "@/components/layout/backButtonWrapper";
import ArticleButton from "@/components/ui/articleButton";
import AppText from "@/components/ui/appText";
import { View } from "react-native";
import RouteArticle from "@/components/layout/routeArticle";

import { useTranslation } from "react-i18next";

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

const SingleArticle = () => {
    const { t } = useTranslation('common');

    return (
        <BackButtonWrapper
        title="Home • Cleaning"
        className="flex-col gap-[10px]"
        innerRoute>
            <AppText
            weight="extrabold"
            size="bigTitle"
            color="commonDark"
            >
                General cleaning
            </AppText>
            <AppText
            weight="regular"
            size="text"
            color="commonDark"
            className="mb-[20px]"
            >
                A spring cleaning is a deep and thorough cleaning of the entire house, not a quick one.

                In short:
                All rooms are cleaned, including hard-to-reach areas.
                Windows, mirrors, doors, and baseboards are washed.
                The kitchen and bathroom (stove, range hood, and plumbing fixtures) are thoroughly cleaned.
                Closets are sorted out and excess items are thrown out.
                Dust is wiped everywhere, even on top of cabinets.

                When to do it: 1-2 times a year, before holidays, moving, or after renovations.

                Result: The house truly becomes cleaner, fresher, and "lighter"—like a reboot.
            </AppText>
            <View className="flex-col gap-[10px]">
                <AppText
                weight="extrabold"
                size="smallTitle"
                color="muted"
                className="mb-[10px]"
                >
                    {t('see_also')}
                </AppText>
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
            </View>
        </BackButtonWrapper>
    );
}
 
export default SingleArticle;