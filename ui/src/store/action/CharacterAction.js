import axios from "axios";

const api = "https://rickandmortyapi.com/api/character/";

export const getAllData = (page) => {
  return async (dispatch) => {
    const response = await axios.get(api + `?page=${page}`);

    const data = response.data.results.map((c) => ({
      id: c.id,
      name: c.name,
      status: c.status,
      species: c.species,
      originName: c.origin?.name,
      locationName: c.location?.name,
    }));

    let action = {
      type: "GET_ALL_CHARACTERS",
      payload: {
        data: data,
        totalPages: response.data.info.pages,
      },
    };

    dispatch(action);
  };
};
