import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../../constants";

const BrowseRestaurantCard = ({ category, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={category?.thumbnail}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={styles.categoryTextContainer}>
          <Text style={styles.text}>{category?.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: 200,
    paddingHorizontal: SIZES.radius,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: COLORS.white,
    margin: 10,
    borderRadius: SIZES.radius,
    flex: 1,
  },
  text: {
    color: COLORS.white,
    ...FONTS.largeTitle,
    marginTop: 10,
  },
  categoryTextContainer: {
    position: "absolute",
    bottom: 1,
    height: 80,
    width: 390,
    paddingHorizontal: SIZES.radius,
    paddingVertical: 5,
    backgroundColor: "rgba(77,77,77, 0.6)",
  },
});

export default BrowseRestaurantCard;
