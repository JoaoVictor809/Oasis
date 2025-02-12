import { View, Text, Image, Pressable, SafeAreaView, ImageBackground, TextInput } from 'react-native'
import Estilo from '../../assets/style/register'
import { Link } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function pag4() {
    const [text, onChangeText] = React.useState('');
    const [number, onChangeNumber] = React.useState('');
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
        <SafeAreaView style={{ flex: 1, backgroundColor: "#81B3FF" }}>
                    <View style={Estilo.container}>
                        <ImageBackground
                            source={require('../../assets/images/forma01.png')}
                            style={Estilo.forma001}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={Estilo.title}>
                        <View>
                            <Text style={Estilo.txt}>Bem vindo</Text>
                        </View>
        
                        <Text style={{ fontFamily: "Fonte-texto", color: "#fff", textAlign: "center" }}>
                        Libere todo o potencial da sua<br />
                        aprendizagem! Seu estudo personalizado<br />
                        está pronto. Faça login para uma experiência<br />
                        adaptada às suas necessidades e alcance<br />
                        resultados incríveis.
                        </Text>
                        <TextInput
                            style={Estilo.input}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="Nome Completo"
                            keyboardType="numeric" />
        
                        <TextInput
                            style={Estilo.input}
                            onChangeText={onChangeText}
                            value={number}
                            placeholder="CPF"
                            keyboardType="numeric" />

                            <TextInput
                            style={Estilo.input}
                            onChangeText={onChangeText}
                            value={number}
                            placeholder="Endereço"
                            keyboardType="numeric" />

                            <TextInput
                            style={Estilo.input}
                            onChangeText={onChangeText}
                            value={number}
                            placeholder="Email"
                            keyboardType="numeric" />

                            <TextInput
                            style={Estilo.input}
                            onChangeText={onChangeText}
                            value={number}
                            placeholder="Data"
                            keyboardType="numeric" />

                            <TextInput
                            style={Estilo.input}
                            onChangeText={onChangeText}
                            value={number}
                            placeholder="Senha"
                            keyboardType="numeric" />
                            <Pressable>
                                <Link href={'/'}>
                                <View style={Estilo.enter}>
                                    <Text style={{fontFamily:"MinhaFonte-Regular", color:"#fff", fontSize:20}}>Cadastrar</Text>
                                </View>
                                </Link>
                                
                            </Pressable>
                    </View>
                    <View style={Estilo.container002}>
                        <ImageBackground
                            source={require('../../assets/images/forma02.png')}
                            style={Estilo.forma002}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={Estilo.botao}>
                        <Pressable>
                            <Link href={'/'}>
                            <View style={Estilo.enter}>
                                    <Text style={{fontFamily:"MinhaFonte-Regular", color:"#fff", fontSize:20, paddingLeft:10, paddingRight:10}}>Entrar</Text>
                                </View>
                            </Link>
                        </Pressable>
                    </View>
                </SafeAreaView>
    )
}

