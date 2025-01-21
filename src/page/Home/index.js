import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Feather from "@expo/vector-icons/Feather";
import ProductCard from "../../components/ProductCard";

import { useNavigation } from "@react-navigation/native";
import { GamesContext } from "../../contexts/games";
import { GeneroContext } from "../../contexts/genero";

function Home() {
  const { jogos, games } = useContext(GamesContext);
  const { category, genero } = useContext(GeneroContext);

  const [search, setSearch] = useState("");

  const navigation = useNavigation();
  useEffect(() => {
    genero();
    games();
  }, [search]);

  async function buscarJogos() {
    // Filtrar os jogos com base no texto de busca
    if (jogos.length > 0 && search.trim() !== "") {
      const resultados = await jogos.filter(
        (jogo) =>
          jogo.name.toLowerCase() &&
          jogo.name.toLowerCase().includes(search.toLowerCase())
      );
      // coloquei {resultados} no navigation.navigate, que é um params para depois eu pegar no search passando {resultados} = route.params, mas primeiro tenho que colocar route dentro da função Search({route}),no arquivo Search...

      navigation.navigate("Search", { resultados });
      setSearch("");
    } else {
      console.log("Erro", "Não foi possível encontrar jogos");
      setSearch("");
    }
  }

  function handleGeneroId(resultadosId, resultadosName) {
    navigation.navigate("Categorys", {
      resultadosId,
      resultadosName,
    });
  }
  function handlePageFavorites() {
    navigation.navigate("Favorites");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titulo}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            color: "#FFFFFF",
            padding: 10,
          }}
        >
          Dev<Text style={{ color: "#FF455F" }}>Games</Text>
        </Text>
        <TouchableOpacity style={styles.bookmark} onPress={handlePageFavorites}>
          <Feather name="bookmark" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Looking for a game?"
          placeholderTextColor="#FFFFFF"
          onChangeText={(text) => setSearch(text)}
        />
        <TouchableOpacity onPress={buscarJogos}>
          <Feather name="search" size={24} color="#FF455F" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={category}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleGeneroId(item.id, item.name)}
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={jogos}
        renderItem={({ item }) => <ProductCard card={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#050B18",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-arrow",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#1F2430",
    padding: 10,
    borderRadius: 25,
    width: "80%",
    color: "#FFFFFF",
    margin: 10,
  },
  titulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },
  bookmark: {
    backgroundColor: "#1F2430",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  categoryButton: {
    flex: 1,
    width: "100%",
    height: 50,
    marginBottom: 10,
    marginTop: 5,
  },
  text: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "400",
    backgroundColor: "#64748B",
    margin: 5,
    padding: 5,
    borderRadius: 10,
    textAlign: "center",
  },
});
