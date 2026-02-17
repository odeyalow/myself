import { View, ScrollView } from "react-native";
import TabScreenScale from "./tabScreenScale";

const ScreenWrapper = ({
    className,
    children,
    withTabScale = true,
}: {
    className?: string;
    children: React.ReactNode;
    withTabScale?: boolean;
}) => {
    const content = (
        <ScrollView
        className="h-full bg-light dark:bg-dark"
        contentContainerClassName="px-[20px]"
        contentContainerStyle={{ paddingBottom: 20 }}
        >
            <View className={className}>
                {children}
            </View>
        </ScrollView>
    );

    if (!withTabScale) {
        return content;
    }

    return (
        <TabScreenScale>
            {content}
        </TabScreenScale>
    );
}
 
export default ScreenWrapper;
