import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import CustomBackground from '@/components/CustomBackground'; 
import MenuDrop from '../../../../components/menuDrop'

SplashScreen.preventAutoHideAsync();

const App = () => {
  // refs e snapPoints
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '50%', '80%'], []);

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

  return (
    <GestureHandlerRootView style={styles.container}>
      <Button title="Abrir" onPress={hqandleOpenPress} />
        <MenuDrop />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundComponent={(props) => <CustomBackground {...props} />}
        style={styles.bottomSheet} 
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Informações</Text>
            <Pressable onPress={hqandleClosePress} >
                <Image source={require('@/assets/images/icons/close.png')}/>
            </Pressable>
          </View>
          
          <Button title="gerar" onPress={() => {}} />
          <Button title="fechar" />
        </BottomSheetView>
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
  title: {
    fontSize: 30,
    fontFamily: 'Poppins_Bold',
    color:'#fff'
  },
  bottomSheet: {
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40, 
    overflow: 'hidden', 
  },
  containerTitle:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:'100%'
  }
});

export default App;
