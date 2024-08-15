import { useFonts } from "expo-font";

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    Poppins_black: require("./app/assets/fonts/Poppins-Black.ttf"),
    Poppins_blackitalic: require("./app/assets/fonts/Poppins-BlackItalic.ttf"),
    Poppins_bold: require("./app/assets/fonts/Poppins-Bold.ttf"),
    Poppins_bolditalic: require("./app/assets/fonts/Poppins-BoldItalic.ttf"),
    Poppins_extrabold: require("./app/assets/fonts/Poppins-ExtraBold.ttf"),
    Poppins_extrabolditalic: require("./app/assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    Poppins_extralight: require("./app/assets/fonts/Poppins-ExtraLight.ttf"),
    Poppins_extralightitalic: require("./app/assets/fonts/Poppins-ExtraLightItalic.ttf"),
    Poppins_light: require("./app/assets/fonts/Poppins-Light.ttf"),
    Poppins_lightitalic: require("./app/assets/fonts/Poppins-LightItalic.ttf"),
    Poppins_medium: require("./app/assets/fonts/Poppins-Medium.ttf"),
    Poppins_mediumitalic: require("./app/assets/fonts/Poppins-MediumItalic.ttf"),
    Poppins_regular: require("./app/assets/fonts/Poppins-Regular.ttf"),
    Poppins_semibold: require("./app/assets/fonts/Poppins-SemiBold.ttf"),
    Poppins_semibolditalic: require("./app/assets/fonts/Poppins-SemiBoldItalic.ttf"),
    Poppins_thin: require("./app/assets/fonts/Poppins-Thin.ttf"),
    Poppins_thinitalic: require("./app/assets/fonts/Poppins-ThinItalic.ttf"),
  });
  return fontsLoaded;
};

export const FontFamily = {
  BLACK: "Poppins_black",
  BLACKITALIC: "Poppins_blackitalic",
  BOLD: "Poppins_bold",
  BOLDITALIC: "Poppins_bolditalic",
  EXTRABOLD: "Poppins_extrabold",
  EXTRABOLDITALIC: "Poppins_extrabolditalic",
  EXTRALIGHT: "Poppins_extralight",
  EXTRALIGHTITALIC: "Poppins_extralightitalic",
  LIGHT: "Poppins_light",
  LIGHTITALIC: "Poppins_lightitalic",
  MEDIUM: "Poppins_medium",
  MEDIUMITALIC: "Poppins_mediumitalic",
  REGULAR: "Poppins_regular",
  SEMIBOLD: "Poppins_semibold",
  SEMIBOLDITALIC: "Poppins_semibolditalic",
  THIN: "Poppins_thin",
  THINITALIC: "Poppins_thinitalic",
};

export const Color = {
  BROWN: "#362C24", // dark brown
  GREEN: "#B6D9C9",
  LIGHT_PURPLE: "#FCDCF4",
  MINT_GREEN: "#209C6E",
  LIGHTBLUE: "#DCF4FC",
  WEIRD_BLUE: "#DCECFC",
  SOFT_BEIGE: "#F5E8C7",
  MUTED_CORAL: "#D9A7A1",
  LIGHT_PEACH: "#F9D5D3",
  LIGHT_GRASS: "#d6edc7",
  PURPLE: "#ebe4f7",

  BACKGROUND: "rgba(156, 110, 97, 0.2)", //Background Brown #9C6E61 hex code

  WHITE: "#FFFFFF",
  BLACK: "#000000",
};
