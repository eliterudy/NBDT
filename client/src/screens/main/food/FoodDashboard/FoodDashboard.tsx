import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import {
  FONTS,
  COLORS,
  SIZES,
  icons,
  IMAGES as images,
  dummyData,
} from "../../../../constants";
import RestaurantCard from "../../../../components/FunctionalComponents/Cards/RestaurantCard";
import RecommendationCard from "./FoodCrawlCard";
import FoodCrawlCard from "./FoodCrawlCard";

const FoodDashboard = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [searchOverlayToggle, setSearchOverlayToggle] = useState(false);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    setData(dummyData.restaurants);
    setFullData(dummyData.restaurants);
    setSearchOverlayToggle(false);
  }, []);

  const handleSearch = (text) => {
    if (text === "") {
      setSearchOverlayToggle(false);
      setQuery("");
    } else {
      setSearchOverlayToggle(true);
      let formattedQuery = text.toLowerCase();
      let filteredData = fullData.filter(
        (item) =>
          item.category.toLowerCase().includes(formattedQuery) ||
          item.alternateCategory.toLowerCase().includes(formattedQuery) ||
          item.name.toLowerCase().includes(formattedQuery)
      );
      setData(filteredData);
      setQuery(text);
    }
  };

  function renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Hello Taha,</Text>
          <Text style={styles.headerTextDesc}>
            Lets Explore Downtown New Bedford!
          </Text>
        </View>
        <TouchableOpacity onPress={() => console.log("TODO: Profile screen")}>
          <Image source={images.UserProfile7} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
    );
  }

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
      data.length ? (
        <SafeAreaView>
          <FlatList
            data={data}
            keyExtractor={(item) => `${item.id}`}
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <RestaurantCard
                  restaurant={item}
                  containerStyle={{ marginHorizontal: 10 }}
                  onPress={() => {
                    navigation.navigate("Activity", {
                      activity: item,
                    });
                  }}
                />
              );
            }}
            ListFooterComponent={<View style={styles.footer} />}
          />
        </SafeAreaView>
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
  function renderPopularEateries() {
    return (
      <View style={styles.activityContainer}>
        <Text style={styles.activityText}>Recommended For You</Text>
        <FlatList
          data={dummyData.restaurants}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
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
                onPress={() => {
                  navigation.navigate("Activity", { activity: item });
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
          data={dummyData.foodCrawls}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <FoodCrawlCard
                activityItem={item}
                containerStyle={{ height: 250 }}
                imageStyle={{ height: 200 }}
                onPress={() => {
                  navigation.navigate("FoodCrawl", {
                    crawlData: item,
                    eateriesData: dummyData.restaurants,
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
      <ScrollView horizontal={false}>
        {renderHeader()}
        {renderSearchBar()}

        {/* <FoodList /> */}
        <FlatList
          data={dummyData.restaurants}
          keyExtractor={(item) => `${item.id}`}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              {searchOverlayToggle
                ? renderSearchBarOverlay()
                : [renderPopularEateries(), renderFoodCrawls()]}
            </View>
          }
          renderItem={({ item }) => {
            return !searchOverlayToggle ? (
              <RestaurantCard
                restaurant={item}
                containerStyle={{ marginHorizontal: 10 }}
                onPress={() => {
                  navigation.navigate("Activity", { activity: item });
                }}
              />
            ) : null;
          }}
          ListFooterComponent={<View style={styles.footer} />}
        />
      </ScrollView>
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
