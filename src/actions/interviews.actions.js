import * as api from '../api';
import { GET_ALL_INTERVIEWS } from '../constants';

export const getAllInterviews = () => async dispatch => {

    try{
        await api.getAllInterviews().then(({data})=>{
            dispatch({ type: GET_ALL_INTERVIEWS, payload: data.result})
        });

    }catch( error) {
        console.log( error );
    }
}
