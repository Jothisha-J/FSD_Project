const initialState = {
  skills: [],
  totalElements: 0,
  totalPages: 1,
  currentPage: 0,
};

export const skillReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_SKILLS":
      return {
        ...state,
        skills: action.payload.skills,
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };

    default:
      return state;
  }
};
