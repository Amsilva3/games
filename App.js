import React from "react";
import StackRoutes from "./src/router/app.routes";
import { NavigationContainer } from "@react-navigation/native";
import GamesProvider from "./src/contexts/games";
import GeneroProvider from "./src/contexts/genero";
import { GameProvider } from "./src/contexts/gameContext";

export default function App() {
  return (
    <NavigationContainer>
      <GameProvider>
        <GeneroProvider>
          <GamesProvider>
            <StackRoutes />
          </GamesProvider>
        </GeneroProvider>
      </GameProvider>
    </NavigationContainer>
  );
}
