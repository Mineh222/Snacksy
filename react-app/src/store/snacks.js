const GET_ALL_SNACKS = 'snack/getAllSnacks';
const GET_SINGLE_SNACK = 'snack/getSingleSnack';
const GET_SEARCHED_SNACKS ='snack/getSearchedSnacks';
const GET_CATEGORY = 'snack/getCategory';
const POST_SNACK = 'snack/postSnack';
const EDIT_SNACK = 'snack/editSnack';
const DELETE_SNACK = 'snack/deleteSnack'


export const actionGetAllSnacks = (snacks) => {
    return {
        type: GET_ALL_SNACKS,
        snacks
    }
}

export const actionGetSingleSnack = (snack) => {
    return {
        type: GET_SINGLE_SNACK,
        snack
    }
}

export const actionGetSearchedSnacks = (snacks) => {
    return {
        type: GET_SEARCHED_SNACKS,
        snacks
    }
}

export const actionGetCategory = (snacks) => {
    return {
        type: GET_CATEGORY,
        snacks
    }
}

export const actionPostSnack = (snack) => {
    return {
        type: POST_SNACK,
        snack
    }
}

export const actionEditSnack = (snack) => {
    return {
        type: EDIT_SNACK,
        snack
    }
}

export const actionDeleteSnack = (snackId) => {
    return {
        type: DELETE_SNACK,
        snackId
    }
}

export const thunkGetAllSnacks = () => async (dispatch) => {
    const response = await fetch('/api/snacks/');

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetAllSnacks(data.snacks));
        return data.snacks;
    }
}

export const thunkGetSingleSnack = (id) => async dispatch => {
    const response = await fetch(`/api/snacks/${id}`);

    if (response.ok) {
        const singleSnack = await response.json();
        dispatch(actionGetSingleSnack(singleSnack));
        return singleSnack
    }
}

export const thunkGetSearchedSnacks = (searchword) => async (dispatch) => {
    const response = await fetch(`/api/snacks/search/${searchword}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetSearchedSnacks(data.snacks));
        return data.snacks;
    }
}

export const thunkGetCategory = (category) => async (dispatch) => {
    const response = await fetch(`/api/categories/${category}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetCategory(data.snacks));
        return data.snacks;
    }
}

export const thunkPostSnack = (snack) => async (dispatch) => {
    const response = await fetch('/api/snacks/new', {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(snack),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionPostSnack(data));
        return data;
    }
}

export const thunkEditSnack = (snack) => async dispatch => {
    const response = await fetch(`/api/snacks/${snack.id}/edit`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(snack)
    })

    if (response.ok) {
        const editedSnack = await response.json();
        dispatch(actionEditSnack(editedSnack));
        return editedSnack
    }
}

export const thunkDeleteSnack = (id) => async dispatch => {
    const response = await fetch(`/api/snacks/${id}/delete`, {
        method: 'DELETE',
    })

    if (response.ok) {
        const deletedSnack = await response.json();
        dispatch(actionDeleteSnack(id))
        return deletedSnack
    }
}


const initialState = {};

const snacksReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_ALL_SNACKS:
            newState = {};
            action.snacks.forEach(snack => {
                newState[snack.id] = snack
            });
            return newState;

        case POST_SNACK:
            newState[action.snack.id] = action.snack
            return newState

        case GET_SEARCHED_SNACKS:
            newState = {};
            action.snacks.forEach(snack => {
                newState[snack.id] = snack
            });
            return newState;

        case GET_CATEGORY:
            newState = {};
            action.snacks.forEach(snack => {
                newState[snack.id] = snack
            })
            return newState

        case EDIT_SNACK:
            newState[action.snack.id] = action.snack
            return newState

        case GET_SINGLE_SNACK:
            let singleSnack = {}
            singleSnack[action.snack.id] = action.snack
            return singleSnack

        case DELETE_SNACK:
            delete newState[action.snackId]
            return newState

        default:
            return state;
    }
}


export default snacksReducer;
