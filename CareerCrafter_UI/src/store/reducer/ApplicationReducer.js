const initialState = {
  applications: [],
};

export const applicationReducer = (state = initialState, action) => {
  if (action.type === "GET_ALL_APPLICATIONS") {
    return {
      ...state,
      applications: action.payload,
    };
  }

  return state;
};
