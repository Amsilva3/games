import React from "react";
import StackRoutes from "./src/router/app.routes";
import { NavigationContainer } from "@react-navigation/native";
import GamesProvider from "./src/contexts/games";
import GeneroProvider from "./src/contexts/genero";

export default function App() {
  return (
    <NavigationContainer>
      <GeneroProvider>
        <GamesProvider>
          <StackRoutes />
        </GamesProvider>
      </GeneroProvider>
    </NavigationContainer>
  );
}
