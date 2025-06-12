import firestore from "@react-native-firebase/firestore";
import { NavigationContext } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

export const HomeScreen = () => {
  const imgBg = require("../assets/fundo.jpg");
  const navigation = useContext(NavigationContext);
  const currencyFormat = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  const [saldoTotal, setSaldoTotal] = useState("0");

  const handleCadastrar = () => navigation?.navigate("Cadastro");
  const handleLogIn = () => navigation?.navigate("Login");

  useEffect(() => {
    firestore()
      .collection("usuarios")
      .onSnapshot({
        next: (snapShot) => {
          const saldoTotal = snapShot.docs.reduce((acc, doc) => {
            return acc + doc.data().saldo;
          }, 0);

          setSaldoTotal(currencyFormat.format(saldoTotal));
        },
      });
  }, []);

  return (
    <ImageBackground source={imgBg} style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.title}>Fluxo de Caixa</Text>

        <View style={styles.buttonArea}>
          <TouchableHighlight
            underlayColor="#CCCCCC"
            style={styles.button}
            onPress={() => handleCadastrar()}
          >
            <Text style={styles.btnText}>Cadastrar</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="#CCCCCC"
            style={styles.button}
            onPress={() => handleLogIn()}
          >
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.numerosArea}>
          <Text>No momento administramos:</Text>
          <Text>{saldoTotal}</Text>
        </View>
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
  buttonArea: {
    marginTop: 30,
  },
  button: {
    backgroundColor: "#bfb300",
    margin: 10,
    height: 40,
    width: 200,
    justifyContent: "center",
  },
  numerosArea: {
    height: 80,
  },
  btnText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});
