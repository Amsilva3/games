import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../components/ProductCard";

export default function Search({ route }) {
  const { resultados } = route.params;

  if (resultados <= 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>
          "Não existe nenhum resultado para sua pesquisa"
        </Text>
        <StatusBar style="light" />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={resultados}
          renderItem={({ item }) => <ProductCard card={item} />}
          keyExtractor={(item) => item.id}
        />
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050B18",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});
