import { View, Text, Pressable, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import ColorList from "../../../components/ColorList";
import StyleOfIndex from "../../../assets/style/home";

SplashScreen.preventAutoHideAsync();

export default function Index() {
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
      return null;
  }


    const router = useRouter();

    const renderButtons = () => (
        <View style={StyleOfIndex.infoTestBottons}>
            {[...Array(4)].map((_, index) => (
                <Pressable 
                    key={index} 
                    style={StyleOfIndex.button} 
                    onPress={() => router.push("/pages/main/pagesRoot/vestibularPage")}
                >
                    <Image 
                        source={require("@/assets/images/logotipo-provas/enem.svg")} 
                        style={StyleOfIndex.buttonImage} 
                    />
                </Pressable>
            ))}
        </View>
    );

    return (
        <ScrollView style={StyleOfIndex.background} contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={StyleOfIndex.container}>
                <Text style={StyleOfIndex.mainTitle}>Vestibulares</Text>
                <Text style={StyleOfIndex.subtitle}>Os vestibulares mais concorridos</Text>
                {renderButtons()}

                <Text style={StyleOfIndex.mainTitle}>Seus cursos</Text>
                <Text style={StyleOfIndex.subtitle}>Clique para ver todos os cursos</Text>
                <View style={StyleOfIndex.imageHyperLink}>
                    <Image 
                        source={require("@/assets/images/logotipo-provas/image3.png")} 
                        style={StyleOfIndex.image} 
                    />
                </View>

                <Text style={StyleOfIndex.mainTitle}>Cursos</Text>
                <Text style={StyleOfIndex.subtitle}>Os vestibulares mais concorridos</Text>
                {renderButtons()}

                <Text style={StyleOfIndex.subtitlePrincipal}>Os concursos mais concorridos</Text>
                {renderButtons()}
            </View>
        </ScrollView>
    );
}
