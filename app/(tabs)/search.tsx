import { View, TextInput } from "react-native";
import ScreenWrapper from "@/components/layout/screenWrapper";
import AppText from "@/components/ui/appText";
import Input from "@/components/ui/input";
import TitleBlock from "@/components/layout/titleBlock";
import RouteArticle from "@/components/layout/routeArticle";
import CategoriesResultList from "@/components/layout/categoriesResultList";
import Button from "@/components/ui/button";
import HistoryButton from "@/components/ui/historyButton";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams, useRouter } from "expo-router";
import useIconColor from "@/hooks/useIconColor";

import NoResultIcon from '@/assets/icons/decoration/no_result.svg';
import ArrowRightIcon from '@/assets/icons/system/arrow_right.svg';

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

const SearchTab = () => {
    const { t } = useTranslation('search');
    const [value, setValue] = useState('');
    const normalizedValue = value.trim().toLowerCase();
    const noResultIconColor = useIconColor();
    const noResultButtonColor = useIconColor(true);
    const { input } = useLocalSearchParams();
    const { setParams } = useRouter();
    const inputRef = useRef<TextInput>(null);

    const shouldFocusInput = Array.isArray(input)
        ? input.includes('focus')
        : input === 'focus';

    useEffect(() => {
        if (!shouldFocusInput) {
            return;
        }

        const timer = setTimeout(() => {
            inputRef.current?.focus();
            setParams({ input: undefined });
        }, 50);

        return () => clearTimeout(timer);
    }, [setParams, shouldFocusInput]);

    const filteredArticles = ARTICLE_PLACEHOLDER_DATA.filter((article) => {
        if (!normalizedValue) true;
        return article.title.toLowerCase().includes(normalizedValue)
    });

    const filteredCategories = ARTICLE_PLACEHOLDER_DATA.filter((article) => {
        if (!normalizedValue) true;
        return article.title.toLowerCase().includes(normalizedValue) ||
            article.category.toLowerCase().includes(normalizedValue)
    });

    const handleHistory = (value: string) => {
        setValue(value);
    }

    return (
        <ScreenWrapper className="flex-col gap-[15px]">
            <View>
                <AppText
                weight="extrabold"
                size="bigTitle"
                color="commonDark"
                className="mb-[10px]"
                >
                    {t('title')}
                </AppText>
                <Input
                inputRef={inputRef}
                value={value}
                onChangeText={(text) => setValue(text)}
                keyboardType="default"
                placeholder={t('placeholder')}
                />
            </View>
            {
                value.trim() && filteredArticles.length > 0 && (
                    <TitleBlock
                    title={t('materials')}
                    className="flex-col gap-[14px]">
                        {
                            filteredArticles.map((article, index) => (
                                <RouteArticle
                                key={index}
                                title={article.title}
                                category={article.category}
                                chapter={article.chapter}
                                />
                            ))
                        }
                    </TitleBlock>
                )
            }
            {
                value.trim() && filteredCategories.length > 0 && (
                    <TitleBlock
                    title={t('categories')}
                    className="flex-col gap-[14px w-full">
                        <CategoriesResultList
                        chapter={'Home'}
                        categoriesList={['Cleaning', 'Repairing', 'Cooking', 'Neighborhood']}
                        />
                    </TitleBlock>
                )
            }
            {
                value.trim() === '' && (
                    <View className="flex-col gap-[10px]">
                        <HistoryButton handleHistory={handleHistory} text="Some History 1"/>
                        <HistoryButton handleHistory={handleHistory} text="Some History 2"/>
                        <HistoryButton handleHistory={handleHistory} text="Some History 3"/>
                    </View>
                )
            }
            {
                value.trim() && (
                    <View className="flex-col items-center mt-[10px]">
                        <View className="mb-[10px]">
                            <NoResultIcon width={40} height={40} color={noResultIconColor}/>
                        </View>
                        <AppText
                        weight="bold"
                        size="smallTitle"
                        color="commonDark"
                        className="mb-[5px]">
                            {t('no_result.title')}
                        </AppText>
                        <AppText
                        weight="regular"
                        size="description"
                        color="commonDark"
                        className="mb-[20px]">
                            {t('no_result.text')}
                        </AppText>
                        <Button
                        onPress={() => {}}
                        appearance="dark"
                        className="gap-[10px]"
                        >
                            <AppText
                            weight="semibold"
                            size="text"
                            color="commonLightInverted">
                                {t('no_result.suggest_btn')}
                            </AppText>
                            <ArrowRightIcon width={16} height={16} color={noResultButtonColor}/>
                        </Button>
                    </View>
                )
            }
        </ScreenWrapper>
    );
}
 
export default SearchTab;
