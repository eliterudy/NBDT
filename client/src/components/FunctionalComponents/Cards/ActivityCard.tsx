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
import { SIZES, COLORS, FONTS, icons } from "../../../constants";
import { AirbnbRating } from "react-native-ratings";
import { FoodCrawler, Restaurant } from "../../../config/types";

const ActivityCard = ({
  containerStyle,
  activityItem,
  imageStyle,
  onPress,
}: {
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  activityItem: Restaurant;
  foodCrawl: FoodCrawler;
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
      <View style={styles.imageContainer}>
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
      {activityItem.category ? (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{activityItem.category}</Text>
        </View>
      ) : null}
      <View style={styles.activityTitleContainer}>
        <Text style={styles.activityTitle}>
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
};
const styles = StyleSheet.create({
  imageContainer: {
    padding: SIZES.radius,
  },
  categoryContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    paddingHorizontal: SIZES.radius,
    paddingVertical: 5,
    backgroundColor: COLORS.transparentGray,
    borderRadius: SIZES.radius,
  },
  categoryText: {
    color: "white",
    ...FONTS.h4,
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

export default ActivityCard;
