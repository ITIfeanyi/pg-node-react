import React, { useContext, useEffect } from "react";
import RestaurantsFinder from "../APIs/RestaurantsFinder";
import { RestaurantContextApi } from "../context/RestaurantContext";
import { useHistory } from "react-router-dom";
import StarRatinng from "./StarRatinng";
const RestaurantsList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContextApi);

  let history = useHistory();

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };
  useEffect(() => {
    try {
      (async () => {
        const res = await RestaurantsFinder.get("/getRestaurants");
        console.log(res.data.data);
        setRestaurants(res.data.data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [setRestaurants]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    try {
      const res = await RestaurantsFinder.delete(`/restaurants/${id}`);
      setRestaurants(restaurants.filter((res) => res.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRatinng rating={restaurant.id} />
        <span className="text-warning ml-1"> {restaurant.count} </span>
      </>
    );
  };
  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => {
            return (
              <tr
                key={restaurant.id}
                onClick={() => handleRestaurantSelect(restaurant.id)}
              >
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{`${"$".repeat(restaurant.price_range)}`}</td>
                <td>{renderRating(restaurant)}</td>
                <td>
                  {" "}
                  <button
                    className="btn btn-warning"
                    onClick={(e) => handleUpdate(e, restaurant.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDelete(e, restaurant.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantsList;
