import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

type Item = {
  type: string;
  value: number;
};

export const HistoricoItem: FC<Item> = ({ type, value }) => {
  const bg =
    type == "despesa" ? styles.despesaBackGround : styles.receitaBackground;

  return (
    <View style={[styles.area, bg]}>
      <Text>{type}</Text>
      <Text>R$ {value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  area: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 40,
  },
  despesaBackGround: {
    backgroundColor: "#FF0000",
  },
  receitaBackground: {
    backgroundColor: "#00FF00",
  },
});
