import { GET_ALL_INTERNS, SERVER_ERROR } from "../constants";

import * as api from "../api";

export const getAllInterns = () => async (dispatch) => {
  try {
    await api
      .getAllInterns()
      .then(({ data }) => {
        dispatch({ type: "GET_ALL_INTERNS", payload: data.result });
      })
      .catch((error) => dispatch({ type: SERVER_ERROR, error }));
  } catch (error) {
    console.log(error);
  }
};
