const GET_ALL_REVIEWS = 'review/getAllReviews'
const CREATE_REVIEW = 'review/createReview'
const DELETE_REVIEW = 'review/deleteReview'
const EDIT_REVIEW = 'review/editReview'

export const actionGetAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
}

export const actionCreateReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export const actionDeleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const actionEditReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

export const thunkGetAllReviews = (id) => async dispatch => {
    const response = await fetch(`/api/snacks/${id}/reviews`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetAllReviews(data.reviews));
        return data.reviews;
    }
}

export const thunkCreateReview = (id, review) => async dispatch => {
    const response = await fetch(`/api/snacks/${id}/reviews/new`, {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(review)
    })

    if(response.ok) {
        const data = await response.json();
        dispatch(actionCreateReview(data));
        return data;
    }
}

export const thunkDeleteReview = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}/delete`, {
        method: 'DELETE',
    })

    if (response.ok) {
        const deletedReview = await response.json();
        dispatch(actionDeleteReview(id));
        return deletedReview
    }
}

export const thunkEditReview = (review) => async dispatch => {
    const response = await fetch(`/api/reviews/${review.id}/edit`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const editedReview = await response.json();
        dispatch(actionEditReview(editedReview));
        return editedReview
    }
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_ALL_REVIEWS:
            newState = {};
            action.reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState;

        case CREATE_REVIEW:
            newState[action.review.id] = action.review
            return newState

        case DELETE_REVIEW:
            delete newState[action.reviewId]
            return newState

        case EDIT_REVIEW:
            newState[action.review.id] = action.review
            return newState

        default:
            return state;
    }
}


export default reviewsReducer;
