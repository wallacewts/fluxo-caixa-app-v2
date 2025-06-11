import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  ImageBackground,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AuthContext } from "../hooks/useIsSignedIn";
import { NavigationContext } from "@react-navigation/native";
import { HistoricoItem } from "../components/HistoricoItem";

type HistoricoItem = {
  type: string;
  value: number;
  key: string;
};

export const InternaScreen = () => {
  const [saldo, setSaldo] = useState(0);
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const imgBg = require("../assets/fundo.jpg");
  const navigation = useContext(NavigationContext);
  const { signOut } = useContext(AuthContext);

  const handleAddReceita = () => navigation?.navigate("AddReceita");
  const handleAddDespesa = () => navigation?.navigate("AddDespesa");
  const handleCompartilhar = () => {
    Share.share({
      title: "Histórico",
      message: `
        Total: R$${saldo}\n
        ---------------------
        ${historico.reduce(
          (acc, item) => acc + `${item.type} - R$${item.value}\n`,
          ""
        )}
      `,
    });
  };
  const handleLogOut = () => {
    firebase.auth().signOut();
    signOut();
  };

  useEffect(() => {
    firestore()
      .collection("historicos")
      .doc(firebase.auth().currentUser?.uid)
      .collection("historico")
      .onSnapshot({
        next: (snapShot) => {
          const historico = snapShot.docs.map((doc) => {
            const historicoItem = doc?.data();
            return {
              key: doc.id,
              value: historicoItem.value,
              type: historicoItem.type,
            };
          });
          setHistorico(historico);
          const saldo = historico.reduce((acc, item) => {
            if (item.type === "despesa") {
              return acc - Number(item.value);
            }
            return acc + Number(item.value);
          }, 0);
          setSaldo(saldo);
        },
      });
  }, []);

  return (
    <ImageBackground source={imgBg} style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.saldoArea}>
          <Text style={styles.saldo}>Saldo: R$ {saldo}</Text>
        </View>

        <FlatList
          data={historico}
          renderItem={({ item }) => (
            <HistoricoItem type={item.type} value={item.value} />
          )}
          keyExtractor={(item) => `item-key-${item.key}`}
          style={styles.historico}
        />

        <View style={styles.botoesArea}>
          <Button title="Compartilhar" onPress={() => handleCompartilhar()} />
        </View>

        <View style={styles.botoesArea}>
          <Button
            title="Adicionar Receita"
            onPress={() => handleAddReceita()}
          />
          <Button
            title="Adicionar Despesa"
            onPress={() => handleAddDespesa()}
          />
          <Button title="Sair" onPress={() => handleLogOut()} />
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
    margin: 10,
    justifyContent: "center",
  },
  saldoArea: {
    paddingVertical: 20,
  },
  saldo: {
    textAlign: "center",
    fontSize: 25,
  },
  historico: {
    flex: 1,
  },
  botoesArea: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
});
