import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@models/Router';
import { store } from '@store/index';
import HomeScreen from '@screens/HomeScreen';
import DetailScreen from '@screens/DetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
