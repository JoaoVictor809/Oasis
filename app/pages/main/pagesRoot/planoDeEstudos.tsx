import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const courseData = [
  { id: "1", title: "Introdução ao HTML", time: "10:00 AM", progress: 20 },
  { id: "2", title: "Tags e Estrutura", time: "11:30 AM", progress: 40 },
  { id: "3", title: "Atributos e Estilos", time: "02:00 PM", progress: 60 },
  { id: "4", title: "Listas e Tabelas", time: "04:00 PM", progress: 80 },
  { id: "5", title: "Formulários e Inputs", time: "06:00 PM", progress: 100 },
];

export default function HTMLCourseScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>27 Jun 2020</Text>
        <Ionicons name="search" size={24} color="black" />
      </View>
      <Text style={styles.title}>Módulo HTML - 5 Dias</Text>
      <FlatList
        data={courseData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardTime}>{item.time}</Text>
            <Text style={styles.cardProgress}>Progresso: {item.progress}%</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  date: { fontSize: 18, fontWeight: "bold" },
  title: { fontSize: 22, fontWeight: "bold", marginVertical: 10 },
  card: { backgroundColor: "white", padding: 15, borderRadius: 10, marginVertical: 5 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardTime: { fontSize: 14, color: "gray" },
  cardProgress: { fontSize: 14, color: "blue" },
  fab: { position: "absolute", bottom: 20, right: 20, backgroundColor: "green", padding: 15, borderRadius: 50, alignItems: "center" },
});