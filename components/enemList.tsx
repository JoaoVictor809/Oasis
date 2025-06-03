import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native' // Removed Linking
import React from 'react'
import { useFonts } from "expo-font";
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ScreenContainer } from 'react-native-screens';
import { useRouter } from 'expo-router'; // Import useRouter

export default function enemList(){
    const router = useRouter(); // Get router object
    const [enemData, setEnemData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Added error state
    const [fontsLoaded] = useFonts({
            'Poppins_Regular': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
            'Poppins_Bold': require('../assets/fonts/poppins/Poppins-Bold.ttf')
        });

        useEffect(() => {
            async function fetchData() {
                setIsLoading(true);
                try {
                    const response = await fetch('https://api.enem.dev/v1/provas');
                    const data = await response.json();
                    setEnemData(data);
                    console.log("ENEM Data:", data); // Log fetched data
                    setError(null); // Clear any previous errors
                } catch (err) {
                    console.error("Erro ao buscar dados do ENEM:", err);
                    setError("Falha ao carregar os dados do ENEM. Tente novamente mais tarde.");
                } finally {
                    setIsLoading(false);
                }
            }
            fetchData();
        }, []);

        useEffect(() => {
            if (fontsLoaded) {
                SplashScreen.hideAsync();
            }
        }, [fontsLoaded]);

        if (!fontsLoaded) {
            return null; // Font loading check
        }

        if (isLoading) {
            return ( // Loading indicator
                <View style={styles.centeredMessage}>
                    <Text>Carregando provas...</Text>
                </View>
            );
        }

        if (error) {
            return ( // Error message display
                <View style={styles.centeredMessage}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            );
        }

    return(
        <View>
            <Text style={styles.title}>Enem</Text>
            {enemData.length > 0 ? (
                <ScrollView horizontal={true} style={styles.container} showsHorizontalScrollIndicator={false}>
                    {enemData.map((exam: any) => (
                        <TouchableOpacity
                            key={exam.nu_ano}
                            style={styles.examItem}
                            onPress={() => router.push({ pathname: '/pages/main/examQuestions', params: { year: exam.nu_ano } })}
                        >
                            <Text style={styles.examText}>Ano: {exam.nu_ano}</Text>
                            <Text style={styles.actionText}>Ver Questões</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.centeredMessage}>
                    <Text>Nenhuma prova encontrada.</Text>
                </View>
            )}
        </View>
    )
}

const  styles = StyleSheet.create({
    examItem: { // Added style for each exam item
        padding: 10,
        marginRight: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: { // Style for error messages
        fontSize: 16,
        color: 'red',
        fontFamily: 'Poppins_Regular',
        textAlign: 'center',
        padding: 20,
    },
    centeredMessage: { // Style for centering loading/error/no data messages
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    examText: { // Added style for exam text
        fontSize: 16,
        fontFamily: 'Poppins_Regular',
        marginBottom: 5, // Added margin to separate from the link text
    },
    actionText: { // Renamed from examLinkText and style updated
        fontSize: 14,
        fontFamily: 'Poppins_Bold', // Make it bold
        color: '#007bff', // A different blue
    },
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
    // imageContainer can be removed if no longer used, or repurposed.
    // For now, I'll leave it commented out in case it's needed for other elements.
    /* imageContainer: {
        marginRight: 16,
    }, */
})
