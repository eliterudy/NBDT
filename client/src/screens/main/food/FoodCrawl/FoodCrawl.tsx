import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";

import RestaurantCard from "../../../../components/FunctionalComponents/Cards/RestaurantCard";
import { COLORS, FONTS, SIZES } from "../../../../constants";

const FoodCrawl = ({ route, navigation }) => {
  const { crawlData, eateriesData } = route.params;
  var selectedEateries = [];
  for (var a = 0; a < Object.keys(crawlData.eateryId).length; a++) {
    for (var b = 0; b < eateriesData.length; b++) {
      if (Object.values(crawlData.eateryId)[a] == eateriesData[b].id) {
        selectedEateries.push(eateriesData[b]);
      }
    }
  }
  function renderStops() {
    return (
      <View>
        {Object.keys(crawlData.eateryId)[0] == "Drinks" &&
        crawlData.eateryId["Drinks"] != "NA" ? (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginBottom: SIZES.padding,
              marginTop: 30,
            }}
          >
            <Text style={{ ...FONTS.h2 }}>Drinks</Text>
            <RestaurantCard
              restaurant={selectedEateries.find((item) => {
                return item.id == Object.values(crawlData.eateryId)[0];
              })}
              onPress={() => {
                navigation.navigate("Activity", {
                  activity: selectedEateries.find((item) => {
                    return item.id == Object.values(crawlData.eateryId)[0];
                  }),
                });
              }}
            />
          </View>
        ) : null}
        {Object.keys(crawlData.eateryId)[1] == "Appetizer" &&
        crawlData.eateryId["Appetizer"] != "NA" ? (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginBottom: SIZES.padding,
              marginTop: 30,
            }}
          >
            <Text style={{ ...FONTS.h2 }}>Appetizers</Text>
            <RestaurantCard
              restaurant={selectedEateries.find((item) => {
                return item.id == Object.values(crawlData.eateryId)[1];
              })}
              onPress={() => {
                navigation.navigate("Activity", {
                  activity: selectedEateries.find((item) => {
                    return item.id == Object.values(crawlData.eateryId)[1];
                  }),
                });
              }}
            />
          </View>
        ) : null}
        {Object.keys(crawlData.eateryId)[2] == "Entree" &&
        crawlData.eateryId["Entree"] != "NA" ? (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginBottom: SIZES.padding,
              marginTop: 30,
            }}
          >
            <Text style={{ ...FONTS.h2 }}>Entré</Text>
            <RestaurantCard
              restaurant={selectedEateries.find((item) => {
                return item.id == Object.values(crawlData.eateryId)[2];
              })}
              onPress={() => {
                navigation.navigate("Activity", {
                  activity: selectedEateries.find((item) => {
                    return item.id == Object.values(crawlData.eateryId)[2];
                  }),
                });
              }}
            />
          </View>
        ) : null}
        {Object.keys(crawlData.eateryId)[3] == "Dessert" &&
        crawlData.eateryId["Dessert"] != "NA" ? (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginBottom: SIZES.padding,
              marginTop: 30,
            }}
          >
            <Text style={{ ...FONTS.h2 }}>Dessert</Text>
            <RestaurantCard
              restaurant={selectedEateries.find((item) => {
                return item.id == Object.values(crawlData.eateryId)[3];
              })}
              onPress={() => {
                navigation.navigate("Activity", {
                  activity: selectedEateries.find((item) => {
                    return item.id == Object.values(crawlData.eateryId)[3];
                  }),
                });
              }}
            />
          </View>
        ) : null}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <ScrollView style={{ flex: 1 }}>
        <View style={{ position: "relative", paddingBottom: 40 }}>
          <SliderBox
            images={crawlData.header_image}
            autoplay={true}
            sliderBoxHeight={340}
            circleLoop={true}
          />
          <View
            style={[
              {
                position: "absolute",
                bottom: 0,
                width: "100%",
                left: "0%",
                right: "0%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              },
            ]}
          >
            <View
              style={[
                {
                  borderRadius: 15,
                  padding: SIZES.padding,
                  backgroundColor: COLORS.white,
                },
                styles.shadow,
              ]}
            >
              <View style={styles.shadow}></View>
              <View>
                <Text
                  style={{ ...FONTS.h2, textAlign: "center", width: "100%" }}
                >
                  {crawlData.name}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Body */}
        {/* About */}
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            marginBottom: SIZES.padding,
          }}
        >
          <Text style={{ ...FONTS.h2 }}>About</Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              color: COLORS.gray,
              ...FONTS.body3,
            }}
          >
            {crawlData.about}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {/* Divider */}
          <View
            style={{
              borderBottomColor: COLORS.transparentBlack1,
              borderBottomWidth: 1,
              width: "94%",
              left: "3%",
              right: "3%",
              marginTop: 50,
            }}
          />
          {/* Stops */}
          <View
            style={[
              {
                position: "absolute",
                top: "1%",
                right: "30%",
                left: "30%",
                borderRadius: 15,
                padding: SIZES.padding,
                backgroundColor: COLORS.white,
              },
              styles.shadow,
            ]}
          >
            <View style={styles.shadow}></View>
            <View>
              <Text style={{ ...FONTS.h2, textAlign: "center", width: "100%" }}>
                Stops
              </Text>
            </View>
          </View>
          {/* Drinks */}
          <View style={{ marginTop: 30 }}>{renderStops()}</View>

          {/* Appetizers */}

          {/* Entre */}

          {/* Dessert */}
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

export default FoodCrawl;
