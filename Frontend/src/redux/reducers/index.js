import  { combineReducers } from 'redux' ;

import authReducer from './auth' ;
import nftmintReducer from './nftmint';

export default combineReducers({
    auth : authReducer,
    nftmint : nftmintReducer
})