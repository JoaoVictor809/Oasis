import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Pressable, TextInput, Switch, Alert } from "react-native"; // Adicionado Alert
import { BarChart } from "react-native-chart-kit";
import { ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link } from "expo-router";

SplashScreen.preventAutoHideAsync();

const UserDashboard = () => {
  // Estados para os campos de configuração
  const [username, setUsername] = useState("");
  const [notifyNewCourses, setNotifyNewCourses] = useState(false);
  const [notifyProgressUpdates, setNotifyProgressUpdates] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [fontsLoaded] = useFonts({
    "Poppins_Regular": require("../../../assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins_Bold": require("../../../assets/fonts/poppins/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Funções de manipulação
  const handleSaveUsername = () => {
    console.log("Novo nome de usuário:", username);
    Alert.alert("Sucesso", "Nome de usuário salvo!");
  };

  const handleSaveNotifications = () => {
    console.log("Receber notificações de novos cursos:", notifyNewCourses);
    console.log("Receber atualizações de progresso:", notifyProgressUpdates);
    Alert.alert("Sucesso", "Preferências de notificação salvas!");
  };

  const handleUpdatePassword = () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Erro", "As novas senhas não coincidem.");
      return;
    }
    console.log("Senha Atual:", currentPassword);
    console.log("Nova Senha:", newPassword);
    Alert.alert("Sucesso", "Senha alterada!");
    // Em um cenário real, você também validaria a currentPassword aqui
    // e provavelmente limparia os campos de senha após o sucesso.
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };


  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#1261D7" style={styles.loading} />;
  }

  const screenWidth = Dimensions.get("window").width;
  const data = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [{ data: [2, 3, 5, 1, 4, 2, 6] }],
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Pressable>
          <Link href={'../'}>
            <Image style={styles.backIcon} source={require('@/assets/images/Back.png')} />
          </Link>
        </Pressable>
        <Text style={styles.headerTitle}>Página Inicial</Text>
      </View>

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <Image source={{ uri: "" }} style={styles.profilePic} />
          <Text style={styles.userName}>Olá, Estudante!</Text>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Progresso</Text>
          <ProgressBar progress={0.6} color="#1261D7" style={styles.progressBar} />
        </View>

        {/* Gráfico */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Tempo de Estudo (Horas)</Text>
          <BarChart
            data={data}
            width={screenWidth * 0.9}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundGradientFrom: "#1261D7",
              backgroundGradientTo: "#1261D7",
              decimalPlaces: 0,
              barRadius: 10,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: () => "#FFF",
            }}
            style={{ borderRadius: 20 }}
          />
        </View>

        {/* Metas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metas da Semana</Text>
          <Text style={styles.sectionText}>- Revisar 3 capítulos de Matemática</Text>
          <Text style={styles.sectionText}>- Resolver 10 questões de Física</Text>
          <Text style={styles.sectionText}>- Fazer 2 redações</Text>
        </View>

        {/* Seção Alterar Nome de Usuário */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Alterar Nome de Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="Novo nome de usuário"
            placeholderTextColor="#AAA"
            value={username}
            onChangeText={setUsername}
          />
          <TouchableOpacity style={styles.settingsButton} onPress={handleSaveUsername}>
            <Text style={styles.settingsButtonText}>Salvar Nome</Text>
          </TouchableOpacity>
        </View>

        {/* Seção Preferências de Notificação */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Preferências de Notificação</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Receber notificações de novos cursos</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notifyNewCourses ? "#f5dd4b" : "#f4f3f4"} // Exemplo de cor para thumb
              ios_backgroundColor="#3e3e3e" // Exemplo para iOS
              onValueChange={setNotifyNewCourses}
              value={notifyNewCourses}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Receber atualizações de progresso</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notifyProgressUpdates ? "#f5dd4b" : "#f4f3f4"} // Exemplo de cor para thumb
              ios_backgroundColor="#3e3e3e" // Exemplo para iOS
              onValueChange={setNotifyProgressUpdates}
              value={notifyProgressUpdates}
            />
          </View>
          <TouchableOpacity style={styles.settingsButton} onPress={handleSaveNotifications}>
            <Text style={styles.settingsButtonText}>Salvar Preferências</Text>
          </TouchableOpacity>
        </View>

        {/* Seção Alterar Senha */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Alterar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha Atual"
            placeholderTextColor="#AAA"
            secureTextEntry={true}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Nova Senha"
            placeholderTextColor="#AAA"
            secureTextEntry={true}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Nova Senha"
            placeholderTextColor="#AAA"
            secureTextEntry={true}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />
          <TouchableOpacity style={styles.settingsButton} onPress={handleUpdatePassword}>
            <Text style={styles.settingsButtonText}>Alterar Senha</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  scrollContent: { paddingBottom: 20, paddingHorizontal: 16 },
  header: {
    flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#1261D7", borderBottomLeftRadius: 20,borderBottomRightRadius: 20},
  backIcon: { width: 30, height: 30 },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 20, color: "#FFF", fontFamily: "Poppins_Bold" },
  profileSection: { alignItems: "center", marginVertical: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#DDD' },
  userName: { fontSize: 22, fontFamily: "Poppins_Bold", marginTop: 10, textAlign: "center" },
  statsCard: { padding: 20, borderRadius: 20, marginBottom: 20, alignItems: "center", backgroundColor: "#FFF" },
  progressBar: { height: 8, borderRadius: 5, marginVertical: 10, width: "100%" },
  chartContainer: { backgroundColor: "#FFF", padding: 20, borderRadius: 20, marginBottom: 20 },
  chartTitle: { fontSize: 16, textAlign: "center", marginBottom: 10, color: "#1261D7", fontFamily: "Poppins_Bold" },
  section: { backgroundColor: "#FFF", padding: 20, borderRadius: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 18, textAlign: "center", color: "#1261D7", fontFamily: "Poppins_Bold", marginBottom: 10 },
  sectionText: { color: "#1261D7", fontFamily: "Poppins_Regular", fontSize: 16, textAlign: "center" },
  settingsSection: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  settingsSectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_Bold",
    color: "#1261D7",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: "Poppins_Regular",
  },
  settingsButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1261D7",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop:10,
  },
  settingsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_Bold",
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  switchLabel: {
    fontSize: 16,
    fontFamily: "Poppins_Regular",
    color: "#333",
  },
});

export default UserDashboard;
