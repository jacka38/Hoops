import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const isFavorite = (gameid) => {
    return favorites.some((item) => item.gameid === gameid);
  };

  const fetchFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      setFavorites(parsedFavorites);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  };

  const addToFavorites = async (item) => {
    let newFavorites;
    if (isFavorite(item.gameid)) {
      newFavorites = favorites.filter(
        (favorite) => favorite.gameid !== item.gameid
      );
    } else {
      newFavorites = [...favorites, item];
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const removeFavorite = async (gameid) => {
    const newFavorites = favorites.filter((item) => item.gameid !== gameid);
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
