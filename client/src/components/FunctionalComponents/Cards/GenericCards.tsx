import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import { SIZES, COLORS, FONTS } from "../../../constants";
import { AirbnbRating } from "react-native-ratings";
import { FoodCrawler, Restaurant } from "../../../config/types";

const GenericCards = {
  ActivityCard: ({
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
    const priceRanges = ["$", "$$", "$$$", "$$$$", "$$$$$"]; // Array of dollar signs for each price range
    return (
      <TouchableOpacity
        style={{
          width: 250,
          marginRight: 20,
          borderRadius: SIZES.radius,
          ...containerStyle,
        }}
        onPress={onPress}
      >
        <View style={ActivityStyles.imageContainer}>
          <Image
            source={{ uri: activityItem.poster_url }}
            resizeMode="cover"
            style={{
              width: 250,
              borderRadius: SIZES.radius,
              ...imageStyle,
            }}
          />
        </View>

        <View style={ActivityStyles.activityTitleContainer}>
          <Text style={ActivityStyles.activityTitle}>
            {activityItem.name}{" "}
            {activityItem.price_range && activityItem.price_range !== null
              ? `| ${priceRanges[activityItem.price_range - 1]}` // Access the appropriate dollar sign based on the price range
              : null}
          </Text>
          {activityItem.rating ? (
            <AirbnbRating
              count={activityItem.rating}
              defaultRating={5}
              isDisabled={true}
              showRating={false}
              size={12}
              starContainerStyle={{ position: "absolute", top: 5, left: 0 }}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  },
};

// all styles
const ActivityStyles = StyleSheet.create({
  imageContainer: {
    padding: SIZES.radius,
  },

  activityTitleContainer: {
    left: 12,
    bottom: 70,
    height: 60,
    width: "100%",
    paddingHorizontal: SIZES.radius,
    paddingVertical: 5,
    backgroundColor: COLORS.transparentGray,
    borderRadius: SIZES.radius,
  },
  activityTitle: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});

export default GenericCards;
