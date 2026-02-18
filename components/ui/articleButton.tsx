import AppText from "./appText";
import Button from "./button";

import useIconColor from "@/hooks/useIconColor";
import { useRouter } from "expo-router";

import QuestionIcon from '@/assets/icons/decoration/question.svg';
import InfoIcon from '@/assets/icons/decoration/info.svg';

interface Props {
    text: string;
    type: 'question' | 'info';
    articleId: string;
}

const ArticleButton = ({ text, type, articleId }: Props) => {
    const color = useIconColor();
    const { push } = useRouter();

    return (
        <Button
        appearance="accentLight"
        onPress={() => push({
            pathname: "/article/[articleId]",
           params: { articleId }
        })}
        fullWidth
        className='gap-[10px]'
        >   
            {
                type === 'question' && (
                    <QuestionIcon width={20} height={20} color={color} />
                )
            }
            {
                type === 'info' && (
                    <InfoIcon width={20} height={20} color={color} />
                )
            }
            <AppText
            weight="semibold"
            size="text"
            color="commonDark"
            >
                {text}
            </AppText>
        </Button>
    );
}
 
export default ArticleButton;