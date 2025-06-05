import { View, Text, StyleSheet, ImageBackground } from "react-native";

export const SplashScreen = () => {
  const imgBg = require("../assets/fundo.jpg");

  return (
    <ImageBackground source={imgBg} style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.title}>Fluxo de Caixa</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: null,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    backgroundColor: "transparent",
  },
});
