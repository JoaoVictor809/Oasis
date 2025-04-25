import React from "react";
import { Stack, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";  
import styles from '../../../assets/style/emptyc';
import Icon from 'react-native-vector-icons/FontAwesome6';  

const EmptyCourses: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <Pressable 
      style={{}}>
      <Icon name="xmark" solid size={30} color={'#000'} />

      </Pressable>
      <Text style={styles.title}>
        Você ainda não{'\n'}adicionou{'\n'}nenhum curso!
      </Text>
      <Image
        source={require('../../../assets/images/student.svg')} 
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('./cursos')} 
      >
        <Text style={styles.buttonText}>Ver Cursos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyCourses;
