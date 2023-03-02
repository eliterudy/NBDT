const trimRestaurant = (restaurant) => {
  const { name, image_url, price_range, rating, category, crawlers } =
    restaurant;
  return { name, image_url, price_range, rating, category, crawlers };
};

const trimRestaurantList = (restaurants) => {
  return restaurants.map((restaurant) => {
    return trimRestaurant(restaurant);
  });
};

module.exports = {
  trimRestaurantList,
};
