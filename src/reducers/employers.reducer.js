import { GET_ALL_EMPLOYERS } from "../constants";

const initState = { employers : null, count : null};

const employerReducer = ( state= initState, action) => {
switch(action.type){

    case GET_ALL_EMPLOYERS : return {...state, employers : action.payload, count : action.payload.length}
    default : return state
}
}

export default employerReducer;