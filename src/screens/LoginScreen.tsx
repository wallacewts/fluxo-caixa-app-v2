import { firebase } from "@react-native-firebase/auth";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { AuthContext } from "../hooks/useIsSignedIn";

export const LoginScreen = () => {
  const imgBg = require("../assets/fundo.jpg");
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInMessage, setSignInMessage] = useState("");
  const { signIn } = useContext(AuthContext);

  const handleSignIn = () => {
    if (email && password) {
      setLoading(true);

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          signIn(data.user);
        })
        .catch((erro) => {
          const erroCode = erro.code as string;
          const erroMapper: Record<string, string> = {
            "auth/invalid-credential": "E-mail e/ou senha incorreto",
            "auth/invalid-email": "E-mail inválido",
          };
          const message = erroMapper[erroCode] ?? erro.code;
          setSignInMessage(message);
          setLoading(false);
        });
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <ImageBackground source={imgBg} style={styles.bg}>
      <View style={styles.container}>
        <Text>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={(email) => {
            setEmail(email);
          }}
          style={styles.input}
        />

        <Text>Senha</Text>
        <TextInput
          value={password}
          onChangeText={(password) => {
            setPassword(password);
          }}
          style={styles.input}
          secureTextEntry
        />

        {isLoading && <ActivityIndicator color="#FFFF00" size="large" />}
        {!isLoading && (
          <View>
            <TouchableHighlight
              underlayColor="#CCCCCC"
              style={styles.button}
              onPress={() => handleSignIn()}
            >
              <Text style={styles.btnText}>Entrar</Text>
            </TouchableHighlight>
            <Text style={styles.errorMessage}>{signInMessage}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: null,
  },
  button: {
    backgroundColor: "#bfb300",
    margin: 10,
    height: 40,
    justifyContent: "center",
  },
  btnText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
  },
  input: {
    height: 40,
    padding: 5,
    marginBottom: 10,
    backgroundColor: "#CCCCCC",
  },
  errorMessage: {
    textAlign: "center",
    color: "red",
    marginTop: 10,
    fontSize: 18,
  },
});
