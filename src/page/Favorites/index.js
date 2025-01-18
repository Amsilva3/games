import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { obterDadosDoAsyncStorage } from "../../components/AsyncStorage";
import ProductCard from "../../components/ProductCard";
import { GamesContext } from "../../contexts/games";
import { useGames } from "../../contexts/gameContext";

function Favorites() {
  const [dadosJogos, setDadosJogos] = useState([]);
  const { jogos, games } = useContext(GamesContext);
  const { favorites, loading } = useGames();
  const navigation = useNavigation();
  function handleBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="#FFF"
            fontWeight="bold"
          />
        </TouchableOpacity>
        <Text style={styles.text}>Favorites</Text>
      </View>
      {loading && <ProductCard />}
      {!loading && favorites.length === 0 && (
        <Text style={{ marginHorizontal: 14, textAlign: "center" }}>
          Nenhum jogo favoritado
        </Text>
      )}
      {!loading && favorites.length > 0 && (
        <FlatList
          data={favorites}
          hasTrash
          renderItem={({ item }) => <ProductCard card={item} />}
          keyExtractor={(item) => item.id}
        />
        // <ProductCard card={favorites} />
      )}
    </View>
  );
}

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#050B18",
    paddingTop: Platform.OS === "android" ? 55 : 80,
  },
  text: {
    color: "#F7F7F7",
    fontSize: 24,
    textAlign: "center",
    paddingLeft: 150,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatlist: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
