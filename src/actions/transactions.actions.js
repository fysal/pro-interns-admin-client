import * as api from '../api';
import { GET_ALL_TRANSACTIONS, SERVER_ERROR} from '../constants';

export const getAllTransactions = () => async dispatch => {
    try {
       
        await api.getAllTransactions().then(({ data })=> {
            dispatch({ type : GET_ALL_TRANSACTIONS, payload: data.result})
        }).catch(error => dispatch({ type:SERVER_ERROR, payload: error}))
        
    } catch (error) {
        console.log( error )
    }
}