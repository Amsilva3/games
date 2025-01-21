import React from "react";
import StackRoutes from "./src/router/app.routes";
import { NavigationContainer } from "@react-navigation/native";

import { GameProvider } from "./src/contexts/gameContext";

export default function App() {
  return (
    <NavigationContainer>
      <GameProvider>
        <StackRoutes />
      </GameProvider>
    </NavigationContainer>
  );
}
