const initialState = {
  jobSeekers: [],
};

export const jobSeekerReducer = (state = initialState, action) => {
  if (action.type === "GET_ALL_JOBSEEKERS") {
    return {
      ...state,
      jobSeekers: action.payload,
    };
  }

  return state;
};
