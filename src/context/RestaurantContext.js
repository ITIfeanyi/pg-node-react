import React, { createContext, useState } from "react";

export const RestaurantContextApi = createContext();

const RestaurantContext = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  return (
    <RestaurantContextApi.Provider
      value={{
        restaurants,
        setRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      {children}
    </RestaurantContextApi.Provider>
  );
};

export default RestaurantContext;
