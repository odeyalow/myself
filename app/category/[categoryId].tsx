import BackButtonWrapper from "@/components/layout/backButtonWrapper";
import ArticleButton from "@/components/ui/articleButton";

const SingleCategory = () => {
    return (
        <BackButtonWrapper
        title="Home • Cleaning"
        className="flex-col gap-[10px]"
        innerRoute>
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
        </BackButtonWrapper>
    );
}
 
export default SingleCategory;