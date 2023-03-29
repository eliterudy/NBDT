import axios from "axios";
import { Platform } from "react-native";

const baseURL =
  Platform.OS === "android" ? "http://10.0.2.2:3001" : "http://127.0.0.1:3001";

const api = axios.create({
  baseURL,
});

export const getRestaurants = async () => {
  try {
    const response = await api.get("/food/restaurants/");
    return response.data;
  } catch (error) {
    console.log("Error fetching restaurants:", error);
    throw error;
  }
};

export const getSpecificRestaurant = async (id) => {
  try {
    const response = await api.get(`/food/restaurants/id/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching restaurants:", error);
    throw error;
  }
};

export const getFoodCrawlers = async () => {
  try {
    const response = await api.get("/food/crawlers/");
    return response.data;
  } catch (error) {
    console.log("Error fetching crawlers:", error);
    throw error;
  }
};

export const getSpecificFoodCrawler = async (id) => {
  try {
    const response = await api.get(`/food/crawlers/id/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching restaurants:", error);
    throw error;
  }
};

// Add more API functions as needed
