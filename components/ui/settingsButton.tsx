import { Pressable } from "react-native";
import Button from "./button";
import AppText from "./appText";

const SettingsButton = ({ text, onPress }: { text: string, onPress: () => void }) => {
    return (
        <Button
        appearance="accentLight"
        onPress={onPress}
        className="justify-start"
        >
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
 
export default SettingsButton;