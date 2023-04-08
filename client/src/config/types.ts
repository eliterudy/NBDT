export interface Restaurant {
  _id: any;
  id: "";
  name: "";
  address: "";
  phone: "";
  country_code: "";
  schedule: string[];
  alternate_category: string[];
  website_url: "";
  menu_url: "";
  spice_level: 0;
  description: "";
  coordinates: Coordinates[];
  logo_url: "";
  banner_url: "";
  poster_url: "";
  price_range: 0;
  rating: 0;
  category: string[];
  crawlers: Crawler[];
}
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Crawler {
  crawl_id: string;
  meal_type: string;
}

export interface FoodCrawler {
  _id: "";
  name: "";
  price_range: 0;
  poster_url: "";
  description: "";
  rating: 0;
}

export type RootStackParamList = {
  FoodDashboard: undefined; // undefined because you aren't passing any params to the Food screen
  Auth: undefined;
  Tabs: undefined;
  BrowserView: { uri: String };
  RestaurantDetail: {};
  MapsView: { data: Restaurant };
  FoodCrawl: { crawlData: {}; eateriesData: {} };
};
