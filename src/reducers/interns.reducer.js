import { GET_ALL_INTERNS} from '../constants';

const initState = { interns : null, count: null };

const InternsReducer = ( state= initState, action) => {
switch(action.type){
    case GET_ALL_INTERNS: return {...state, interns : action.payload, count: action.payload.count}
    default : return state;
}
}

export default InternsReducer;