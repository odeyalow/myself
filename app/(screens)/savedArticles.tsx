import { View } from "react-native";
import BackButtonWrapper from "@/components/layout/backButtonWrapper";
import AppText from "@/components/ui/appText";
import ArticleButton from "@/components/ui/articleButton";

import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const SavedArticlesScreen = () => {
    const { t } = useTranslation('profile');

    return (
        <BackButtonWrapper
        title={t('saved')}
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
                <ArticleButton
                text='Key steps in cleaning'
                type="info"
                articleId="id"/>
            </View>
            {/* NEEDED WHEN THERE IS NO SAVED ARTICLES */}
            {/* <AppText
            weight="regular"
            size="text"
            color="muted"
            className="text-center">
                {t('no_saved')}
            </AppText> */}
        </BackButtonWrapper>
    );
}
 
export default SavedArticlesScreen;