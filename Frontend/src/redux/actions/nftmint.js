


import ActionTypes from './actionTypes' ;
import axios from 'axios';
import { getItem } from '../../utils/helper';
import * as config from '../../static/constants';

export const NFTMint = (data, account) => async dispatch => {
    try {
        const header = {
            headers: { 
                Authorization: `Bearer `+ getItem('access_token'),
                wallet_address: account
            }
        };
        let res = await axios.post(`${config.BACKEND_API_URL}nftmint`, data, header);

        if(res.status === 200){
            dispatch({
                type: ActionTypes.NFTMint,
                payload: res.data
            });
        } 
    } catch (err) {
        dispatch({
            type: ActionTypes.NFTMintError,
        });
    }
}

export const GetAllNFTs = () => async dispatch => {
    try {
        let res = await axios.get(`${config.BACKEND_API_URL}nftmint`);

        if(res.status === 200){
            dispatch({
                type: ActionTypes.GetAllNFTs,
                payload: res.data.data
            });
        }
    } catch (err) {
        dispatch({
            type: ActionTypes.GetAllNFTsError,
        });
    }
}

export const GetNFT = (id) => async dispatch => {
    try {
        let res = await axios.get(`${config.BACKEND_API_URL}nftmint/${id}`);

        if(res.status === 200){
            dispatch({
                type: ActionTypes.GetNFT,
                payload: res.data.data
            });
        }
    } catch (err) {
        dispatch({
            type: ActionTypes.GetNFTError,
        });
    }
}

export const SetIsMinting = () => async dispatch => {
    dispatch({
        type: ActionTypes.SetIsMinting
    });
}

export const SetIsFetching = () => async dispatch => {
    dispatch({
        type: ActionTypes.SetIsFetching
    });
}

export const FormatMessage = () => async dispatch => {
    dispatch({
        type: ActionTypes.FormatMessage
    });
}