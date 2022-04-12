import * as api from "../api";
import { GET_ALL_APPLICATIONS, SERVER_ERROR } from "../constants";

export const getAllApplications = () => async (dispatch) => {
  try {
    await api
      .getAllApplications()
      .then(({ data }) => {
        dispatch({ type: GET_ALL_APPLICATIONS, payload: data.result });
      })
      .catch((error) => dispatch({ type: SERVER_ERROR, error }));
  } catch (error) {
    console.log(error);
  }
};
