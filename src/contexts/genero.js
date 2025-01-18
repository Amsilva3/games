import React, { createContext, useState } from "react";
import api from "../services/api";

export const GeneroContext = createContext({});

function GeneroProvider({ children }) {
  const [category, setCategory] = useState([]);
  async function genero() {
    const response = await api.get("/genres", {
      params: {
        key: process.env.EXPO_PUBLIC_API_KEY,
        page_size: 5,
      },
    });

    setCategory(response.data.results);
  }

  return (
    <GeneroContext.Provider value={{ genero, category }}>
      {children}
    </GeneroContext.Provider>
  );
}

export default GeneroProvider;
