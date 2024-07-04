import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";

import { useFavorites } from "../contexts/Favorites.js";
import { Color, FontFamily } from "../../GlobalStyles.js";

// viedään navigation parametrina, jotta näkymästä toiseen navigoiminen onnistuu
export default function Favorites({ navigation }) {
  // State to hold the fetched favorites
  const { favorites, removeFavorite } = useFavorites(); // Use the context
}

// näkymän tyyleihin vaikuttavat asiat löytyvät alta
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Color.BACKGROUND, // taustaväri sovellukselle
  },
  logoPartial: {
    marginTop: 20,
    width: 100,
    height: 47.29,
  },
});
