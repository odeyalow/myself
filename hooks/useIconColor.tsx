import { useColorScheme } from "nativewind";

const useIconColor = (invertColor?: boolean) => {
    const { colorScheme } = useColorScheme();
    const isLight = colorScheme === "light";

    return invertColor
        ? isLight
        ? "#F6F6F6"
        : "#141414"
        : isLight
        ? "#141414"
        : "#F6F6F6";
}
 
export default useIconColor;