import { View, Text, Image, Pressable, SafeAreaView} from 'react-native'
import Estilo from '../../assets/style/pag4'
import { Link } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function pag4(){
    const [fontsLoaded] = useFonts({
        'MinhaFonte-Regular': require('../../assets/fonts/superOcean.ttf'),
        'Fonte-texto': require('../../assets/fonts/TitilliumWeb-Regular.ttf')
    });
    // Oculta a tela de splash quando as fontes são carregadas
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        // Retorna null ou qualquer outra coisa enquanto a tela de splash ainda está visível.
        return null
    }
    return(
        <SafeAreaView>
            <Text>teste</Text>
        </SafeAreaView>
    )
}