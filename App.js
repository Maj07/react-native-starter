import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { store } from "./store";

import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import CartScreen from "./screens/CartScreen";
import FilterScreen from "./screens/FilterScreen";

const Stack = createNativeStackNavigator();
const screenDefaultOption = { headerShown: false };

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={screenDefaultOption}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={screenDefaultOption}
          />
          <Stack.Screen name="Filter" component={FilterScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
