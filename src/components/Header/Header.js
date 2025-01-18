import React from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Header({ resultadosName }) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack("Home");
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="#FFF"
          fontWeight="bold"
        />
      </TouchableOpacity>
      <Text style={styles.titulo}>{resultadosName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#050B18",
    padding: 5,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  titulo: {
    marginLeft: 10,
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },
});
