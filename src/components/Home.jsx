import React from "react";
import AddRestaurant from "./AddRestaurant";
import Header from "./Header";
import RestaurantsList from "./RestaurantsList";

const Home = () => {
  return (
    <div>
      <Header />

      <AddRestaurant />
      <RestaurantsList />
    </div>
  );
};

export default Home;
