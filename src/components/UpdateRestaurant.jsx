import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantsFinder from "../APIs/RestaurantsFinder";
import { RestaurantContextApi } from "../context/RestaurantContext";
import { useHistory } from "react-router-dom";

const UpdateRestaurant = () => {
  let history = useHistory();

  const { restaurants } = useContext(RestaurantContextApi);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceReange, setPriceRange] = useState("price range");

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    (async () => {
      const res = await RestaurantsFinder.put(`/restaurants/${id}`, {
        location,
        name,
        price_range: priceReange,
      });

      history.push("/");
    })();
  };

  useEffect(() => {
    try {
      (async () => {
        const res = await RestaurantsFinder.get(`/restaurants/${id}`);
        setName(res.data.data.name);
        setLocation(res.data.data.location);
        setPriceRange(res.data.data.price_range);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {/* <h1> {restaurants[0].name}</h1> */}
      <form method="post">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            name="name"
            id="name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            type="text"
            name="location"
            id="location"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">price_range</label>
          <input
            onChange={(e) => setPriceRange(e.target.value)}
            value={priceReange}
            type="number"
            name="price_range"
            id="price_range"
            className="form-control"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitUpdate}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
