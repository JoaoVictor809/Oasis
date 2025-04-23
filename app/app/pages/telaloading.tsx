import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, Path, Defs, ClipPath } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedProps, withRepeat, withTiming, Easing } from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const WaveCircularProgress = ({ progress = 50 }) => {
  const waveHeight = useSharedValue(10); // Amplitude da onda
  const waveOffset = useSharedValue(0); // Deslocamento horizontal da onda

  useEffect(() => {
    // Animação contínua para mover a onda horizontalmente
    waveOffset.value = withRepeat(
      withTiming(260, { duration: 3000, easing: Easing.linear }), 
      -1, // Repetição infinita
      false // Alterna entre ida e volta para suavizar
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const height = 100 - progress; // Controla o nível da onda
    const frequency = 10; // Define quantas ondas aparecem
    const amplitude = waveHeight.value; // Define a altura das ondas
    const offset = waveOffset.value; // Move a onda horizontalmente

    let wavePath = `M0,${height} `;

    for (let x = 0; x <= 120; x += 5) {
      const y = height + amplitude * Math.sin((x + offset) * (Math.PI / 50)); 
      wavePath += `L${x},${y} `;
    }

    wavePath += `V100 H0 Z`;

    return { d: wavePath };
  });

  return (
    <View style={styles.container}>
      <Svg width={120} height={120} viewBox="0 0 120 100">
        <Defs>
          <ClipPath id="clip">
            <Circle cx="60" cy="50" r="40" />
          </ClipPath>
        </Defs>

        {/* Fundo do círculo */}
        <Circle cx="60" cy="50" r="40" stroke="#ddd" strokeWidth="5" fill="none" />

        {/* Onda animada */}
        <AnimatedPath animatedProps={animatedProps} fill="white" clipPath="url(#clip)" />

        {/* Borda do círculo */}
        <Circle cx="60" cy="50" r="40" stroke="white" strokeWidth="5" fill="none" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#1261D7",
  },
});

export default WaveCircularProgress;
