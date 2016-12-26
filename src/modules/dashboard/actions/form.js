import {
    CHANGE_TAB,
    CHANGE_MENU,
    MENU_LOADING,
    MENU_LOADED
}
from '../types'
export const changeTab = (tabs) => {
    return {
        type: CHANGE_TAB,
        payload: tabs
    }
}
export const changeMenu = (menus) => {
    return {
        type: CHANGE_MENU,
        payload: menus
    }
}
export const menuLoading = (key) => {
    return (dispatch) => {
        dispatch({
            type: MENU_LOADING,
            payload: {
                loading: key
            }
        })
    }
}
export const menuLoaded = () => {
    return (dispatch) => {
        dispatch({
            type: MENU_LOADED,
            payload: {
                loading: null
            }
        })
    }
}
