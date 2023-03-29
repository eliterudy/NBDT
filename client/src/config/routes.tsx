import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  RestaurantDetail,
  Auth,
  FoodDashboard,
  BrowserView,
  MapsView,
  FoodCrawl,
  Tabs,
} from "../screens";
const Stack = createStackNavigator();

const routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"FoodDashboard"}
    >
      <Stack.Screen name="FoodDashboard" component={FoodDashboard} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
      <Stack.Screen name="BrowserView" component={BrowserView} />
      <Stack.Screen name="MapsView" component={MapsView} />
      <Stack.Screen name="FoodCrawl" component={FoodCrawl} />
    </Stack.Navigator>
  );
};

export default routes;
