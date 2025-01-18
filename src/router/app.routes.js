import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../page/Home";
import Search from "../page/Search";
import Categorys from "../page/Categorys";
import Detail from "../page/Detail";
import Favorites from "../page/Favorites";

const Stack = createNativeStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#FFF",
          },
          headerStyle: {
            backgroundColor: "#050B18",
          },
        }}
      />

      <Stack.Screen
        name="Categorys"
        component={Categorys}
        options={{
          headerShown: false,
          title: "Titulo",
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#FFF",
          },
          headerStyle: {
            backgroundColor: "#050B18",
          },
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,
          title: "Detalhes",
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#FFF",
          },
          headerStyle: {
            backgroundColor: "#050B18",
          },
        }}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: false,
          title: "Favorites",
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#FFF",
          },
          headerStyle: {
            backgroundColor: "#050B18",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default StackRoutes; // Exportando o StackRoutes para ser utilizado em outras telas
