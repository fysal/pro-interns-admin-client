import * as api from "../api";

import { GET_ALL_SHORTLISTS, SERVER_ERROR } from "../constants";

export const getAllShortlists = () => async (dispatch) => {
  try {
    await api
      .getAllShortlists()
      .then(({ data }) => {
        console.log(data.result);
        dispatch({ type: GET_ALL_SHORTLISTS, payload: data.result });
      })
      .catch((error) => dispatch({ type: SERVER_ERROR, error }));
  } catch (error) {
    console.log(error);
  }
};
