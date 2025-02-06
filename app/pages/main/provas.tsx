import {View, Text, TextInput, Pressable, Image} from "react-native"
import React from "react"
import Estilo from '../../../assets/style/provas'
import { Link } from "expo-router";

export default function prova(){
    const [text, onChangeText] = React.useState('');
    return(
        <View style={Estilo.main}>
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