import axios from 'axios';
import { SET_JOKES, GET_ERRORS } from './types';

export const getJokes = () => dispatch => {
    axios.get('/api/jokes')
        .then(res => {
            dispatch({
                type: SET_JOKES,
                payload: res.data
            });
        })
        .catch(err => {});
}

export const addJoke = (joke) => dispatch => {
    axios.post('/api/jokes', joke)
        .then(res => {
            getJokes()(dispatch);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
}

export const updateJoke = (joke) => dispatch => {
    axios.put('/api/jokes/' + joke.id, joke)
        .then(res => {
            getJokes()(dispatch);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
}

export const deleteJoke = (id) => dispatch => {
    axios.delete('/api/jokes/' + id)
        .then(res => {
            getJokes()(dispatch);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
}

