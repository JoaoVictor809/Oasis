import { StyleSheet, View, Text, ImageBackground, Pressable, SafeAreaView, TextInput } from 'react-native'
import Estilo from '../../assets/style/register'
import { Link } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function pag4() {
    const router = useRouter();
    const [text, onChangeText] = React.useState('');
    const [number, onChangeNumber] = React.useState('');
    const [fontsLoaded] = useFonts({
        'MinhaFonte-Regular': require('../../assets/fonts/superOcean.ttf'),
        'Fonte-texto': require('../../assets/fonts/TitilliumWeb-Regular.ttf'),
        'Poppins_Regular': require('../../assets/fonts/poppins/Poppins-Regular.ttf'),
        'Poppins_Bold': require('../../assets/fonts/poppins/Poppins-Bold.ttf')
    });

    // Oculta a tela de splash quando as fontes são carregadas
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null; // Ou pode colocar um indicador de carregamento aqui.
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={Estilo.container}>
                <ImageBackground
                    source={require('@/assets/images/forma01.png')}
                    style={Estilo.forma001}
                    resizeMode="contain"  // Use contain para garantir que a imagem não seja distorcida
                />
            </View>

            <View style={Estilo.title}>
                <Text style={Estilo.txt}>Bem vindo</Text>

                <Text style={{ fontFamily: "Fonte-texto", color: "#1261D7", textAlign: "center", fontWeight: 'bold' }}>
                    Libere todo o potencial da sua<br />
                    aprendizagem! Seu estudo personalizado<br />
                    está pronto. Faça login para uma experiência<br />
                    adaptada às suas necessidades e alcance<br />
                    resultados incríveis.
                </Text>

                <View style={Estilo.containerRegis}>
                    <TextInput
                        style={Estilo.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Nome Completo"
                        keyboardType="default"
                    />

                    <TextInput
                        style={Estilo.input}
                        onChangeText={onChangeText}
                        value={number}
                        placeholder="CPF"
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={Estilo.input}
                        onChangeText={onChangeText}
                        value={number}
                        placeholder="Endereço"
                        keyboardType="default"
                    />

                    <TextInput
                        style={Estilo.input}
                        onChangeText={onChangeText}
                        value={number}
                        placeholder="Email"
                        keyboardType="email-address"
                    />

                    <TextInput
                        style={Estilo.input}
                        onChangeText={onChangeText}
                        value={number}
                        placeholder="Data"
                        keyboardType="default"
                    />

                    <TextInput
                        style={Estilo.input}
                        onChangeText={onChangeText}
                        value={number}
                        placeholder="Senha"
                        secureTextEntry
                        keyboardType="default"
                    />
                    <View >

                    </View>
                    <Pressable style={{ width: '75%', paddingTop: 10 }}>
                        <Link href={'/'}>
                            <View style={Estilo.enter}>
                                <Text style={{ fontFamily: "Poppins_Bold", color: "#fff", fontSize: 20 }}>Cadastrar</Text>
                            </View>
                        </Link>
                    </Pressable>
                </View>
                <View style={Estilo.containerLogin}>
                    <Text style={Estilo.textLogin}>Já possui uma conta?</Text>
                    <Pressable onPress={() => router.push('./main/login')} >
                        <Text style={[Estilo.textLogin, { borderBottomWidth: 2, borderColor: '#1261D7' }]}>Entrar</Text>
                    </Pressable>
                </View>


            </View>

            <View style={Estilo.container002}>
                <ImageBackground
                    source={require('@/assets/images/forma02.png')}
                    style={Estilo.forma002}
                    resizeMode="contain"
                />
            </View>


        </SafeAreaView>
    )
}
