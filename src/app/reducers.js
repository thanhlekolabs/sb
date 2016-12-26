import userAuthReducer from 'modules/user/reducers/userAuth';

import balance from 'modules/balance/reducers/form'
import dashboard from 'modules/dashboard/reducers/form'
import odds from 'modules/odds/reducers/form'

const rootReducer = Redux.combineReducers({
    userAuthReducer,
    routing: ReactRouterRedux.routerReducer,
    i18n: ReactReduxI18n.i18nReducer,
    balance,
    dashboard,
    odds
});

module.exports = rootReducer;
