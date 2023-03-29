import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { RootStackParamList } from "../../../../config/types";
import { COLORS, FONTS, icons, SIZES } from "../../../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "RestaurantDetail">;
  icon: ImageSourcePropType;
  label: String;
};

const RestaurantDetail = ({ navigation }: Props) => {
  const specificRestaurant = useSelector(
    (state: RootState) => state.specificRestaurant.specificRestaurant
  );

  const IconLabel = ({ icon, label }: Props) => {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={icon}
          resizeMode="cover"
          style={{
            width: 30,
            height: 30,
          }}
        />
        <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>{label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: specificRestaurant.banner_url }}
          resizeMode="cover"
          style={{ width: "100%", height: "80%" }}
        />
        <View
          style={[
            {
              position: "absolute",
              bottom: "5%",
              left: "5%",
              right: "5%",
              borderRadius: 15,
              padding: SIZES.padding,
              backgroundColor: COLORS.white,
            },
            styles.shadow,
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.shadow}>
              <Image
                source={{ uri: specificRestaurant.logo_url }}
                resizeMode="contain"
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 15,
                }}
              />
            </View>
            <View
              style={{
                marginHorizontal: SIZES.radius,
                justifyContent: "space-around",
              }}
            >
              <Text style={{ ...FONTS.h3 }}>{specificRestaurant.name}</Text>
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.body5,
                  paddingRight: 50,
                }}
              >
                {specificRestaurant.address}
              </Text>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
                  {specificRestaurant.phone}
                </Text>
                <AirbnbRating
                  count={specificRestaurant.rating}
                  defaultRating={5}
                  isDisabled={true}
                  showRating={false}
                  size={12}
                  starContainerStyle={{ left: 10, bottom: 2 }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Body */}
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: SIZES.base,
            paddingHorizontal: SIZES.padding * 2,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BrowserView", {
                uri: specificRestaurant.menu_url,
              });
            }}
          >
            <IconLabel icon={icons.menu} label="Menu" navigation={undefined} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MapsView", {
                data: specificRestaurant,
              });
            }}
          >
            <IconLabel
              icon={icons.map}
              label="Directions"
              navigation={undefined}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BrowserView", {
                uri: specificRestaurant.website_url,
              });
            }}
          >
            <IconLabel
              icon={icons.web}
              label="Website"
              navigation={undefined}
            />
          </TouchableOpacity>
        </View>
        {/* About */}
        <View
          style={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            marginBottom: SIZES.padding,
          }}
        >
          <Text style={{ ...FONTS.h2 }}>Operating Hours</Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              color: COLORS.gray,
              ...FONTS.body3,
            }}
          >
            {specificRestaurant.schedule?.join("\n")}
          </Text>
          <Text style={{ ...FONTS.h2 }}>About</Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              color: COLORS.gray,
              ...FONTS.body3,
            }}
          >
            {specificRestaurant.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default RestaurantDetail;
