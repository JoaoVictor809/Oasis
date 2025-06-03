import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native'; // Added Image
import { useLocalSearchParams } from 'expo-router';

// Define types for better type safety based on API structure
interface Alternative {
  id: string;
  letter: string;
  text: string;
}

interface Question {
  id: string;
  title: string; // e.g., "Questão 1 - ENEM 2020"
  context: string; // Main question statement/content
  alternatives: Alternative[];
  correctAlternative: string; // e.g., "A"
  files?: string[]; // Optional array of image URLs for the question
  // index: number; // also available if needed for keyExtractor
}

export default function ExamQuestionsScreen() {
  const { year } = useLocalSearchParams<{ year: string }>();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async (examYear: string) => {
      setIsLoading(true);
      setError(null);
      // TODO: Implement full pagination (total_pages from response)
      const apiUrl = `https://api.enem.dev/v1/exams/${examYear}/questions?limit=10&offset=0`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) { // Check for 2xx status codes
          const data = await response.json();
          setQuestions(data.questions || []); // Assuming API returns { questions: [...] }
        } else {
          setError(`Falha ao buscar questões. Código: ${response.status}`);
        }
      } catch (err) {
        console.error("Network error:", err);
        setError("Erro de rede ao buscar questões. Verifique sua conexão.");
      } finally {
        setIsLoading(false);
      }
    };

    if (year && typeof year === 'string') {
      fetchQuestions(year);
    } else {
      setError("Ano do exame não especificado ou inválido.");
      setIsLoading(false);
    }
  }, [year]);

  // Log states for verification (optional, can be removed if console is too noisy)
  useEffect(() => {
    console.log("ExamQuestionsScreen isLoading:", isLoading);
    console.log("ExamQuestionsScreen error:", error);
    // console.log("ExamQuestionsScreen questions:", questions); // Can be very verbose
  }, [isLoading, error, questions]);

  const renderQuestionItem = ({ item }: { item: Question }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionTitle}>{item.title}</Text>
      {/* Display Question Images */}
      {item.files && item.files.length > 0 && (
        <View style={styles.imagesContainer}>
          {item.files.map((fileUrl, index) => (
            <Image key={index} source={{ uri: fileUrl }} style={styles.questionImage} resizeMode="contain" />
          ))}
        </View>
      )}
      <Text style={styles.questionContext}>{item.context}</Text>
      {item.alternatives.map((alt) => {
        const isCorrect = alt.letter === item.correctAlternative;
        return (
          <Text
            key={alt.id}
            style={[
              styles.alternativeText,
              isCorrect && styles.correctAlternativeHighlight
            ]}
          >
            {alt.letter}) {alt.text}
          </Text>
        );
      })}
      <Text style={styles.correctAnswerInfo}>
        {/* Kept for clarity, but could be removed if highlighting is deemed sufficient */}
        Gabarito: {item.correctAlternative}
      </Text>
    </View>
  );

  let content;
  if (isLoading) {
    content = <ActivityIndicator size="large" color="#0000ff" />;
  } else if (error) {
    content = <Text style={styles.errorText}>{error}</Text>;
  } else if (questions.length === 0) {
    content = <Text style={styles.infoText}>Nenhuma questão encontrada para este ano.</Text>;
  } else {
    content = (
      <FlatList
        data={questions}
        renderItem={renderQuestionItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Exame do ENEM</Text>
      <Text style={styles.yearText}>Ano: {year}</Text>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, // Reduced padding for more content space
    backgroundColor: '#fff',
    // alignItems: 'center', // Removed to allow FlatList to take full width
    // justifyContent: 'center', // Removed for FlatList
  },
  headerTitle: { // Renamed from title to avoid conflict
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Center the main title
    marginBottom: 10, // Reduced margin
    fontFamily: 'Poppins_Bold',
  },
  yearText: {
    fontSize: 18,
    textAlign: 'center', // Center year text
    marginBottom: 10, // Reduced margin
    fontFamily: 'Poppins_Regular',
  },
  list: {
    width: '100%',
  },
  questionContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  imagesContainer: { // Container for images to manage layout
    marginBottom: 10,
  },
  questionImage: {
    width: '100%',
    height: 200, // Adjust as needed, or use AspectRatio
    marginBottom: 10,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins_Bold',
    marginBottom: 5,
  },
  questionContext: {
    fontSize: 14,
    fontFamily: 'Poppins_Regular',
    marginBottom: 10,
    lineHeight: 20, // Improved readability for context
  },
  alternativeText: {
    fontSize: 14,
    fontFamily: 'Poppins_Regular',
    marginLeft: 10,
    marginBottom: 8, // Increased spacing
    padding: 5, // Added padding for touchability later if needed
    borderRadius: 4,
  },
  correctAlternativeHighlight: {
    backgroundColor: '#d4edda', // A light green background
    color: '#155724', // Darker green text
    fontWeight: 'bold',
  },
  correctAnswerInfo: { // Renamed from correctAnswer
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins_Bold',
    marginTop: 10, // Increased spacing
    color: 'green',
    textAlign: 'right', // Align to the right
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins_Regular',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins_Regular',
  },
});
