import React, { useContext, useState } from "react";
import RestaurantsFinder from "../APIs/RestaurantsFinder";
import { RestaurantContextApi } from "../context/RestaurantContext";
const AddRestaurant = () => {
  const { addRest, restaurants, setRestaurants } =
    useContext(RestaurantContextApi);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceReange, setPriceRange] = useState("price range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await RestaurantsFinder.post("/restaurants", {
        name,
        location,
        price_range: priceReange,
      });
      setRestaurants([...restaurants, res.data.data]);
      addRest(res.data.data);
      setName("");
      setLocation("");
      setPriceRange("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="">
      <div className="form -row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="col">
          <select
            name=""
            id=""
            className="custom-select my-1 mr-sm-2"
            value={priceReange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddRestaurant;
