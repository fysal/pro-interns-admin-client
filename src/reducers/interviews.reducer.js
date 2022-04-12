import { GET_ALL_INTERVIEWS } from "../constants";

const initState = { pending: null, completed: null, cancelled: null, count: null};

const interviewsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_INTERVIEWS:
      return {
        ...state,
        pending: action.payload.filter(
          (interview) => interview.status === "pending"
        ),
        completed : action.payload.filter(interview => interview.status ==="completed"),
        canceled: action.payload.filter(interview => interview.status ==="canceled"),
        count : action.payload.length
      };
    default:
      return state;
  }
};

export default interviewsReducer;