import { ImageProps } from "react-native";
export interface Restaurant {
  id: string;
  name: string;
  image_url: ImageProps["source"];
  price_range: number;
  rating: number;
  category: string[];
  crawlers?: Crawler[];
}

export interface RestaurantDetails extends Restaurant {
  address: string;
  phone: string;
  country_code: string;
  schedule: String[];
  alternate_category: string[];
  website_url: string;
  menu_url: string;
  spice_level: number;
  description: string;
  coordinates: number[];
  logo_url: ImageProps["source"];
  banner_image_url: ImageProps["source"];
}

export interface Crawler {
  crawl_id: string;
  type: number;
}

export interface Food_Crawls {
  id: string;
  name: string;
  price_range: number;
  image_url: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
}

export type RootStackParamList = {
  FoodDashboard: undefined; // undefined because you aren't passing any params to the Food screen
  Auth: undefined;
  Tabs: undefined;
  BrowserView: { uri: String };
  RestaurantDetail: {};
  MapsView: { data: RestaurantDetails };
  FoodCrawl: { crawlData: Food_Crawls; eateriesData: Restaurant[] };
};
