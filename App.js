import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./app/screens/SplashScreen";
import HomeScreen from "./app/screens/HomeScreen";
import FavoritesScreen from "./app/screens/FavoritesScreen";

import { useCustomFonts } from "./GlobalStyles";
import { ActivityIndicator } from "react-native";
import { FavoritesProvider } from "./app/contexts/Favorites";

// Luodaan Stack-olio, jolla mahdollistetaan sovelluksessa navigointi näkymästä toiseen
const Stack = createNativeStackNavigator();

// Hoops funktiosta palautetaan NavigationContainer komponentti, joka ympäröi Stack.Navigator komponentin
export default function App() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    // Fonts are still loading, show a loading indicator
    return <ActivityIndicator />;
  }

  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
