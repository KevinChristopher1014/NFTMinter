
import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    nft: {},
    nfts: [],
    error: {},
    message : "" ,
    isMinting : false,
    isFetching : false
}

export default ( state={INITIAL_STATE} , action={} ) => {
    switch(action.type) {
        case (ActionTypes.GetAllNFTs):
            return ({
                ...state,
                nfts: action.payload,
                isFetching: false
            });
        case (ActionTypes.GetAllNFTs):
            return ({
                ...state,
                isFetching: false
            });
        case (ActionTypes.GetNFT):
            return ({
                ...state,
                nft: action.payload
            });
        case ActionTypes.NFTMint:
            return ({
                ...state,
                isMinting: false,
                message: "success"
            });
        case ActionTypes.NFTMintError:
            return ({
                ...state,
                isMinting: false,
                message: "error"
            });
        case ActionTypes.SetIsMinting:
            return ({
                ...state,
                isMinting: true
            })
        case ActionTypes.SetIsFetching:
            return ({
                ...state,
                isFetching: true
            })
        case ActionTypes.FormatMessage:
            return ({
                ...state,
                message: ""
            })
        default:
            return state;
    }
}