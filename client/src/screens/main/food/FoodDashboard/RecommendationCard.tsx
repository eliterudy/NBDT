import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  ImageStyle,
} from "react-native/types";
import GenericCards from "../../../../components/FunctionalComponents/Cards/GenericCards";
import { COLORS, FONTS, SIZES } from "../../../../constants/theme";
import { Restaurant } from "../../../../config/types";

const RecommendationCard = ({
  containerStyle,
  activityItem,
  imageStyle,
  onPress,
}: {
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  activityItem: Restaurant;
  restaurant: Restaurant;
  onPress: Function;
}) => {
  return (
    <View style={{ position: "relative" }}>
      {activityItem.category ? (
        <View style={RecommendationCardStyles.categoryContainer}>
          <Text style={RecommendationCardStyles.categoryText}>
            {activityItem.category}
          </Text>
        </View>
      ) : null}
      <GenericCards.ActivityCard
        containerStyle={containerStyle}
        activityItem={activityItem}
        imageStyle={imageStyle}
        onPress={onPress}
      />
    </View>
  );
};

const RecommendationCardStyles = StyleSheet.create({
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
});

export default RecommendationCard;
