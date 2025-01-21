import React from "react";
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

import ProductCard from "../../components/ProductCard";

import { useGames } from "../../contexts/gameContext";

function Favorites() {
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
          renderItem={({ item }) => <ProductCard card={item} hasTrash />}
          keyExtractor={(item) => item.id}
        />
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
