import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from 'expo-linear-gradient';

SplashScreen.preventAutoHideAsync();

const App = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%","50%", "80%"], [])

  const hqandleOpenPress = () => bottomSheetRef.current?.expand();
  const hqandleClosePress = () => bottomSheetRef.current?.close();

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [fontsLoaded] = useFonts({
    'Poppins_Regular': require('../../../../assets/fonts/poppins/Poppins-Regular.ttf'),
    'Poppins_Bold': require('../../../../assets/fonts/poppins/Poppins-Bold.ttf'),
});

useEffect(() => {
    if (fontsLoaded) {
        SplashScreen.hideAsync();
    }
}, [fontsLoaded]);

if (!fontsLoaded) {
    return null;
}


  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
        <Button title='Abrir' onPress={hqandleOpenPress}/>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <LinearGradient
        style={{flex:1, width:'100%'}}
        colors={[ '#FFFFFF', '#CDDDF6','#1261D7']}>
            <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.tiltle}>Informações</Text>
          <Button title='gerar' onPress={() => {}}/>
          <Button title='fechar' onPress={hqandleClosePress}/>
        </BottomSheetView>
        </LinearGradient>
        
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
tiltle:{
    fontSize:30,
    fontFamily:'Poppins_Bold',

}
});

export default App;