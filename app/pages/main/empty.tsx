import React from "react";
import { Stack, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";  // Importa o hook
import styles from '../../../assets/style/emptyc';

const EmptyCourses: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>
        Você ainda não{'\n'}adicionou{'\n'}nenhum curso!
      </Text>
      <Image
        source={require('../../../assets/images/estudante.svg')} // Lembre-se: SVG não é suportado nativamente
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('./cursos')}  // Navega para a tela "Cursos"
      >
        <Text style={styles.buttonText}>Ver Cursos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyCourses;
