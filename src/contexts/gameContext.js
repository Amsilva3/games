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

const GameContext = createContext({});

export function GameProvider({ children }) {
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
      value={{ loading, favorites, toogleFavorites, removeFavorite }}
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
