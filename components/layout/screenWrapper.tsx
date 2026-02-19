import { View, ScrollView } from "react-native";
import TabScreenScale from "./tabScreenScale";

const ScreenWrapper = ({
    className,
    children,
    withTabScale = true,
    scrollLock
}: {
    className?: string;
    children: React.ReactNode;
    withTabScale?: boolean;
    scrollLock?: boolean
}) => {
    const content = (
        <ScrollView
        className="h-full bg-light dark:bg-dark"
        contentContainerClassName="px-[20px]"
        contentContainerStyle={{ paddingBottom: 20 }}
        scrollEnabled={!scrollLock}
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
