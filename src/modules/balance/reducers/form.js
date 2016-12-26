import {
    GET_BALANCE_CUSTOMER,
    BALANCE_LOADING,
    BALANCE_LOADED
} from '../types'
const INITIAL_STATE = {
    data: {
        clientID: 'N/A',
        currency: 'N/A',
        cashBalance: '00.00',
        outstandingTrans: '00.00'
    },
    isLoaded: true
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BALANCE_CUSTOMER:
            return {
                ...state,
                data: action.payload.data,
                isLoaded: action.payload.isLoaded
            }
        case BALANCE_LOADING:
            return {
                ...state,
                isLoaded: action.payload.isLoaded
            }
        case BALANCE_LOADED:
            return {
                ...state,
                isLoaded: action.payload.isLoaded
            }
        default:
            return state
    }
    return state
}
module.exports = Reducer
