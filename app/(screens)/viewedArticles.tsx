import BackButtonWrapper from "@/components/layout/backButtonWrapper";
import Button from "@/components/ui/button";
import AppText from "@/components/ui/appText";
import ArticleButton from "@/components/ui/articleButton";
import { View } from "react-native";

import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const SavedArticlesScreen = () => {
    const { t } = useTranslation('profile');

    return (
        <BackButtonWrapper
        title={t('viewed')}
        className="flex-col gap-[10px]">
            <View className="flex-col gap-[10px]">
                <ArticleButton
                text='How to keep your home clean?'
                type="question"
                articleId="id"/>
                <ArticleButton
                text='How often should you clean?'
                type="question"
                articleId="id"/>
            </View>
            {/* NEEDED WHEN THERE IS NO VIEWED ARTICLES */}
            {/* <AppText
            weight="regular"
            size="text"
            color="muted"
            className="text-center">
                {t('no_viewed')}
            </AppText> */}
        </BackButtonWrapper>
    );
}
 
export default SavedArticlesScreen;