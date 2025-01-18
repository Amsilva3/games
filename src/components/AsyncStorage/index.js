import { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GamesContext } from "../../contexts/games";

export async function obterDadosDoAsyncStorage() {
  let listasJogos = [];
  try {
    const response = await AsyncStorage.getItem("@card");
    if (response === null) return listasJogos;
    const parseData = JSON.parse(response);
    listasJogos.push(...parseData);
  } catch (erro) {
    console.log(erro);
  }
  return listasJogos;
}

export async function salvarJogosNoAsyncStorage(newGame) {
  // const { jogos, games } = useContext(GamesContext);
  const listas = await obterDadosDoAsyncStorage();
  const existe = listas.some((game) => game.id === newGame.id);
  if (!existe) {
    listas.push(newGame);
    await AsyncStorage.setItem("@card", JSON.stringify(listas));
  }
}

export async function removerDadosDoAsyncStorage(newGame) {
  const listas = await obterDadosDoAsyncStorage();
  const filtroListas = listas.filter((game) => game.id !== newGame.id);
  await AsyncStorage.setItem("@card", JSON.stringify(filtroListas));
  return filtroListas;
}
