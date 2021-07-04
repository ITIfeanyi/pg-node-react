import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantsFinder from "../APIs/RestaurantsFinder";
import { RestaurantContextApi } from "../context/RestaurantContext";
import AddReviews from "./AddReviews";
import Reviews from "./Reviews";
import StarRatinng from "./StarRatinng";

const DetailPage = () => {
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContextApi);
  const { id } = useParams();
  useEffect(() => {
    try {
      (async () => {
        const res = await RestaurantsFinder.get(`/restaurants/${id}`);
        console.log(res.data);
        setSelectedRestaurant(res.data);
      })();
    } catch (error) {}
  }, [id, setSelectedRestaurant]);
  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            <div className="text-center">
              <StarRatinng rating={selectedRestaurant.data.average_rating} />

              <span className="text-warning ml-1">
                {selectedRestaurant.data.count
                  ? `(${selectedRestaurant.data.restaurant})`
                  : "(0)"}
              </span>
            </div>{" "}
            {selectedRestaurant.data.name}{" "}
          </h1>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReviews />
        </>
      )}
    </div>
  );
};

export default DetailPage;
