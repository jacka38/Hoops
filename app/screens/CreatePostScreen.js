import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Color } from "../../GlobalStyles.js";

const CreatePostScreen = ({ navigation }) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND,
  },
});

export default CreatePostScreen;
