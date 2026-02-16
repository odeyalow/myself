import { KeyboardType,  TextInput, TouchableOpacity, View } from "react-native";

import { useState } from "react";

import EyeOpen from "@/assets/icons/system/eye_open.svg";
import EyeClosed from "@/assets/icons/system/eye_closed.svg";

interface Props {
    appearance?: "light" | "dark",
    isPassword?: boolean;
    value?: any;
    placeholder: string;
    disabled?: boolean;
    keyboardType?: KeyboardType;
    onChangeText: (text: string) => void;
    className?: string;
}

const APPEARANCE_STYLES = {
    light: 'bg-lightGray text-dark',
    dark: 'bg-darkGray text-lightGray'
}

const Input = ({
    appearance = "light",
    isPassword,
    value,
    placeholder,
    disabled,
    keyboardType,
    onChangeText,
    className
} : Props) => {
    const [showPass, setShowPass] = useState(false);

     if ( isPassword ) {
        return (
            <View className={`rounded-[14px] flex-row justify-between items-center pr-[20px]
            ${APPEARANCE_STYLES[appearance] ?? "bg-lightGray dark:bg-darkGray"}`}>
                <TextInput
                value={value}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={!showPass}
                editable={!disabled}
                onChangeText={(text: string) => onChangeText(text)}
                className={`px-[20px] py-[16px] min-h-[54px] flex-1 w-full text-[18px] rounded-[14px] font-montserrat placeholder:text-gray
                ${APPEARANCE_STYLES[appearance] ?? "text-lightGray"}
                ${className}`}/>
                <TouchableOpacity onPress={() => setShowPass(prev => !prev)}>
                    {
                        showPass
                        ? <EyeOpen width={20} height={20} color="#747474" className="mt-10"/>
                        : <EyeClosed width={18} height={18} color="#747474"/>
                    }
                </TouchableOpacity>
            </View>
        )
        } else {
        return (
            <TextInput
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            editable={!disabled}
            onChangeText={(text: string) => onChangeText(text)}
            className={`px-[20px] py-[16px] w-full text-[18px] font-montserrat rounded-[14px] placeholder:text-gray
            ${APPEARANCE_STYLES[appearance] ?? "bg-lightGray text-dark dark:bg-darkGray dark:text-lightGray"}
            ${className}`}/>
        )
    }
}
export default Input;
