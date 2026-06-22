const initialState = {
  employees: [],
};

export const employeeReducer = (state = initialState, action) => {
  if (action.type === "GET_ALL_EMPLOYEES") {
    return {
      ...state,
      employees: action.payload,
    };
  }

  if (action.type === "DELETE_EMPLOYEE") {
    return {
      ...state,
      employees: state.employees.filter((emp) => emp.email !== action.payload),
    };
  }

  return state;
};
