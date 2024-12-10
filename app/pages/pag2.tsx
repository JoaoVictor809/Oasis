import { Text, View, SafeAreaView, ImageBackground,Image, Pressable } from "react-native";
import { Link } from "expo-router";
import Estilo from '../../assets/style/pag2'


export default function pag2(){
    return(
        
        <View>
            <ImageBackground>
            <View style={Estilo.fundo001}>
            <ImageBackground source={require('../../assets/images/forma004.png')}/>
            </View>

            <View style={Estilo.fundo002}>
            <ImageBackground style={Estilo.forma002} source={require('../../assets/images/forma003.png')}/>
            </View>
            </ImageBackground>
            
            <View style={Estilo.containerMain}>
                <Image source={require('../../assets/images/pratico.png')}/>
                <Text style={{fontFamily:'Super_Ocean'}}>teste</Text>
            </View>
            
        </View>
    )
}