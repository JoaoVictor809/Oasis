<<<<<<< HEAD
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import React from 'react'
import { useFonts } from "expo-font";
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ScreenContainer } from 'react-native-screens';

export default function unicampList(){
    const [fontsLoaded] = useFonts({
            'Poppins_Regular': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
            'Poppins_Bold': require('../assets/fonts/poppins/Poppins-Bold.ttf')
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
        <View>
            <Text style={styles.title}>Unicamp</Text>
            <ScrollView horizontal={true} style={styles.container} showsHorizontalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicamp2023.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
            </ScrollView>
        </View>
    )
}

const  styles = StyleSheet.create({
    title:{
        fontSize: 24,
        fontFamily: 'Poppins_Bold',
        color: '#000',
        paddingLeft:20
    },
    container:{
        padding:8,
        margin: 10,
    },
    imageContainer: {
        marginRight: 16, 
    },
=======
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import React from 'react'
import { useFonts } from "expo-font";
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ScreenContainer } from 'react-native-screens';

export default function unicampList(){
    const [fontsLoaded] = useFonts({
            'Poppins_Regular': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
            'Poppins_Bold': require('../assets/fonts/poppins/Poppins-Bold.ttf')
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
        <View>
            <Text style={styles.title}>Unicamp</Text>
            <ScrollView horizontal={true} style={styles.container} showsHorizontalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicamp2023.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
            </ScrollView>
        </View>
    )
}

const  styles = StyleSheet.create({
    title:{
        fontSize: 24,
        fontFamily: 'Poppins_Bold',
        color: '#000',
        paddingLeft:20
    },
    container:{
        padding:8,
        margin: 10,
    },
    imageContainer: {
        marginRight: 16, 
    },
>>>>>>> aa6aa583bf99ca074b8092dbb29ee8385c4cb579
})