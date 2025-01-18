import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";

export default function ProductCard({ card }) {
  const navigation = useNavigation();
  function handleDetail() {
    navigation.navigate("Detail", { card });
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handleDetail}>
      <View>
        <Image style={styles.image} source={{ uri: card.background_image }} />
      </View>
      <View style={styles.nameCard}>
        <Text style={styles.title}>{card.name}</Text>

        <View style={styles.star}>
          <Ionicons name="star" color="yellow" size={20} />
          <Text style={styles.released}>
            {card.rating} / {card.rating_top}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    opacity: 0.5,
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 10,
    color: "#fff",
  },
  released: {
    fontSize: 14,
    color: "#fff",
  },
  star: {
    flexDirection: "row",
    width: 100,
    justifyContent: "space-arrow",
    alignItems: "center",
    gap: 10,
    marginLeft: 10,
  },
  nameCard: {
    position: "absolute",
    bottom: 20,
    marginLeft: 15,
  },
});
