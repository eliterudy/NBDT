import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3001",
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

// Add more API functions as needed
