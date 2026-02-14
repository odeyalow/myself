import type { ComponentProps } from "react";
import Animated from "react-native-reanimated";
import { StyleProp, TextStyle } from "react-native";

type SizeVariants = 'bigTitle' | 'mediumTitle' | 'smallTitle' | 'text' | 'description' | 'subtext';
type WeightVariants = 'regular' | 'semibold' | 'bold' | 'extrabold';
export type ColorVariants = 'commonLight' | 'commonDark' | 'muted';
type AnimatedTextProps = ComponentProps<typeof Animated.Text>;

interface Props extends Omit<AnimatedTextProps, "style" | "children"> {
  size: SizeVariants;
  weight: WeightVariants;
  color: ColorVariants;
  style?: StyleProp<TextStyle>;
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

const AppText = ({ size, color, weight, style, className, children, ...props }: Props) => {    
    const textStyles = `
        ${SIZES[size]}
        ${WEIGHTS[weight]}
        ${COLORS[color]}
    `;

    return (
        <Animated.Text
        {...props}
        className={`${textStyles} ${className ?? ""}`}
        style={style}>
            {children}
        </Animated.Text>
    );
}
 
export default AppText;
