import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  FONTS,
  COLORS,
  SIZES,
  icons,
  IMAGES as images,
} from "../../../../constants";
import RestaurantCard from "../../../../components/FunctionalComponents/Cards/RestaurantCard";
import RecommendationCard from "./FoodCrawlCard";
import FoodCrawlCard from "./FoodCrawlCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../config/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store/store";
import { fetchRestaurants } from "../../../../redux/reducers/restaurantReducer";
import { fetchFoodCrawlers } from "../../../../redux/reducers/foodCrawlerReducer";
import { fetchSpecificRestaurants } from "../../../../redux/reducers/specificRestaurantReducer";
import { fetchSpecificFoodCrawler } from "../../../../redux/reducers/specificFoodCrawlerReducer";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "FoodDashboard">;
};

const FoodDashboard = ({ navigation }: Props) => {
  const [searchOverlayToggle, setSearchOverlayToggle] = useState(false);
  const [query, setQuery] = useState("");
  const [searchdata, setSearchData] = useState([]);

  const restaurants = useSelector(
    (state: RootState) => state.restaurant.restaurants
  );
  const foodCrawlers = useSelector(
    (state: RootState) => state.foodCrawler.foodCrawlers
  );
  const specificRestaurant = useSelector(
    (state: RootState) => state.specificRestaurant.specificRestaurant
  );

  const specificFoodCrawler = useSelector(
    (state: RootState) => state.specificFoodCrawler.specificFoodCrawler
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchFoodCrawlers());
    setSearchOverlayToggle(false);
  }, [dispatch]);

  const handleSearch = (text: string) => {
    if (text === "") {
      setSearchOverlayToggle(false);
      setQuery("");
    } else {
      setSearchOverlayToggle(true);
      let formattedQuery = text.toLowerCase();
      let filteredData = restaurants.results.filter(
        (item) =>
          String(item.category).toLowerCase().includes(formattedQuery) ||
          String(item.alternate_category)
            .toLowerCase()
            .includes(formattedQuery) ||
          item.name.toLowerCase().includes(formattedQuery)
      );
      setSearchData(filteredData);
      setQuery(text);
    }
  };

  function renderSearchBar() {
    return (
      <View style={styles.searchBarView}>
        <Image source={icons.search} style={styles.searchBar} />
        <TextInput
          style={styles.searchText}
          placeholderTextColor={COLORS.gray}
          placeholder="Search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
        ></TextInput>
      </View>
    );
  }
  function renderSearchBarOverlay() {
    return searchOverlayToggle ? (
      searchdata.length ? (
        <FlatList
          data={searchdata}
          keyExtractor={(item) => {
            return item._id;
          }}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <RestaurantCard
                restaurant={item}
                containerStyle={{ marginHorizontal: 10 }}
                onPress={async () => {
                  await dispatch(fetchSpecificRestaurants(item._id));
                  navigation.navigate("RestaurantDetail", {
                    activity: specificRestaurant,
                  });
                }}
              />
            );
          }}
          ListFooterComponent={<View style={styles.footer} />}
        />
      ) : (
        <View>
          <Image
            source={images.no_result}
            resizeMode="cover"
            style={{
              flex: 1,
              width: "100%",
              height: 400,
              resizeMode: "cover",
              justifyContent: "center",
            }}
          />
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.body3,
              textAlign: "center",
              paddingHorizontal: SIZES.padding,
            }}
          >
            We couldn't find what you were looking for. Try searching for other
            keywords like: Seafood, Italian, and American etc.
          </Text>
        </View>
      )
    ) : null;
  }
  function renderRecommendedRestaurants() {
    return (
      <View style={styles.activityContainer}>
        <Text style={styles.activityText}>Recommended For You</Text>
        <FlatList
          data={restaurants.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => {
            return item._id;
          }}
          renderItem={({ item, index }) => {
            return index == 0 ||
              index == 1 ||
              index == 2 ||
              index == 3 ||
              index == 4 ? (
              <RecommendationCard
                activityItem={item}
                containerStyle={{ height: 350 }}
                imageStyle={{ height: 300 }}
                onPress={async () => {
                  await dispatch(fetchSpecificRestaurants(item._id));
                  navigation.navigate("RestaurantDetail", {
                    activity: specificRestaurant,
                  });
                }}
              />
            ) : null;
          }}
        />
      </View>
    );
  }
  function renderFoodCrawls() {
    return (
      <View>
        <Text style={styles.activityText}>Food Crawls</Text>
        <FlatList
          data={foodCrawlers.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => {
            return item._id;
          }}
          renderItem={({ item }) => {
            return (
              <FoodCrawlCard
                activityItem={item}
                containerStyle={{ height: 250 }}
                imageStyle={{ height: 200 }}
                onPress={async () => {
                  await dispatch(fetchSpecificFoodCrawler(item._id));
                  navigation.navigate("FoodCrawl", {
                    crawlData: specificFoodCrawler,
                    eateriesData: restaurants.results,
                  });
                }}
              />
            );
          }}
        />
        <Text style={styles.activityText}>Popular Eateries Near You</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderSearchBar()}
      <FlatList
        data={restaurants.results}
        keyExtractor={(item) => {
          return item._id;
        }}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {searchOverlayToggle ? (
              renderSearchBarOverlay()
            ) : (
              <>
                {renderRecommendedRestaurants()}
                {renderFoodCrawls()}
              </>
            )}
          </View>
        }
        renderItem={({ item }) => {
          return !searchOverlayToggle ? (
            <RestaurantCard
              restaurant={item}
              containerStyle={{ marginHorizontal: 10 }}
              onPress={async () => {
                await dispatch(fetchSpecificRestaurants(item._id));
                navigation.navigate("RestaurantDetail", {
                  activity: specificRestaurant ? specificRestaurant : null,
                });
              }}
            />
          ) : null;
        }}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  footer: {
    marginBottom: 100,
  },
  header: {
    flexDirection: "row",
    marginHorizontal: SIZES.padding,
    alignItems: "center",
    height: 80,
  },
  headerTextView: {
    flex: 1,
  },
  headerText: {
    color: COLORS.darkGreen,
    ...FONTS.h2,
  },
  headerTextDesc: {
    marginTop: 3,
    color: COLORS.gray,
    ...FONTS.body3,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBarView: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    marginHorizontal: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    marginVertical: SIZES.radius,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
  },
  searchBar: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray,
  },
  searchText: {
    marginLeft: SIZES.radius,
    width: "90%",
    ...FONTS.body3,
    color: COLORS.black,
  },
  activityContainer: {
    marginTop: SIZES.padding,
  },
  activityText: {
    marginHorizontal: SIZES.padding,
    ...FONTS.h2,
  },
});

export default FoodDashboard;
