import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import { FONTS, COLORS, SIZES, IMAGES, dummyData } from "../constants";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import BrowseCategoryCard from "../components/FunctionalComponents/Cards/BrowseCategoryCard";

const Landing = ({ navigation }) => {
  function renderCategories() {
    return (
      <View style={styles.categoriesContainer}>
        <FlatList
          data={dummyData.categories}
          numColumns={1}
          scrollEnabled={false}
          keyExtractor={(item) => `BrowseCategories-${item.id}`}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({ item, index }) =>
            item.thumbnail ? (
              <BrowseCategoryCard
                category={item}
                onPress={() => {
                  index == 0 ? navigation.navigate("FoodDashboard") : null;
                }}
              />
            ) : null
          }
        />
      </View>
    );
  }
  return (
    // <SafeAreaView style={styles.container}>
    <ImageBackground
      source={IMAGES.gradient}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <Text style={styles.categoryText}>Choose a Category</Text>
      <Text style={styles.categoryTextDesc}>
        Please choose a category from the options below to begin crawling!
      </Text>
      <View>{renderCategories()}</View>
    </ImageBackground>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  categoryText: {
    color: COLORS.white,
    ...FONTS.h1,
    paddingTop: SIZES.padding * 2,
    textAlign: "center",
  },
  categoryTextDesc: {
    color: COLORS.white,
    ...FONTS.body4,
    textAlign: "center",
  },
  categoriesContainer: {
    marginTop: SIZES.padding,
  },
});
export default Landing;
