import { GET_ALL_SUBSCRIPTION_PLANS } from '../constants';
const initState = {plans : null};

const subscriptionReducer = (state = initState, action) => {
    switch(action.type){
        case GET_ALL_SUBSCRIPTION_PLANS: return {...state, plans : action.payload}
        default : return state;
    }
}

export default subscriptionReducer