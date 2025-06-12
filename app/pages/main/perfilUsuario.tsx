import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Pressable } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import ActivityCalendar from '../../../components/ActivityCalendar';
import DayActivityDetails, { DetailedActivity } from '../../../components/DayActivityDetails'; // Added import

SplashScreen.preventAutoHideAsync();

const UserDashboard = () => {
  const [fontsLoaded] = useFonts({
    "Poppins_Regular": require("../../../assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins_Bold": require("../../../assets/fonts/poppins/Poppins-Bold.ttf"),
    "Poppins_SemiBold": require("../../../assets/fonts/poppins/Poppins-SemiBold.ttf"), // Assuming this font is available for DayActivityDetails
  });

  // States for activity calendar
  const [activityData, setActivityData] = useState({});
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(true);
  const [calendarError, setCalendarError] = useState<string | null>(null);
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

  // States for day activity details
  const [selectedDateForDetails, setSelectedDateForDetails] = useState<string | null>(null);
  const [dayActivityDetails, setDayActivityDetails] = useState<DetailedActivity[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const fetchPracticeData = async (userId: string, month: string) => {
    setIsLoadingCalendar(true);
    setCalendarError(null);
    try {
      console.log(`Fetching data for userId: ${userId}, month: ${month}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockApiResponse = [
        { date: `${month}-10`, activities: ["lição"], summary: "Lição de Matemática" },
        { date: `${month}-15`, activities: ["vídeo", "exercício"], summary: "Vídeo de História e Exercícios" },
        { date: `${month}-22`, activities: ["lição", "exercício"], summary: "Lição de Física e Exercícios" },
      ];
      const filteredData = mockApiResponse.filter(item => item.date.startsWith(month));
      const formattedData = filteredData.reduce((acc, item) => {
        acc[item.date] = {
          customStyles: {
            container: { backgroundColor: '#1261D7', borderRadius: 5, padding: 2 },
            text: { color: 'white', fontSize: 10, fontWeight: 'bold' },
          },
        };
        return acc;
      }, {});
      setActivityData(formattedData);
    } catch (error) {
      console.error("Failed to fetch practice data:", error);
      setCalendarError("Não foi possível carregar os dados de frequência.");
      setActivityData({});
    } finally {
      setIsLoadingCalendar(false);
    }
  };

  const fetchDayActivityDetails = async (userId: string, date: string) => {
    if (!date) return;
    setIsLoadingDetails(true);
    setDetailsError(null);
    setDayActivityDetails([]);

    try {
      // Simulate error for a specific date
      if (date === "ERROR_DATE") {
        console.error("Simulated error: Fetching details for ERROR_DATE");
        setDetailsError("Não foi possível carregar os detalhes das atividades.");
        setDayActivityDetails([]); // Ensure details are cleared
        setIsLoadingDetails(false); // Ensure loading is stopped
        return; // Exit the function
      }

      console.log(`Fetching details for userId: ${userId}, date: ${date}`);
      await new Promise(resolve => setTimeout(resolve, 700));
      let mockDetailedResponse: DetailedActivity[] = [];
      if (date === new Date().toISOString().slice(0, 10) || date.endsWith('-10') || date.endsWith('-15') || date.endsWith('-22')) {
        mockDetailedResponse = [
          { id: 'detail1', type: 'lição', title: `Lição de Exemplo para ${date}`, status: 'Concluída', courseName: 'Curso de React Native', description: 'Revisar os conceitos básicos de componentes.' },
          { id: 'detail2', type: 'vídeo', title: 'Vídeo sobre Hooks', durationMinutes: 25, description: 'Como usar useState e useEffect efetivamente.' },
          { id: 'detail3', type: 'exercício', title: 'Exercícios de Lógica em JS', score: 8, totalScore: 10, status: 'Finalizado', courseName: 'JavaScript Avançado' },
        ];
      } else if (date.endsWith('-05')) {
          mockDetailedResponse = [];
      } else {
          mockDetailedResponse = [
              { id: 'detail_other', type: 'leitura', title: `Artigo sobre Performance em ${date}`, status: 'Lido', description: 'Um artigo interessante sobre otimizações.'}
          ];
      }
      setDayActivityDetails(mockDetailedResponse);
    } catch (error) {
      console.error("Failed to fetch day activity details:", error);
      setDetailsError("Não foi possível carregar os detalhes das atividades.");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  useEffect(() => {
    const userId = "123";
    if (fontsLoaded) {
        fetchPracticeData(userId, currentCalendarMonth);
    }
  }, [currentCalendarMonth, fontsLoaded]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#1261D7" style={styles.loading} />;
  }

  const screenWidth = Dimensions.get("window").width;
  const chartData = { // Renamed from 'data' to avoid conflict if 'data' is used elsewhere
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [{ data: [2, 3, 5, 1, 4, 2, 6] }],
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          <Link href={'../'}>
            <Image style={styles.backIcon} source={require('@/assets/images/Back.png')} />
          </Link>
        </Pressable>
        <Text style={styles.headerTitle}>Página Inicial</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <Image source={{ uri: "" }} style={styles.profilePic} />
          <Text style={styles.userName}>Olá, Estudante!</Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Progresso</Text>
          <ProgressBar progress={0.6} color="#1261D7" style={styles.progressBar} />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Tempo de Estudo (Horas)</Text>
          <BarChart
            data={chartData}
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metas da Semana</Text>
          <Text style={styles.sectionText}>- Revisar 3 capítulos de Matemática</Text>
          <Text style={styles.sectionText}>- Resolver 10 questões de Física</Text>
          <Text style={styles.sectionText}>- Fazer 2 redações</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minha Frequência</Text>
          {isLoadingCalendar && <ActivityIndicator size="small" color="#1261D7" style={{ marginVertical: 10 }} />}
          {calendarError && <Text style={styles.errorText}>{calendarError}</Text>}
          {!isLoadingCalendar && !calendarError && (
            <ActivityCalendar
              initialMonth={currentCalendarMonth}
              markedDates={activityData}
              onDayPress={(dayString) => {
                setSelectedDateForDetails(dayString);
                const userId = "123";
                fetchDayActivityDetails(userId, dayString);
              }}
              onMonthChange={(newMonth) => {
                setCurrentCalendarMonth(newMonth);
                setSelectedDateForDetails(null); // Clear details when month changes
                setDayActivityDetails([]);
              }}
            />
          )}
        </View>

        {/* Seção de Detalhes da Atividade Diária */}
        {selectedDateForDetails && (
          <View style={styles.detailsSectionContainer}>
            {isLoadingDetails && <ActivityIndicator size="small" color="#1261D7" style={{ marginVertical: 20 }} />}
            {detailsError && <Text style={styles.errorText}>{detailsError}</Text>}
            {!isLoadingDetails && !detailsError && (
              <DayActivityDetails
                selectedDate={selectedDateForDetails}
                activities={dayActivityDetails}
              />
            )}
          </View>
        )}

        <TouchableOpacity style={styles.button}>
          <Ionicons name="person-circle-outline" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="document-text-outline" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Ver Relatórios</Text>
        </TouchableOpacity>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  scrollContent: { paddingBottom: 20 },
  header: {
    flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#1261D7", borderBottomLeftRadius: 20,borderBottomRightRadius: 20},
  backIcon: { width: 30, height: 30 },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 20, color: "#FFF", fontFamily: "Poppins_Bold" },
  profileSection: { alignItems: "center", marginVertical: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50 },
  userName: { fontSize: 22, fontFamily: "Poppins_Bold", marginTop: 10, textAlign: "center" },
  statsCard: { padding: 20, borderRadius: 20, marginBottom: 20, alignItems: "center" },
  progressBar: { height: 8, borderRadius: 5, marginVertical: 10, width: "100%" },
  chartContainer: { backgroundColor: "#FFF", padding: 20, borderRadius: 20, marginBottom: 20 },
  chartTitle: { fontSize: 16, textAlign: "center", marginBottom: 10, color: "#1261D7", fontFamily: "Poppins_Bold" },
  section: { backgroundColor: "#FFF", padding: 20, borderRadius: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 18, textAlign: "center", color: "#1261D7", fontFamily: "Poppins_Bold" },
  sectionText: { color: "#1261D7", fontFamily: "Poppins_Regular", fontSize: 16, textAlign: "center" },
  button: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#1261D7", padding: 15, borderRadius: 20, marginBottom: 10 },
  buttonText: { color: "#fff", fontSize: 16, marginLeft: 10, fontFamily: "Poppins_Bold" },
  detailsSectionContainer: { // New Style
    marginTop: 10,
  },
  errorText: { // New Style (or use existing if suitable)
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
    fontFamily: 'Poppins_Regular', // Assuming Poppins_Regular is loaded
  },
});

export default UserDashboard;
