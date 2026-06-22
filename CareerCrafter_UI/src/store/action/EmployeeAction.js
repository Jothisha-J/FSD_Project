import axios from "axios";

const getAllApi = "http://localhost:8080/api/employee/all";
const deleteApi = "http://localhost:8080/api/employee/delete";

export const getAllEmployees = () => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const response = await axios.get(getAllApi, config);
      dispatch({
        type: "GET_ALL_EMPLOYEES",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error:", error.response?.status, error.response?.data);
    }
  };
};

export const deleteEmployee = (email) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      await axios.delete(deleteApi + "/" + email, config);
      dispatch({
        type: "DELETE_EMPLOYEE",
        payload: email,
      });
    } catch (error) {
      console.error(
        "Delete error:",
        error.response?.status,
        error.response?.data,
      );
    }
  };
};
