import axios from "axios";

const getAllJobsApi = "http://localhost:8080/api/jobpost/all";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};
export const getAllJobs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(getAllJobsApi, config);

      dispatch({
        type: "GET_ALL_JOBS",
        payload: response.data,
      });
    } catch (error) {
      console.error(
        "Jobs fetch error:",
        error.response?.status,
        error.response?.data,
      );
    }
  };
};
