import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import { Restaurant } from "../../../config/types";
import { COLORS, FONTS, SIZES } from "../../../constants";

const RestaurantCard = ({
  containerStyle = {},
  restaurant,
  onPress,
}: {
  containerStyle?: ViewStyle;
  restaurant: Restaurant;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <TouchableOpacity
      style={[
        containerStyle,
        {
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          marginTop: 10,
          width: "94%",
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray2,
        },
      ]}
      onPress={() => onPress}
    >
      <Image
        source={restaurant.image_url}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.detailText}>{restaurant.name}</Text>
        <Text style={styles.descText}>
          {restaurant.category} | {restaurant.price_range}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginBottom: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: SIZES.radius,
  },
  details: {
    width: "70%",
    paddingHorizontal: 20,
  },
  detailText: {
    flex: 1,
    ...FONTS.h2,
  },
  descText: {
    color: COLORS.gray,
    ...FONTS.body4,
  },
});

export default RestaurantCard;
