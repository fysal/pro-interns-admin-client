import * as api from "../api";
import { GET_ALL_EMPLOYERS, SERVER_ERROR } from "../constants";

export const getAllEmployers = () => async (dispatch) => {
  try {
    await api
      .getAllEmployer()
      .then(({ data }) => {
        dispatch({ type: GET_ALL_EMPLOYERS, payload: data.result });
      })
      .catch((error) => dispatch({ type: SERVER_ERROR, payload: error }));
  } catch (error) {
    console.lod(error);
  }
};
