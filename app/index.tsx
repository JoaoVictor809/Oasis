import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/pages/main/pagesRoot/studyPlanEnem');
  }, [router]); // Added router to dependency array as per ESLint exhaustive-deps common practice

  // Return a minimal view or null, as the redirect happens quickly.
  // Expo Router might require a component to be returned.
  return <View />;
}
