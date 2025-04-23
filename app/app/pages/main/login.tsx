import { View, Text, Image, Pressable, SafeAreaView, ImageBackground, TextInput } from 'react-native'
import Estilo from '../../../assets/style/login'
import { Link } from "expo-router";

import React, { useState, useEffect } from 'react';

import { Stack, useRouter } from "expo-router";



export default function pag4() {
    
    const [text, onChangeText] = React.useState('');
    const [text01, onChangeText01] = React.useState('');
    
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1261D7" }}>
            <View style={Estilo.container}>
                <ImageBackground
                    source={require('../../../assets/images/forma001.png')}
                    style={Estilo.forma001}
                    resizeMode="contain"
                />
            </View>
            <View style={Estilo.title}>
                <View>
                    <Text style={Estilo.txt}>Bem vindo<br />Novamente</Text>
                </View>

                <Text style={{ fontFamily: "Fonte-texto", color: "#fff", textAlign: "center" }}>Seu estudo personalizado está pronto. Faça <br />
                    login para uma experiência de aprendizado <br />
                    adaptada às suas necessidades!</Text>
                <View style={Estilo.containerInput}>
                    
                <TextInput
                    style={Estilo.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Email"
                    keyboardType="email-address" 
                     
                />
                <View style={{gap:5}}>
                    <TextInput
                    style={Estilo.input}
                    onChangeText={onChangeText01}
                    value={text01}
                    placeholder="Senha"
                    keyboardType="default" 
                    secureTextEntry={true} />
                    <Link href={'/'} style={{position:'relative', left:10, fontFamily:'Poppins_Regular'}}>
                        <Text style={{ fontFamily: "Fonte-texto", color: "#fff", }}>Esqueceu a senha</Text>
                    </Link>
                </View>
                <Pressable>
                    <Link href={'/'}>
                        <View style={Estilo.enter}>
                            <Text style={{ fontFamily: "Poppins_Bold", color: "#fff", fontSize: 20 }}>Entrar</Text>
                        </View>
                    </Link>
                    
                </Pressable>

                </View>
                <View style={Estilo.containerRegister}>
                    <Text style={Estilo.textRegister}>Não possui conta ainda?</Text>
                   <Pressable onPress={() => router.push('../register')} >
                   <Text style={[Estilo.textRegister, {borderBottomWidth:2, borderColor:'#fff'}]}>Registrar</Text>
                   </Pressable>
                </View>
                
            </View>
            {/* 
            <View style={Estilo.botao}>
                <Pressable onPress={() => router.push('../register')}>

                    <View style={Estilo.enter}>
                        <Text style={{ fontFamily: "MinhaFonte-Regular", color: "#fff", fontSize: 20, paddingLeft: 10, paddingRight: 10 }}>Cadastrar</Text>
                    </View>

                </Pressable>

            </View>
            */}

            <View style={Estilo.container002}>
                <ImageBackground
                    source={require('../../../assets/images/forma002.png')}
                    style={Estilo.forma002}
                    resizeMode="contain"
                />
            </View>
            

        </SafeAreaView>
    )
}