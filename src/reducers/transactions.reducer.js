import { GET_ALL_TRANSACTIONS } from "../constants";

const initState = { transactions: null };

const transactionReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    default:
      return state;
  }
};

export default transactionReducer;
