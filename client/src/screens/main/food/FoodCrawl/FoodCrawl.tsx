import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { useSelector } from "react-redux";
import RestaurantCard from "../../../../components/FunctionalComponents/Cards/RestaurantCard";
import { Crawler, RootStackParamList } from "../../../../config/types";
import { COLORS, FONTS, SIZES } from "../../../../constants";
import { RootState } from "../../../../redux/store/store";

type Props = {
  route: RouteProp<RootStackParamList, "FoodCrawl">;
  navigation: StackNavigationProp<RootStackParamList, "FoodCrawl">;
};

const FoodCrawl = ({ route, navigation }: Props) => {
  const specificFoodCrawler = useSelector(
    (state: RootState) => state.specificFoodCrawler.specificFoodCrawler
  );
  const restaurants = useSelector(
    (state: RootState) => state.restaurant.restaurants.results
  );
  const [filteredDrinksResto, setFilteredDrinksResto] = useState([]);
  const [filteredAppetizerResto, setFilteredAppetizerResto] = useState([]);
  const [filteredEntreResto, setFilteredEntreResto] = useState([]);
  const [filteredDessertResto, setFilteredDessertResto] = useState([]);
  const bannerImages = restaurants
    .filter((restaurant: { crawlers: any[] }) =>
      restaurant.crawlers.some(
        (crawler) => crawler.crawl_id === specificFoodCrawler._id
      )
    )
    .map((restaurant: { banner_url: any }) => restaurant.banner_url);

  useEffect(() => {
    setFilteredDrinksResto(
      restaurants.filter((resto: any) => {
        return resto.crawlers.some(
          (crawler: Crawler) =>
            crawler.crawl_id === specificFoodCrawler._id &&
            crawler.meal_type === "0"
        );
      })
    );

    setFilteredAppetizerResto(
      restaurants.filter((resto: any) => {
        return resto.crawlers.some(
          (crawler: Crawler) =>
            crawler.crawl_id === specificFoodCrawler._id &&
            crawler.meal_type === "1"
        );
      })
    );
    setFilteredEntreResto(
      restaurants.filter((resto: any) => {
        return resto.crawlers.some(
          (crawler: Crawler) =>
            crawler.crawl_id === specificFoodCrawler._id &&
            crawler.meal_type === "2"
        );
      })
    );
    setFilteredDessertResto(
      restaurants.filter((resto: any) => {
        return resto.crawlers.some(
          (crawler: Crawler) =>
            crawler.crawl_id === specificFoodCrawler._id &&
            crawler.meal_type === "3"
        );
      })
    );
  }, []);

  function renderStops() {
    return (
      <View>
        {filteredDrinksResto ? (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginBottom: SIZES.padding,
              marginTop: 30,
            }}
          >
            <Text style={{ ...FONTS.h2 }}>Drinks</Text>

            {filteredDrinksResto.map((resto) => (
              <RestaurantCard
                restaurant={resto}
                onPress={() =>
                  navigation.navigate("RestaurantDetail", { activity: resto })
                }
              />
            ))}
          </View>
        ) : null}
        {filteredAppetizerResto ? (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginBottom: SIZES.padding,
              marginTop: 30,
            }}
          >
            <Text style={{ ...FONTS.h2 }}>Appetizers</Text>

            {filteredAppetizerResto.map((resto) => (
              <RestaurantCard
                restaurant={resto}
                onPress={() =>
                  navigation.navigate("RestaurantDetail", { activity: resto })
                }
              />
            ))}
          </View>
        ) : null}
        {filteredEntreResto ? (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginBottom: SIZES.padding,
              marginTop: 30,
            }}
          >
            <Text style={{ ...FONTS.h2 }}>Entre</Text>

            {filteredEntreResto.map((resto) => (
              <RestaurantCard
                restaurant={resto}
                onPress={() =>
                  navigation.navigate("RestaurantDetail", { activity: resto })
                }
              />
            ))}
          </View>
        ) : null}
        {filteredDessertResto ? (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginBottom: SIZES.padding,
              marginTop: 30,
            }}
          >
            <Text style={{ ...FONTS.h2 }}>Dessert</Text>

            {filteredDessertResto.map((resto) => (
              <RestaurantCard
                restaurant={resto}
                onPress={() =>
                  navigation.navigate("RestaurantDetail", { activity: resto })
                }
              />
            ))}
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
            images={bannerImages}
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
                  {specificFoodCrawler.name}
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
            {specificFoodCrawler.description}
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
          <View style={{ marginTop: 30 }}>{renderStops()}</View>
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
