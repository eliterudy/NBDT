import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GenericCards from "../../../../components/FunctionalComponents/Cards/GenericCards";
import { COLORS, FONTS, SIZES } from "../../../../constants/theme";
const FoodCrawlCard = ({
  containerStyle,
  activityItem,
  imageStyle,
  onPress,
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
