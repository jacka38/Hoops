import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useFavorites } from "../contexts/Favorites";
import { Color, FontFamily } from "../../GlobalStyles";

export default function HomeScreen({ navigation }) {
  const [games, setGames] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const { isFavorite, addToFavorites } = useFavorites();

  useEffect(() => {
    // Fetch the JSON data from local source
    const fetchData = async () => {
      const data = await require("../assets/sampleData.json");
      setGames(data);
    };
    fetchData();
  }, []);

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const filteredGames = showFavorites
    ? games.filter((game) => isFavorite(game.gameid))
    : games;

  const Card = ({ game }) => {
    const [isFav, setIsFav] = useState(isFavorite(game.gameid));
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleFavorite = () => {
      addToFavorites(game);
      setIsFav(!isFav);
    };

    const toggleExpanded = () => {
      setIsExpanded(!isExpanded);
    };

    useEffect(() => {
      setIsFav(isFavorite(game.gameid));
    }, [isFavorite(game.gameid)]);

    return (
      <TouchableHighlight
        underlayColor={Color.GREEN}
        activeOpacity={0.9}
        onPress={toggleExpanded}
      >
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardTitleView}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: FontFamily.BOLD,
                  color: Color.BLACK,
                }}
              >
                {game.sport} at {game.location}
              </Text>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.likeButtonContainer}>
              <TouchableOpacity onPress={toggleFavorite}>
                <Image
                  style={styles.likeButton}
                  source={
                    isFav
                      ? require("../assets/heart_filled.png")
                      : require("../assets/heart.png")
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          {isExpanded && (
            <View style={styles.expandedContent}>
              <Text style={styles.description}>{game.description}</Text>
              <Text style={styles.detailsText}>
                Needed Players: {game.neededPlayers}
              </Text>
            </View>
          )}
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={toggleShowFavorites}
          style={styles.filterButton}
        >
          <Text style={styles.filterButtonText}>
            {showFavorites ? "Show All" : "Show Liked"}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {filteredGames.map((game) => (
          <Card key={game.gameid} game={game} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Color.BACKGROUND,
  },
  topBar: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
  },
  filterButtonText: {
    marginTop: 15,
    fontSize: 18,
    fontFamily: FontFamily.BOLD,
    color: Color.BROWN,
  },
  card: {
    backgroundColor: Color.LIGHTBLUE,
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    paddingBottom: 15,
  },
  cardContent: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  cardTitleView: {
    flex: 1,
  },
  separator: {
    width: 1,
    backgroundColor: Color.BLACK,
    marginVertical: 10,
  },
  likeButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    paddingHorizontal: 15,
  },
  likeButton: {
    width: 40,
    height: 40,
  },
  expandedContent: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  description: {
    marginTop: 5,
  },
  detailsText: {
    marginTop: 5,
  },
  list: {
    paddingVertical: 5,
  },
});
