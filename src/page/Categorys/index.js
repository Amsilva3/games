import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import ProductCard from "../../components/ProductCard";
import api from "../../services/api";
import Header from "../../components/Header/Header";

function Categorys({ route }) {
  const { resultadosId, resultadosName } = route.params;
  const [jogosFiltrados, setJogosFiltrados] = useState([]);

  useEffect(() => {
    ID_CATEGORIA();
  }, [resultadosId]);

  async function ID_CATEGORIA() {
    const response = await api.get("/games?", {
      params: {
        key: process.env.EXPO_PUBLIC_API_KEY,
        page_size: 5,
        genres: resultadosId,
      },
    });
    setJogosFiltrados(response.data.results);
  }

  return (
    <View style={styles.container}>
      <Header style={styles.title} resultadosName={resultadosName} />

      <FlatList
        data={jogosFiltrados}
        renderItem={({ item }) => <ProductCard card={item} />}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar style="light" />
    </View>
  );
}

export default Categorys;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050B18",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    padding: 20,
  },
});
