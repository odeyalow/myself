import { View, TouchableOpacity } from "react-native";
import AppText from "../ui/appText";

interface Props {
    categoriesList: any[];
    chapter: string;
}

const CategoriesResultList = ({ categoriesList, chapter }: Props) => {
    return (
        <View className="bg-lightGray dark:bg-darkGray w-full px-[18px] py-[14px] rounded-[14px]">
            <AppText
            weight="semibold"
            size="subtext"
            color="muted"
            className="mb-[5px]"
            >
                {chapter}
            </AppText>
            <View className="flex-col gap-[10px] items-start">
                {
                    categoriesList.map((category, index) => {
                        return (
                            <TouchableOpacity key={index}>
                                <AppText
                                weight="bold"
                                size="smallTitle"
                                color="commonDark"
                                >
                                    {category}
                                </AppText>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    );
}
 
export default CategoriesResultList;