import {SafeAreaView, View, Text} from 'react-native'
import { useFonts } from "expo-font";
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import styles from '@/assets/style/cardQuestion'

export default function test(){
    const [fontsLoaded] = useFonts({
        'Poppins_Regular': require('@/assets/fonts/poppins/Poppins-Regular.ttf'),
        'Poppins_Bold': require('@/assets/fonts/poppins/Poppins-Bold.ttf')
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    return(
        <SafeAreaView style={styles.screenFull}>

        </SafeAreaView>
    )
}