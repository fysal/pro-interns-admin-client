import * as api from "../api";
import { GET_ALL_SUBSCRIPTION_PLANS, SERVER_ERROR } from "../constants";

export const getAllSubscriptionPlans = () => async (dispatch) => {
  try {
    await api
      .getAllSubscriptionPlans()
      .then(({ data }) => {
        dispatch({ type: GET_ALL_SUBSCRIPTION_PLANS, payload: data.result });
      })
      .catch((error) => dispatch({ type:SERVER_ERROR, error }));
  } catch (error) {
    console.log(error);
  }
};
