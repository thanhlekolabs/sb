import {
    CHANGE_PERIOD_OODS,
    REFRESH_ALL_OODS,
    REFRESH_LEAGUES_OODS,
    GET_DETAIL_ODDS,
    ODDS_CHANGE,
    GET_ODDS,
    ODDS_LOADING,
    ODDS_LOADED,
    CHANGE_SELL_LEVEL_ODDS
}
from '../types'
export const getOdds = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL}odds/get/1/1/0`)
                .then((response) => {
                    resolve()
                    const { Data } = response.data
                    dispatch({
                        type: GET_ODDS,
                        payload: {
                            list: Data
                        }
                    })
                }, (err) => {
                    reject()
                    dispatch({
                        type: GET_ODDS,
                        list: []
                    })
                })
        })
    }
}
export const changePeriod = (period) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_PERIOD_OODS,
            payload: {
                period: period
            }
        })
    }
}
export const refreshAll = () => {
    return (dispatch) => {
        dispatch({
            type: REFRESH_ALL_OODS,
            payload: {
                list: []
            }
        })
    }
}
export const refresLeagues = (leaguesID) => {
    return (dispatch) => {
        dispatch({
            type: REFRESH_LEAGUES_OODS,
            payload: {
                leagues: []
            }
        })
    }
}
export const getDetailOdds = (oddsID) => {
    return (dispatch) => {
        dispatch({
            type: GET_DETAIL_ODDS,
            payload: {
                odds: {}
            }
        })
    }
}
export const oddsChange = (newOdds) => {
    return (dispatch) => {
        dispatch({
            type: ODDS_CHANGE,
            payload: {
                newOdds: newOdds
            }
        })
    }
}
export const oddsLoading = () => {
    return (dispatch) => {
        dispatch({
            type: ODDS_LOADING,
            payload: {
                isLoaded: false
            }
        })
    }
}
export const oddsLoaded = () => {
    return (dispatch) => {
        dispatch({
            type: ODDS_LOADED,
            payload: {
                isLoaded: true
            }
        })
    }
}
export const onChangeSellLevel = (key, value) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_SELL_LEVEL_ODDS,
            payload: {
                level: {
                    key: key,
                    value: value
                }
            }
        })
    }
}
