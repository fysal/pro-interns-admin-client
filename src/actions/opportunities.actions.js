import * as api from "../api";
import { GET_ALL_OPPORTUNITIES, SERVER_ERROR } from "../constants";

export const getAllOpportunities = () => async (dispatch) => {
  try {
    await api
      .getAllOpportunities()
      .then(({ data }) => {
        dispatch({ type: GET_ALL_OPPORTUNITIES, payload: data.result });
      })
      .catch((error) => dispatch({ type: SERVER_ERROR, error }));
  } catch (error) {
    console.log(error);
  }
};
