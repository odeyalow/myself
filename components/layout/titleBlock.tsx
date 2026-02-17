import { View } from "react-native";
import AppText from "../ui/appText";

const TitleBlock = ({ title, className, children }: { title: string, className?: string, children: React.ReactNode }) => {
    return (
        <View className="flex-col items-start gap-[14px]">
            <AppText
            weight="extrabold"
            size="mediumTitle"
            color="muted">
                {title}
            </AppText>
            <View className={className}>
                {children}
            </View>
        </View>
    );
}
 
export default TitleBlock;