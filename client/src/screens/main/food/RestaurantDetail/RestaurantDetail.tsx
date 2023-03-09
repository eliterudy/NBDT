import { StackNavigationProp } from "@react-navigation/stack";
import type { RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
import {
  RootStackParamList,
  RestaurantDetails,
} from "../../../../config/types";

import { COLORS, dummyData, FONTS, icons, SIZES } from "../../../../constants";

type Props = {
  route: RouteProp<RootStackParamList, "RestaurantDetail">;
  navigation: StackNavigationProp<RootStackParamList, "RestaurantDetail">;
  icon: ImageSourcePropType;
  label: String;
};

const RestaurantDetail = ({ route, navigation }: Props) => {
  const [data, setData] = useState<RestaurantDetails>(dummyData.RestoDetails);
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
          source={data.banner_image_url}
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
                source={data.logo_url}
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
              <Text style={{ ...FONTS.h3 }}>{data.name}</Text>
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.body5,
                  paddingRight: 50,
                }}
              >
                {data.address}
              </Text>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
                  {data.phone}
                </Text>
                <AirbnbRating
                  count={data.rating}
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
                uri: data.menu_url,
              });
            }}
          >
            <IconLabel
              icon={icons.menu}
              label="Menu"
              route={undefined}
              navigation={undefined}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MapsView", {
                data: data,
              });
            }}
          >
            <IconLabel
              icon={icons.map}
              label="Directions"
              route={undefined}
              navigation={undefined}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BrowserView", {
                uri: data.website_url,
              });
            }}
          >
            <IconLabel
              icon={icons.web}
              label="Website"
              route={undefined}
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
            {data.schedule}
          </Text>
          <Text style={{ ...FONTS.h2 }}>About</Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              color: COLORS.gray,
              ...FONTS.body3,
            }}
          >
            {data.description}
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
