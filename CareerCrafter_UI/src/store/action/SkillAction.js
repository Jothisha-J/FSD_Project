import axios from "axios";

const skillsApi = "http://localhost:8080/api/skills/all";
const addSkillApi = "http://localhost:8080/api/skills/add";
const deleteSkillApi = "http://localhost:8080/api/skills/delete";

const getConfig = () => ({
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export const getAllSkills = (page = 0, size = 7) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(skillsApi, {
        ...getConfig(),
        params: { page, size },
      });

      console.log("Skills API Response:", response.data);

      dispatch({
        type: "GET_ALL_SKILLS",
        payload: {
          skills: response.data.skillDTOList || [],
          totalElements: response.data.TotalElements || 0,
          totalPages: response.data.TotalPages || 1,
          currentPage: page,
        },
      });
    } catch (error) {
      console.error(
        "Skills fetch error:",
        error.response?.status,
        error.response?.data,
      );
    }
  };
};

export const addSkill = (skillName) => {
  return async (dispatch) => {
    try {
      await axios.post(addSkillApi, { skill_name: skillName }, getConfig());
    } catch (error) {
      console.error(
        "Add skill error:",
        error.response?.status,
        error.response?.data,
      );
      throw error;
    }
  };
};

export const deleteSkill = (id, currentPage = 0) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${deleteSkillApi}/${id}`, getConfig());
      dispatch(getAllSkills(currentPage, 7));
    } catch (error) {
      console.error(
        "Delete skill error:",
        error.response?.status,
        error.response?.data,
      );
    }
  };
};

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
