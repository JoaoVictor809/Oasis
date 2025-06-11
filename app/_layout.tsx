import { Stack } from "expo-router";
import { SplashScreen } from "expo-splash-screen";
import { useEffect, useState } from "react";
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync(); // Ensure splash screen stays visible

        // Prepare assets to load
        const fontAssets = Font.loadAsync({
          'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'Poppins-Regular': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
          'Poppins-Bold': require('../assets/fonts/poppins/Poppins-Bold.ttf'),
          // Add other critical fonts here if identified
        });

        const imageAssets = Asset.loadAsync([
          require('../assets/images/forma001.png'),
          require('../assets/images/titulo.png'),
          require('../assets/images/forma002.png'),
          require('../assets/images/botao001.png'),
          // Add other critical images here
        ]);

        // Load all assets concurrently
        await Promise.all([fontAssets, imageAssets]);

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync(); // Hide splash screen
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!appIsReady) {
    return null; // Render nothing while app is not ready (splash screen is visible)
  }

  return (
    <Stack screenOptions={{ headerShown: false, title: " " }}>
      <Stack.Screen
        name='index'
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}
