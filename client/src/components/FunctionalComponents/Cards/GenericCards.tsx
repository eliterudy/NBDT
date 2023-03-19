import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import { SIZES, COLORS, FONTS, icons } from "../../../constants";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Food_Crawls, Restaurant } from "../../../config/types";
const GenericCards = {
  ActivityCard: ({
    containerStyle,
    activityItem,
    foodCrawl,
    imageStyle,
    onPress,
  }: {
    containerStyle?: ViewStyle;
    imageStyle?: ImageStyle;
    activityItem: Restaurant;
    foodCrawl: Food_Crawls;
    onPress: (event: GestureResponderEvent) => void;
  }) => {
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
            source={activityItem.image_url}
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
            {activityItem.name} | {activityItem.price_range}
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
