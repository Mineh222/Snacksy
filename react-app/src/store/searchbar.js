

const SEARCH_ALL_SNACKS = 'search/searchAllSnacks';


export const actionSearchAllSnacks = (snacks) => {
  return {
      type: SEARCH_ALL_SNACKS,
      snacks
  }
}


export const thunkSearchAllSnacks = () => async dispatch => {
  const response = await fetch(`/api/snacks/`)

  if (response.ok) {
      const data = await response.json();
      dispatch(actionSearchAllSnacks(data.snacks));
      return data.snacks;
  }
}

const initialState = {};
const searchReducer = (state = initialState, action) => {
  let newState = {...state}
  switch(action.type) {
    case SEARCH_ALL_SNACKS:
      newState = {};
      action.snacks.forEach(snack => {
        newState[snack.id] = snack
      })
      return newState;

    default:
      return state;
  }

}

export default searchReducer
