import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { thunkGetAllReviews, thunkDeleteReview } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import Modal from 'react-modal';
import ReviewForm from '../ReviewFormModal/ReviewForm';
import EditReviewForm from '../ReviewEditForm';
import './reviews.css'

export default function Reviews() {
    const dispatch = useDispatch();
    const { snackId } = useParams();
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showReviewEditForm, setShowReviewEditForm] = useState(false);

    const sessionUser = useSelector((state) => state.session.user);
    const reviews = useSelector(state => Object.values(state.reviews));
    // console.log(review)

    Modal.setAppElement('body');

    function openReviewForm() {
        setShowReviewForm(true)
    }

    function closeReviewForm() {
        setShowReviewForm(false)
    }

    function openReviewEditForm() {
        setShowReviewEditForm(true)
    }

    function closeReviewEditForm() {
        setShowReviewEditForm(false)
    }

    function oneReview () {
        alert("You've already left a review for this snack")
        setShowReviewEditForm(true)

    }

    useEffect(() => {
        dispatch(thunkGetAllReviews(snackId))
    }, [dispatch, snackId])

    const formStyles = {
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          minHeight: '100%',
          padding: '12px',
          backgroundColor: 'rgba(34, 34, 34, 0.65)'
        },
        content: {
          position: 'relative',
          margin: 'auto',
          maxWidth: '500px',
          width: '100%',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '24px',
          outline: 'none',
          padding: '0px 18px 18px',
          overflow: 'visibile'
        }
    };

    let review;
    if(sessionUser) {
        const userReview = reviews.filter(review => review.user_id === sessionUser.id)
        review = userReview[0]
    }

    if (!reviews) return null


    return (
        <div className='reviews-container'>
            <h2 className='review-title'>Reviews</h2>
            {!sessionUser && !reviews.length && (
                <h3>Looks like there are no reviews... sign in to start us off!</h3>
            )}
            {!reviews.length && sessionUser && (
                 <>
                    <h3>Be the first to leave a review</h3>
                 </>
                )}
            {sessionUser && (
            <>
                {review ? (
                    <>
                        <button className='write-review-btn' onClick={oneReview}> Write a review</button>
                        <Modal isOpen={showReviewEditForm} style={formStyles}>
                            <button className="close_review_btn" onClick={closeReviewEditForm}>X</button>
                            <EditReviewForm setTrigger={setShowReviewEditForm}/>
                        </Modal>
                    </>
                ) : (
                    <>
                        <button className='write-review-btn' onClick={openReviewForm}> Write a review</button>
                        <Modal isOpen={showReviewForm} style={formStyles}>
                            <button className="close_review_btn" onClick={closeReviewForm}>X</button>
                            <ReviewForm setTrigger={setShowReviewForm}/>
                        </Modal>
                    </>
                )}
            </>
            )}
            {reviews.map(review => {
                return (
                    <div className='review-container' key={review.id}>
                        <div className='rating-div'>
                        {review.rating === 1 && (
                            <>
                                <FaStar color="#222"/>
                                <FaStar color="#e4e5e9"/>
                                <FaStar color="#e4e5e9"/>
                                <FaStar color="#e4e5e9"/>
                                <FaStar color="#e4e5e9"/>
                            </>
                            )}
                        {review.rating === 2 && (
                            <>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#e4e5e9"/>
                                <FaStar color="#e4e5e9"/>
                                <FaStar color="#e4e5e9"/>
                            </>
                            )}
                        {review.rating === 3 && (
                            <>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#e4e5e9"/>
                                <FaStar color="#e4e5e9"/>
                            </>
                            )}
                        {review.rating === 4 && (
                            <>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#e4e5e9"/>

                            </>
                            )}
                        {review.rating === 5 && (
                            <>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                            </>
                            )}
                        </div>
                        <div className='review-div'>{review.comment}</div>
                        {/* <img src={`${review.user.profile_pic}`}></img> */}
                        <div className='review-user-div'>{review.user.first_name} {review.user.last_name}</div>
                        <div>
                        {sessionUser?.id === review.user_id && (
                            <>
                                <button className='edit-review'  onClick={openReviewEditForm}>Edit Review</button>
                                    <Modal isOpen={showReviewEditForm} style={formStyles}>
                                        <button className="close_review_btn" onClick={closeReviewEditForm}>X</button>
                                        <EditReviewForm setTrigger={setShowReviewEditForm}/>
                                    </Modal>
                                <button className='delete-review-button'
                                    onClick={() => dispatch(thunkDeleteReview(review.id))}>
                                    Delete review  <i className="fa-solid fa-delete-left"></i>
                                </button>
                            </>
                        )}
                        </div>
                    </div>
                )
            })}
        </div>

    )

}
