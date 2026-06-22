import axios from "axios";

const getAllJobSeekersApi = "http://localhost:8080/api/user/all";

export const getAllJobSeekers = () => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const response = await axios.get(getAllJobSeekersApi, config);
      dispatch({
        type: "GET_ALL_JOBSEEKERS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error:", error.response?.status, error.response?.data);
    }
  };
};
