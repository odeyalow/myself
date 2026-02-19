import { View } from 'react-native';
import AppText from '@/components/ui/appText';

import { useTranslation } from 'react-i18next';

import TextLogo from '@/assets/logos/TextLogo.svg';
import LogoAnimated from '@/assets/logos/LogoAnimated';

const GettingReady = () => {
    const { t } = useTranslation('knowing');

    return (
        <View className="bg-dark h-full flex-col items-center">
            <View className="mt-[50px] mb-[35px]">
                <TextLogo width={124} height={28.98} color="#fff"/>
            </View>
            <View className="flex-1 items-center justify-center">
                <LogoAnimated width={300} height={300} />
            </View>
            <View className='flex-col items-center mb-[50px]'>
                <AppText
                weight='extrabold'
                size='bigTitle'
                color='forceLight'
                className='text-center mb-[10px]'>
                    {t('getting_ready.title')}
                </AppText>
                <AppText
                weight='regular'
                size='text'
                color='forceLight'
                className='text-center px-[20px]'>
                    {t('getting_ready.description')}
                </AppText>
            </View>
        </View>
    );
}
 
export default GettingReady;