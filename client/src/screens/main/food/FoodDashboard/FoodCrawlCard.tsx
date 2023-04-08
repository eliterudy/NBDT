import React from "react";
import {
  GestureResponderEvent,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import GenericCards from "../../../../components/FunctionalComponents/Cards/GenericCards";
import { FoodCrawler, Restaurant } from "../../../../config/types";

const FoodCrawlCard = ({
  containerStyle,
  activityItem,
  crawlData,
  imageStyle,
  onPress,
}: {
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  activityItem: Restaurant | FoodCrawler;
  crawlData?: FoodCrawler;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <View style={{ position: "relative" }}>
      <GenericCards.ActivityCard
        containerStyle={containerStyle}
        activityItem={activityItem}
        crawlData={crawlData}
        imageStyle={imageStyle}
        onPress={onPress}
      />
    </View>
  );
};

const FoodCrawlCardStyles = StyleSheet.create({});

export default FoodCrawlCard;
