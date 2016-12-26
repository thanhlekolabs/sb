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
const INITIAL_STATE = { list: [], isLoaded: true, period: 0, level: {} }
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_PERIOD_OODS:
            return {
                ...state,
                period: action.payload.period
            }
        case REFRESH_LEAGUES_OODS:
            return {
                ...state,
                leagues: action.payload.leagues
            }
        case REFRESH_ALL_OODS:
            return {
                ...state,
                list: action.payload.list
            }
        case GET_DETAIL_ODDS:
            return {
                ...state,
                odds: action.payload.odds
            }
        case ODDS_CHANGE:
            return {
                ...state,
                newOdds: action.payload.newOdds
            }
        case GET_ODDS:
            return {
                ...state,
                list: (action && action.payload && action.payload.list)?
                        action.payload.list:
                        []
            }
        case ODDS_LOADING:
            return {
                ...state,
                isLoaded: action.payload.isLoaded
            }
        case ODDS_LOADED:
            return {
                ...state,
                isLoaded: action.payload.isLoaded
            }
        case CHANGE_SELL_LEVEL_ODDS:
            return {
                ...state,
                level: action.payload.level
            }
        default:
            return state
    }
    return state
}
export default Reducer
