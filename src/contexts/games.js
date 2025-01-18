import React, { createContext, useState } from "react";
import api from "../services/api";

export const GamesContext = createContext({});

function GamesProvider({ children }) {
  const [jogos, setJogos] = useState([]);
  async function games() {
    const response = await api.get("/games", {
      params: {
        key: process.env.EXPO_PUBLIC_API_KEY,
        page_size: 5,
      },
    });
    setJogos(response.data.results);
  }

  return (
    <GamesContext.Provider value={{ games, jogos }}>
      {children}
    </GamesContext.Provider>
  );
}

export default GamesProvider;
