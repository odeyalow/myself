import { useColorScheme } from "nativewind";

const useIconColor = () => {
    const { colorScheme } = useColorScheme();
    const color = colorScheme === 'light' ? '#141414' : '#F6F6F6';
    return color;
}
 
export default useIconColor;