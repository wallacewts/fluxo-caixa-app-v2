import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import { NavigationContext } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { AuthContext } from "../hooks/useIsSignedIn";

export const AddDespesaScreen = () => {
  const imgBg = require("../assets/fundo.jpg");
  const [value, setValue] = useState("");

  const handleRetirar = () => {
    firestore()
      .collection("historicos")
      .doc(firebase.auth().currentUser?.uid)
      .collection("historico")
      .add({
        type: "despesa",
        value,
      })
      .then(() => {
        alert("Despesa adicionada!");
        setValue("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ImageBackground source={imgBg} style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.text}>Quanto você quer retirar?</Text>

        <TextInput
          value={value}
          onChangeText={(value) => {
            setValue(value);
          }}
          style={styles.input}
          keyboardType="numeric"
          autoFocus
        />
        <TouchableHighlight
          underlayColor="#CCCCCC"
          style={styles.button}
          onPress={() => handleRetirar()}
        >
          <Text style={styles.btnText}>Retirar</Text>
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
