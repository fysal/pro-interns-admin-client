import { GET_ALL_APPLICATIONS } from "../constants";
const initState = { applications: null, count : null };
const applicationsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_APPLICATIONS:
      return { ...state, applications: action.payload, count : action.payload.length };
    default:
      return state;
  }
};

export default applicationsReducer;