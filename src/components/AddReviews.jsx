import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantsFinder from "../APIs/RestaurantsFinder";

const AddReviews = () => {
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");

  const { id } = useParams();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const res = await RestaurantsFinder.post(`/restaurants/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      console.log(res);
    } catch (error) {}
  };

  return (
    <div className="mb-2">
      <form>
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              name="rating"
              id="rating"
              className="custom-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            id="Review"
            className="form-control"
            cols="30"
            rows="10"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitReview}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReviews;
