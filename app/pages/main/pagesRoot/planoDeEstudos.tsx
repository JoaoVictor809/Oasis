import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; 
import * as Font from "expo-font"; 

const loadFonts = () => {
  return Font.loadAsync({
    "Poppins-Regular": require("../../../../assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../../../assets/fonts/poppins/Poppins-Bold.ttf"),
  });
};

const modulos = [
  {
    id: "1",
    title: "Módulo 1 - HTML",
    data: [
      { id: "1", title: "Introdução ao HTML", icon: "video-camera" },
      { id: "2", title: "Tags e Estrutura", icon: "book" },
      { id: "3", title: "Atributos e Estilos", icon: "book" },
      { id: "4", title: "Listas e Tabelas", icon: "book" },
      { id: "5", title: "Formulários e Inputs", icon: "book" },
      { id: "6", title: "Teste o seu conhecimentos", icon: "pencil" },
    ],
  },
  {
    id: "2",
    title: "Módulo 2 - HTML",
    data: [
      { id: "6", title: "Semântica e Acessibilidade", icon: "video-camera" },
      { id: "7", title: "Elementos de Mídia", icon: "book" },
      { id: "8", title: "SEO e Performance", icon: "book" },
      { id: "9", title: "HTML5 Avançado", icon: "book" },
      { id: "10", title: "Teste o seu conhecimento", icon: "pencil" },
    ],
  },
];

const ModuloList = ({ title, data }) => (
  <View style={styles.moduleContainer}>  
    <Text style={styles.title}>{title}</Text>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const isTestButton = item.icon === "pencil";
        
        return (
          <View style={styles.card}>
            <TouchableOpacity
              style={[
                styles.button,
                isTestButton && styles.testButton,
              ]}
            >
              {item.icon && <Icon name={item.icon} size={18} color={isTestButton ? "#1261D7" : "#FFF"} style={styles.leftIcon} />} 
              <Text
                style={[
                  styles.buttonText,
                  isTestButton && styles.testButtonText,
                ]}
              >
                {item.title}
              </Text>
              {!isTestButton && (
                <Icon name="chevron-right" size={18} color="#FFF" style={styles.icon} />
              )}
            </TouchableOpacity>
          </View>
        );
      }}
      scrollEnabled={false}
    />
  </View>
);

export default function HTMLCourseScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function fetchFonts() {
      await loadFonts();
      setFontsLoaded(true);
    }
    fetchFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text style={styles.loadingText}>Carregando fontes...</Text>;
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {modulos.map((modulo) => (
          <ModuloList key={modulo.id} title={modulo.title} data={modulo.data} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, backgroundColor: "#f5f5f5" }, 
  container: { padding: 20 },

  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    fontFamily: "Poppins-Regular",
  },

  moduleContainer: { 
    backgroundColor: "white", 
    padding: 25,
    paddingVertical: 30, 
    borderRadius: 15, 
    marginBottom: 20, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 5,
  },

  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color: "#1261D7",
    fontFamily: "Poppins-Bold", 
  },
  
  card: { backgroundColor: "white", borderRadius: 10, marginVertical: 5 },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 30,
    backgroundColor:"#1261D7",
    marginTop:20,
  },

  buttonText: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#fff",
    fontFamily: "Poppins-Bold",
  }, 

  icon: { marginLeft: 10, color: "#FFF" },

  leftIcon: { marginRight: 10 },

  testButton: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#1261D7",
  },

  testButtonText: {
    color: "#1261D7",
  },
});