import { GET_ALL_OPPORTUNITIES } from "../constants";

const initState = { allOpportunities: null, count: null };

const OpportunitiesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_OPPORTUNITIES:
      return { ...state, allOpportunities: action.payload, count: action.payload.length };

    default:
      return { ...state };
  }
};

export default OpportunitiesReducer;
