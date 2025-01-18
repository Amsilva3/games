import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

import { useNavigation } from "@react-navigation/native";
import { salvarJogosNoAsyncStorage } from "../../components/AsyncStorage";

import api from "../../services/api";
import { useGames } from "../../contexts/gameContext";

function Detail({ route }) {
  const navigation = useNavigation();
  const { card } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const { toogleFavorites, favorites } = useGames();

  const [detalhes, setDetalhes] = useState([]);

  const ID_DO_JOGO = card.id;

  useEffect(() => {
    async function DetailGames() {
      const response = await api.get(`/games/${ID_DO_JOGO}`, {
        params: {
          key: process.env.EXPO_PUBLIC_API_KEY,
        },
      });
      setDetalhes(response.data);
    }

    DetailGames();
  }, [ID_DO_JOGO]);

  const htmlRemoveRegex = /(<([^>]+)>)/gi;
  function handleBack() {
    navigation.goBack();
  }
  async function handleSave() {
    await toogleFavorites(card);
    console.log("Salvo com sucesso");
  }

  return (
    <View style={styles.container}>
      {detalhes && (
        <View style={styles.item}>
          {detalhes.id === ID_DO_JOGO && (
            <View>
              <View style={styles.header}>
                <TouchableOpacity style={styles.bookmark} onPress={handleBack}>
                  <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color="#FFF"
                    fontWeight="bold"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookmark} onPress={handleSave}>
                  <Feather
                    name="bookmark"
                    size={18}
                    color={
                      favorites.some((item) => item.id === ID_DO_JOGO)
                        ? "#FF455F"
                        : "#FFFFFF"
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.imgContainer}>
                <Image
                  style={styles.imagem}
                  source={{ uri: detalhes.background_image }}
                />
                <Image
                  style={styles.imagem}
                  source={{ uri: detalhes.background_image_additional }}
                />
              </View>
              <View style={styles.star}>
                <Ionicons name="star" color="yellow" size={20} />
                <Text style={styles.released}>
                  {detalhes.rating} / {detalhes.rating_top}
                </Text>
              </View>
              <Text style={styles.title}>{detalhes.name}</Text>

              <Text style={styles.subTitle}>Generos</Text>
              <Text style={styles.genero}>{detalhes.genres[0].name}</Text>
              <Text style={styles.subTitle}>Descrição</Text>
              <Text numberOfLines={7} style={styles.description}>
                {detalhes.description.replace(htmlRemoveRegex, " ")}
              </Text>

              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.buttonContainer}
              >
                <Text style={styles.button}>Ver mais</Text>
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.ModalContainer}>
                  <View style={styles.headerModal}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color="#FFF"
                        fontWeight="bold"
                      />
                    </TouchableOpacity>
                    <Text style={styles.subTitleModal}>Descrição</Text>
                  </View>
                  <Text style={styles.descriptionModal}>
                    {detalhes.description.replace(htmlRemoveRegex, " ")}
                  </Text>
                </View>
              </Modal>

              <Text style={styles.subTitle}>Plataformas</Text>
              <View style={styles.platform}>
                <Text style={styles.plataformas}>
                  {detalhes.parent_platforms[0].platform.name}
                </Text>
                <Text style={styles.plataformas}>
                  {detalhes.parent_platforms[1].platform.name}
                </Text>
                <Text style={styles.plataformas}>
                  {detalhes.parent_platforms[2].platform.name}
                </Text>
              </View>

              <Text style={styles.subTitle}>Stores</Text>
              <View style={styles.stores}>
                <Text style={styles.store}>
                  {detalhes?.stores[0]?.store.name}
                </Text>
                <Text style={styles.store}>
                  {detalhes?.stores[1]?.store.name}
                </Text>
                <Text style={styles.store}>
                  {detalhes?.stores[2]?.store.name}
                </Text>
                <Text style={styles.store}>
                  {detalhes.stores[3]?.store.name}
                </Text>
                <Text style={styles.store}>
                  {detalhes.stores[4]?.store.name}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050B18",
    paddingTop: Platform.OS === "android" ? 55 : 80,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    margin: 5,
    fontWeight: "bold",
  },
  item: {
    width: "100%",
    height: "100%",
  },
  description: {
    fontSize: 12,
    color: "#FFF",
    gap: 5,
    padding: 10,
  },
  plataformas: {
    fontSize: 12,
    color: "#FFF",
    margin: 10,
    padding: 10,
    backgroundColor: "#1F2430",
    borderRadius: 10,
  },
  genero: {
    fontSize: 12,
    color: "#FFF",
    gap: 5,
    padding: 10,
  },
  subTitle: {
    fontSize: 20,
    color: "#FFF",
    gap: 5,
    padding: 10,
    fontWeight: "bold",
  },

  platform: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imagem: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  imgContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 300,
    position: "relative",
    zIndex: 0,
  },
  store: {
    fontSize: 12,
    color: "#FFF",
    margin: 10,
    padding: 10,
    backgroundColor: "#1F2430",
    borderRadius: 10,
  },
  stores: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  released: {
    fontSize: 12,
    color: "#FFF",
  },
  star: {
    flexDirection: "row",
    width: 50,
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  button: {
    color: "#FFF",
  },
  buttonContainer: {
    width: "90%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E5C88",
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 10,
  },
  ModalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#050B18",
  },
  headerModal: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  subTitleModal: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 120,
  },
  descriptionModal: {
    fontSize: 15,
    color: "#FFF",
    padding: 10,
  },
  header: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
    marginTop: 20,
    position: "absolute",
    zIndex: 1,
  },
  bookmark: {
    backgroundColor: "#1F2430",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
