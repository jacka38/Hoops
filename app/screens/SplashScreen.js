import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Color } from "../../GlobalStyles.js";

const StartingScreen = ({ navigation }) => {
  // asetetaan 3 sekunnin ajastin, jonka jälkeen siirrytään seuraavaan näkymään
  setTimeout(() => {
    navigation.navigate("Home");
  }, 3000);

  return (
    <View style={styles.background}>
      <Image
        style={styles.logoFull}
        source={require("../assets/Hoops_logo_full.png")}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logoFull: {
    width: 100,
    height: 200,
  },
});

export default StartingScreen;
