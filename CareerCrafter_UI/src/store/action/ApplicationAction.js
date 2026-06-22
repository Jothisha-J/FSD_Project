import axios from "axios";

const getAllApplicationsApi = "http://localhost:8080/api/application/all";

export const getAllApplications = () => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const response = await axios.get(getAllApplicationsApi, config);
      dispatch({
        type: "GET_ALL_APPLICATIONS",
        payload: response.data,
      });
    } catch (error) {
      console.error(
        "Applications fetch error:",
        error.response?.status,
        error.response?.data,
      );
    }
  };
};
