import type React from "react";
import { Text, type StyleProp, type TextStyle } from "react-native";

type SizeVariants = 'bigTitle' | 'mediumTitle' | 'smallTitle' | 'text' | 'description' | 'subtext';
type WeightVariants = 'regular' | 'semibold' | 'bold' | 'extrabold';
export type ColorVariants = 'commonLight' | 'commonDark' | 'muted';

interface Props {
    size: SizeVariants;
    weight: WeightVariants;
    color: ColorVariants;
    className?: string;
    children: React.ReactNode;
}

const SIZES = {
  bigTitle: "text-[28px]",
  mediumTitle: "text-[26px]",
  smallTitle: "text-[24px]",
  text: "text-[18px]",
  description: "text-[16px]",
  subtext: "text-[14px]",
};

const WEIGHTS = {
  regular: "font-normal",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const COLORS = {
    commonLight: 'text-light dark:text-lightGray',
    commonDark: 'text-dark',
    muted: 'text-gray'
}

const AppText = ({ size, color, weight, className, children }: Props) => {    
    const textStyles = `
        ${SIZES[size]}
        ${WEIGHTS[weight]}
        ${COLORS[color]}
    `;

    return (
        <Text className={`${textStyles} ${className ?? ""}`}>
            {children}
        </Text>
    );
}
 
export default AppText;
