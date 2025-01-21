import {
  useState,
  useContext,
  useCallback,
  useEffect,
  createContext,
} from "react";
import {
  obterDadosDoAsyncStorage,
  salvarJogosNoAsyncStorage,
  removerDadosDoAsyncStorage,
} from "../components/AsyncStorage";
import api from "../services/api";

const GameContext = createContext({});

export function GameProvider({ children }) {
  const [detalhes, setDetalhes] = useState([]);
  const [jogos, setJogos] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const getFavorites = useCallback(async () => {
    setLoading(true);

    try {
      const data = await obterDadosDoAsyncStorage();
      setFavorites(data);
    } catch (error) {
      console.error("ContextError: ", error);
    }
    setLoading(false);
  }, [setLoading, setFavorites]);

  useEffect(() => {
    getFavorites();
  }, []);

  async function genero() {
    const response = await api.get("/genres", {
      params: {
        key: process.env.EXPO_PUBLIC_API_KEY,
        page_size: 5,
      },
    });

    setCategory(response.data.results);
  }
  async function games() {
    const response = await api.get("/games", {
      params: {
        key: process.env.EXPO_PUBLIC_API_KEY,
        page_size: 5,
      },
    });
    setJogos(response.data.results);
  }
  async function DetailGames(ID_DO_JOGO) {
    const response = await api.get(`/games/${ID_DO_JOGO}`, {
      params: {
        key: process.env.EXPO_PUBLIC_API_KEY,
      },
    });
    setDetalhes(response.data);
  }

  async function toogleFavorites(newGame) {
    const exists = favorites.some((game) => game.id === newGame.id);
    if (exists) {
      await removerDadosDoAsyncStorage(newGame);
      await getFavorites();
    } else {
      await salvarJogosNoAsyncStorage(newGame);
      await getFavorites();
    }
  }

  async function removeFavorite(newGame) {
    const newlist = await removerDadosDoAsyncStorage(newGame);
    setFavorites(newlist);
  }
  return (
    <GameContext.Provider
      value={{
        loading,
        favorites,
        toogleFavorites,
        removeFavorite,
        genero,
        category,
        games,
        jogos,
        DetailGames,
        detalhes,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("Fora do contexto");
  }
  return context;
}
