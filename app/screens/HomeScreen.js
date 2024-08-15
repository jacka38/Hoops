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
  const [coloredGames, setColoredGames] = useState([]);
  const { isFavorite, addToFavorites } = useFavorites();

  const cardColors = [
    //colors used for the cards randomly selected
    Color.WEIRD_BLUE,
    Color.SOFT_BEIGE,
    Color.MUTED_CORAL,
    Color.LIGHT_PEACH,
    Color.LIGHT_GRASS,
    Color.PURPLE,
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://hoops-7fecd-default-rtdb.europe-west1.firebasedatabase.app/.json"
        );
        const data = await response.json();

        const gamesArray = data
          ? Object.keys(data).map((key) => ({ gameid: key, ...data[key] }))
          : [];

        setGames(gamesArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const assignColorsToCards = (cards) => {
      let previousColor = null;
      return cards.map((card) => {
        const availableColors = cardColors.filter(
          (color) => color !== previousColor
        );
        const assignedColor =
          availableColors[Math.floor(Math.random() * availableColors.length)];
        previousColor = assignedColor;
        return { ...card, backgroundColor: assignedColor };
      });
    };

    if (games.length > 0) {
      const sortedGames = games.sort(
        (a, b) => new Date(a.time) - new Date(b.time)
      );
      setColoredGames(assignColorsToCards(sortedGames));
    }
  }, [games]);

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const navigateToCreatePostScreen = () => {
    navigation.navigate("Create");
  };

  const filteredGames = showFavorites
    ? coloredGames.filter((game) => isFavorite(game.gameid))
    : coloredGames;

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
        <View style={[styles.card, { backgroundColor: game.backgroundColor }]}>
          <View style={styles.cardContent}>
            <View style={styles.cardTitleView}>
              <Text style={styles.title}>
                {game.sport} at {game.location}
              </Text>
              <Text style={styles.detailsText}>
                Needed Players: {game.neededPlayers}
              </Text>
              <View style={styles.timeContainer}>
                <Image
                  source={require("../assets/time_icon.png")}
                  style={styles.timeIcon}
                />
                <Text style={styles.detailsText}>
                  {formatDateTime(game.time)}
                </Text>
              </View>
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
            </View>
          )}
        </View>
      </TouchableHighlight>
    );
  };

  const renderTopBar = () => (
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={toggleShowFavorites}
        style={styles.filterButton}
      >
        <Image
          source={require("../assets/Hoops_logo_full.png")}
          style={styles.logo}
        />
      </TouchableOpacity>
    </View>
  );

  const renderCards = () => (
    <ScrollView contentContainerStyle={styles.list}>
      {filteredGames.map((game) => (
        <Card key={game.gameid} game={game} />
      ))}
    </ScrollView>
  );

  const renderBottomBar = () => (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        onPress={navigateToCreatePostScreen}
        style={styles.createPostButton}
      >
        <Image
          source={require("../assets/create_icon.png")}
          style={styles.createIcon}
        />
      </TouchableOpacity>
    </View>
  );

  const renderBottomBarLeft = () => (
    <View style={styles.bottomBarLeft}>
      <TouchableOpacity
        onPress={toggleShowFavorites}
        style={styles.createPostButton}
      >
        <Image
          source={require("../assets/liked.png")}
          style={styles.createIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.background}>
      {renderTopBar()}
      {renderCards()}
      {renderBottomBar()}
      {renderBottomBarLeft()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Color.BACKGROUND,
  },
  topBar: {
    paddingTop: 30,
    height: 100, // Increased height to provide more space for the logo
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5, // Increased margin to provide more space before the list
  },
  bottomBar: {
    position: "absolute",
    right: 15,
    bottom: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBarLeft: {
    position: "absolute",
    left: 15,
    bottom: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
  },
  createPostButton: {
    marginBottom: 30,
    borderRadius: 25,
    padding: 10,
    elevation: 5,
    backgroundColor: Color.LIGHT_PURPLE,
  },
  card: {
    width: "90%",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    alignSelf: "center",
    elevation: 5,
  },
  cardContent: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  cardTitleView: {
    flex: 1,
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: Color.BROWN,
    marginHorizontal: 10,
  },
  likeButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  likeButton: {
    width: 40,
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  timeIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  createIcon: {
    width: 50,
    height: 50,
  },
  expandedContent: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.BOLD,
    color: Color.BLACK,
  },
  description: {
    marginTop: 5,
    fontSize: 16,
    color: Color.BLACK,
    fontFamily: FontFamily.REGULAR,
  },
  detailsText: {
    fontSize: 16,
    color: Color.BLACK,
    fontFamily: FontFamily.REGULAR,
  },
  list: {
    paddingBottom: 80,
    paddingTop: 20, // Added padding to create space before the list starts
  },
  logo: {
    width: 60, // Adjust width as needed
    height: 70, // Adjust height as needed
    marginTop: 15, // Added margin to ensure the logo is not too close to the top
  },
});

//timeutility
const formatDateTime = (dateString) => {
  const eventDate = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const options = { hour: "2-digit", minute: "2-digit" };

  if (
    eventDate.getDate() === today.getDate() &&
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getFullYear() === today.getFullYear()
  ) {
    return `Today | ${eventDate.toLocaleTimeString([], options)}`;
  } else if (
    eventDate.getDate() === tomorrow.getDate() &&
    eventDate.getMonth() === tomorrow.getMonth() &&
    eventDate.getFullYear() === tomorrow.getFullYear()
  ) {
    return `Tomorrow | ${eventDate.toLocaleTimeString([], options)}`;
  } else {
    const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    return `${eventDate.toLocaleDateString(
      [],
      dateOptions
    )} at ${eventDate.toLocaleTimeString([], options)}`;
  }
};
