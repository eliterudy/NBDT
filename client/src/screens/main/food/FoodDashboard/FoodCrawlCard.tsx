import React from "react";
import { ImageStyle, StyleSheet, Text, View, ViewStyle } from "react-native";
import GenericCards from "../../../../components/FunctionalComponents/Cards/GenericCards";
import { Food_Crawls, Restaurant } from "../../../../config/types";
import { COLORS, FONTS, SIZES } from "../../../../constants/theme";
const FoodCrawlCard = ({
  containerStyle,
  activityItem,
  imageStyle,
  onPress,
}: {
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  activityItem: Food_Crawls | Restaurant;
  onPress: Function;
}) => {
  return (
    <View style={{ position: "relative" }}>
      <GenericCards.ActivityCard
        containerStyle={containerStyle}
        activityItem={activityItem}
        imageStyle={imageStyle}
        onPress={onPress}
      />
    </View>
  );
};

const FoodCrawlCardStyles = StyleSheet.create({});

export default FoodCrawlCard;
