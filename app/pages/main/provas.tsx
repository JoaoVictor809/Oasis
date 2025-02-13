import {View, Text, TextInput, Pressable, Image} from "react-native"
import React from "react"
import Estilo from '../../../assets/style/provas'
import { Link } from "expo-router";
import { useFonts } from "expo-font";
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function prova(){
    const [text, onChangeText] = React.useState('');
    const [fontsLoaded] = useFonts({
        'Poppins_Regular': require('../../../assets/fonts/poppins/Poppins-Regular.ttf'),
        'Poppins_Bold': require('../../../assets/fonts/poppins/Poppins-Bold.ttf')
    });
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
        <View style={Estilo.main}>
            <View >
                <Text style={Estilo.title}><h1>Provas</h1></Text>
            </View>
            <View>
            <TextInput 
                                style={Estilo.input}
                                onChangeText={onChangeText}
                                value={text}
                                placeholder="Pesquise o nome do curso"
                                keyboardType=".emailAddress" >
                                    {/* <Pressable>
                                    <Image source={require('../../../assets/images/lupa.png')} />
                                    </Pressable> */}
                                </TextInput>
            </View>
        </View>
    )
}