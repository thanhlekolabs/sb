import {
    GET_BALANCE_CUSTOMER,
    BALANCE_LOADING,
    BALANCE_LOADED
} from '../types'
export const getData = () => {
    return (dispatch) => {
        dispatch({
            type: BALANCE_LOADING,
            payload: {
                isLoaded: false
            }
        })
        dispatch({
            type: GET_BALANCE_CUSTOMER,
            payload: {
                data: {
                    clientID: 'EW832838',
                    currency: 'USD',
                    cashBalance: '5,000,000,000.00',
                    outstandingTrans: '00.00'
                }
            }
        })
        setTimeout(() => {
                dispatch({
                    type: BALANCE_LOADED,
                    payload: {
                        isLoaded: true
                    }
                })
            },
            500)
    }
}
export const loading = () => {
    return {
        type: BALANCE_LOADING,
        payload: {
            isLoaded: false
        }
    }
}
export const loaded = () => {
    return {
        type: BALANCE_LOADED,
        payload: {
            isLoaded: true
        }
    }
}
