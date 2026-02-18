import BackButtonWrapper from "@/components/layout/backButtonWrapper";
import AppText from "@/components/ui/appText";
import Button from "@/components/ui/button";

import useIconColor from "@/hooks/useIconColor";
import { useRouter } from "expo-router";

import ArrowRight from '@/assets/icons/system/arrow_right.svg';

const SingleChapter = () => {
    const color = useIconColor();
    const { push } = useRouter();

    return (
        <BackButtonWrapper
        title="Home"
        className="flex-col gap-[10px]">
            <Button
            appearance="accentLight"
            onPress={() => push({
                pathname: '/category/[categoryId]',
                params: { categoryId: 'cleaning' }
            })}
            className="justify-between"
            >
                <AppText
                weight="semibold"
                size="text"
                color="commonDark"
                >
                    Cleaning
                </AppText>
                <ArrowRight width={20} height={20} color={color} />
            </Button>
            <Button
            appearance="accentLight"
            onPress={() => push({
                pathname: '/category/[categoryId]',
                params: { categoryId: 'cooking' }
            })}
            className="justify-between"
            >
                <AppText
                weight="semibold"
                size="text"
                color="commonDark"
                >
                    Cooking
                </AppText>
                <ArrowRight width={20} height={20} color={color} />
            </Button>
            <Button
            appearance="accentLight"
            onPress={() => push({
                pathname: '/category/[categoryId]',
                params: { categoryId: 'repairing' }
            })}
            className="justify-between"
            >
                <AppText
                weight="semibold"
                size="text"
                color="commonDark"
                >
                    Repairing
                </AppText>
                <ArrowRight width={20} height={20} color={color} />
            </Button>
        </BackButtonWrapper>
    );
}
 
export default SingleChapter;