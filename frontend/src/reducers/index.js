import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import jokesReducer from './jokesReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    jokes: jokesReducer,
});