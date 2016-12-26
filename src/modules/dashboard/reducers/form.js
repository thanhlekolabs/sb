import {
    CHANGE_TAB,
    CHANGE_MENU,
    MENU_LOADING,
    MENU_LOADED
}
from '../types'
const INITIAL_STATE = {
    loading: 'live',
    tabs: [{
        key: 'pendingBet',
        type: 1,
        active: false
    }, {
        key: 'betList',
        type: 1,
        active: false
    }, {
        key: 'sports',
        type: 2,
        active: true
    }, {
        key: 'betSlip',
        type: 2,
        active: false
    }],
    menus: [{
        key: 'soccer',
        active: true,
        sub: [{
            key: 'live',
            active: true
        }, {
            key: 'today',
            active: false
        }, {
            key: 'earlyMarket',
            active: false
        }]
    }]
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_TAB:
            return {
                ...state,
                tabs: action.payload
            }
        case CHANGE_MENU:
            return {
                ...state,
                menus: action.payload
            }
        case MENU_LOADING:
            return {
                ...state,
                loading: action.payload.loading
            }
        case MENU_LOADED:
            return {
                ...state,
                loading: action.payload.loading
            }
        default:
            return state
    }
    return state
}
export default Reducer
