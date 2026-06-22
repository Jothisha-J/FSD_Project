const initialState = {
  jobs: [],
};

export const jobReducer = (state = initialState, action) => {
  if (action.type === "GET_ALL_JOBS") {
    return {
      ...state,
      jobs: action.payload,
    };
  }

  return state;
};
