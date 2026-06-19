const initialState = {
  characters: [],
  totalPages: 0,
};

export const characterReducer = (state = initialState, action) => {
  if (action.type === "GET_ALL_CHARACTERS") {
    return {
      ...state,
      characters: action.payload.data,
      totalPages: action.payload.totalPages,
    };
  }
  return state;
};
