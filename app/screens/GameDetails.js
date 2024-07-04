import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFavorites } from "../contexts/Favorites";
import { Color, FontFamily } from "../../GlobalStyles";

export default function GameDetails({ navigation, route }) {
  const { addToFavorites, isFavorite } = useFavorites();
  const { game } = route.params;
  const itemIsFavorite = isFavorite(game.gameid);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.topView}>
        <Image
          style={styles.logo_partial}
          source={require("../assets/Hoops_logo_partial.png")}
        />
      </View>
      <View style={styles.headingView}>
        <Text style={styles.title}>
          {game.sport} at {game.location}
        </Text>
        <TouchableOpacity onPress={() => addToFavorites(game)}>
          <Image
            style={{ width: 30, height: 30 }}
            source={
              itemIsFavorite
                ? require("../assets/heart_filled.png")
                : require("../assets/heart.png")
            }
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollviewContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <View style={{ alignItems: "center" }}>
              <View style={styles.gameLabel}>
                <Text style={styles.gameName}>{game.sport}</Text>
              </View>
              <Text
                style={{
                  color: Color.BLUE,
                  fontSize: 20,
                  fontFamily: FontFamily.BOLD,
                  padding: 10,
                }}
              >
                Game Description
              </Text>
              <Text style={styles.detailsText}>{game.description}</Text>
              <Text style={styles.detailsText}>
                Needed Players: {game.neededPlayers}
              </Text>
              <Text style={styles.detailsText}>Location: {game.location}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Color.BACKGROUND,
  },
  topView: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    backgroundColor: Color.BACKGROUND,
    paddingTop: 30,
  },
  logo_partial: {
    marginTop: 20,
    width: 100,
    height: 47.29,
  },
  icon: {
    width: 30,
    height: 30,
  },
  headingView: {
    marginTop: 120,
    left: 27,
    width: "85%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: FontFamily.BOLD,
    color: Color.BLUE,
    paddingBottom: 10,
  },
  scrollviewContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  contentContainer: {
    marginTop: 10,
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  detailsText: {
    width: "95%",
    padding: 10,
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    textAlign: "center",
    color: Color.BLACK,
    fontFamily: FontFamily.REGULAR,
  },
  cookingtimeLabel: {
    margin: 5,
    width: "auto",
    height: "auto",
    backgroundColor: Color.WHITE,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  card: {
    width: "95%",
    height: "auto",
    backgroundColor: Color.WHITE,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 20,
  },
  gameLabel: {
    margin: 15,
    padding: 12,
    width: "auto",
    height: "auto",
    borderRadius: 15,
    backgroundColor: Color.BLUE,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  gameName: {
    lineHeight: 22,
    fontSize: 16,
    color: Color.WHITE,
    fontFamily: FontFamily.REGULAR,
    paddingStart: 10,
  },
  cityIcon: {
    width: 20,
    height: 20,
  },
});
