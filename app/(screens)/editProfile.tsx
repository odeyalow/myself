import { View } from "react-native";
import BackButtonWrapper from "@/components/layout/backButtonWrapper";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import AppText from "@/components/ui/appText";

import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const EditProfileScreen = () => {
    const { t } = useTranslation(['profile', 'knowing', 'common']);
    const { back } = useRouter();
    const [name, setName] = useState('Алдияр');
    const [age, setAge] = useState('19');

    return (
        <BackButtonWrapper
        title={t('change_profile')}
        className="flex-col gap-[10px]">
            <Input
            placeholder={t('main_info.name', { ns: 'knowing'})}
            keyboardType="default"
            onChangeText={() => {}}
            value={name}
            />
            <Input
            placeholder={t('main_info.age', { ns: 'knowing'})}
            keyboardType="number-pad"
            onChangeText={() => {}}
            value={age}
            />
            <View className="flex-row gap-[10px]">
                <Button
                onPress={() => back()}
                appearance="accentLight"
                className="justify-center"
                fullWidth>
                    <AppText
                    weight="semibold"
                    size="text"
                    color="commonDark">
                        {t('cancel', { ns: 'common'})}
                    </AppText>
                </Button>
                <Button
                onPress={() => {}}
                appearance="dark"
                className="justify-center"
                fullWidth>
                    <AppText
                    weight="semibold"
                    size="text"
                    color="commonLightInverted">
                        {t('save', { ns: 'common'})}
                    </AppText>
                </Button>
            </View>
        </BackButtonWrapper>
    );
}
 
export default EditProfileScreen;