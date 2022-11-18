import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkEditReview } from "../../store/reviews";
import { FaStar } from "react-icons/fa"


export default function EditReviewForm({ setTrigger }) {
  const { snackId } = useParams()
  const dispatch = useDispatch()

  const sessionUser = useSelector((state) => state.session.user)
  const reviews = useSelector((state) => Object.values(state.reviews))

  const userReview = reviews.filter(review => review.user_id === sessionUser.id)
  const review = Object.values(userReview)[0]


  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [hover, setHover] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    if (rating === null) errors.push("Must provide a rating between 1-5!")
    if (comment.length < 5) errors.push("Review must be at least 5 characters!");
    setValidationErrors(errors);
  }, [comment, rating]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (validationErrors.length) return alert("Cannot Submit Review");

    const editedReview = {
      ...review,
      user_id: sessionUser.id,
      snack_id: snackId,
      rating,
      comment
    }

    dispatch(thunkEditReview(editedReview))
    setRating(1)
    setComment('')
    setTrigger(false)

  }

  return (
    <>
      <div className="reviewFormContainer">
        <h1> Edit your review </h1>
        <form className="reviewForm" onSubmit={handleSubmit}>
          {hasSubmitted && validationErrors.length > 0 && (
            <div className="errorHandling">
              <div className="errorTitle">
                Please fix the following errors before submitting:
              </div>
              <ul className="errors">
                {validationErrors.map((error) => (
                  <li key={error} id="error">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <label className="review-rating-label">Rating: </label>
          <div className="star-rating-container">
            <div id="review_stars">
              {[...Array(5)].map((star, index) => {
                const ratingVal = index + 1;

                return (
                  <label key={index}>
                    <input
                      className='stars'
                      type="radio"
                      id="radioBttn"
                      name="rating"
                      value={ratingVal}
                      onClick={() => setRating(ratingVal)}
                    />
                    <FaStar
                      className="star"
                      color={
                        ratingVal <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      size={20}
                      onMouseEnter={() => setHover(ratingVal)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
              <label id="zero_five"> {!rating ? 0 : rating} / 5</label>

            </div>
            <label id="leave_your_thoughts">Leave your thoughts: </label>
            <textarea
              className="review-input"
              required
              placeholder={comment}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="reviewSubmit" type="submit">Submit your review</button>
          </div>
        </form>

      </div>
    </>

  )
}
