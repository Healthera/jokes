import { SET_JOKES } from '../actions/types';

const initialState = [

];

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_JOKES:
            return [
                ...action.payload
            ]
        default: 
            return state;
    }
}