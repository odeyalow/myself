import { TouchableOpacity } from "react-native";
import AppText from "./ui/appText";

import { ColorVariants } from "./ui/appText";

interface Props {
    onPress?: () => void;
    type: 'light' | 'dark' | 'muted';
    disabled?: boolean
    fullWidth?: boolean
    icon?: React.ReactNode;
    className?: string;
    children: React.ReactNode;
}

const BUTTON_STYLES = {
    light: {
        bg: 'bg-white',
        text: 'commonDark'
    },
    dark: {
        bg: 'bg-dark',
        text: 'commonLight'
    },
    muted: {
        bg: 'bg-darkGray',
        text: 'commonLight'
    },
}

const RoudedButton = ({ onPress, type, disabled, fullWidth, icon, className, children }: Props) => {
    return (
        <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        className={`p-[20px] rounded-full h-[60px] flex-row justify-center items-center gap-[10px] ${BUTTON_STYLES[type].bg} ${fullWidth && 'w-full flex-1'} ${className}`}>
            <AppText
            size="text"
            weight="semibold"
            color={BUTTON_STYLES[type].text as ColorVariants}
            className="text-center leading-[20px]">
                {children}
            </AppText>
            {icon}
        </TouchableOpacity>
    );
}
 
export default RoudedButton;