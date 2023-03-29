const trimRestaurant = (restaurant) => {
  const {
    name,
    poster_url,
    banner_url,
    price_range,
    rating,
    category,
    alternate_category,
    crawlers,
  } = restaurant;
  return {
    name,
    poster_url,
    banner_url,
    price_range,
    rating,
    category,
    alternate_category,
    crawlers,
  };
};

const trimRestaurantList = (restaurants) => {
  return restaurants.map((restaurant) => {
    return trimRestaurant(restaurant);
  });
};

module.exports = {
  trimRestaurantList,
};
