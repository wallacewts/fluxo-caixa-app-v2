import firestore from "@react-native-firebase/firestore";
import { NavigationContext } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

export const AddReceitaScreen = () => {
  const imgBg = require("../assets/fundo.jpg");

  return (
    <ImageBackground source={imgBg} style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.text}>Quanto você quer adicionar?</Text>

        <TextInput style={styles.input} keyboardType="numeric" autoFocus />
        <TouchableHighlight underlayColor="#CCCCCC" style={styles.button}>
          <Text style={styles.btnText}>Adicionar</Text>
        </TouchableHighlight>
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
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#DDDDDD",
    marginTop: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#bfb300",
    margin: 10,
    height: 40,
    width: 200,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
  btnText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});
