import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from '../../../assets/style/emptyc';  // Importando o arquivo de estilo
 
const EmptyCourses: React.FC = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>
        Você ainda não{'\n'}adicionou{'\n'}nenhum curso!
      </Text>
      <Image
        source={require('../../../assets/images/estudante.png')}  // Caminho da imagem local
        style={styles.image}
      />
      <TouchableOpacity style={styles.button} onPress={() => { /* ação ao pressionar o botão */ }}>
        <Text style={styles.buttonText}>Ver Cursos</Text>
      </TouchableOpacity>
     
    </View>
  );
};
 
export default EmptyCourses;