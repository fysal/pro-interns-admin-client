import { GET_ALL_SHORTLISTS } from "../constants";

const initState = { shortlists: null, count: null };

const shortlistReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_SHORTLISTS:
      return { ...state, shortlist: action.payload, count : action.payload.length };
    default:
      return { ...state };
  }
};

export default shortlistReducer;
