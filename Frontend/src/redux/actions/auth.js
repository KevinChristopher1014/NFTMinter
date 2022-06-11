


import ActionTypes from './actionTypes' ;
import axios from 'axios';
import { setItem } from '../../utils/helper';
import * as config from '../../static/constants';

export const SigninUser = (user, history) => async dispatch => {
    try {
        let res = await axios.post(`${config.BACKEND_API_URL}auth/login`, { ...user });

        setItem('access_token', res.data.token);
        if(res.status === 200){
            dispatch({
                type: ActionTypes.SignInUser,
                payload: res.data
            });
            history('/');
        }
    } catch (err) {
        dispatch({
            type: ActionTypes.SigninUserError,
            payload: err
        });
    }
}

export const RegisterUser = (user, history) => async dispatch => {
    try {
        let res = await axios.post(`${config.BACKEND_API_URL}auth/register`, { ...user });
        
        if(res.status === 200){
            dispatch({
                type: ActionTypes.RegisterUser,
                payload: res.data
            });
            history('/login');
        }
    } catch (err) {
        dispatch({
            type: ActionTypes.RegisterUserError,
            payload: err
        });
    }
}

export const SignOut = (history) => {
    setItem('access_token');
    setItem('user_id');
    window.location.href = "/login";
}