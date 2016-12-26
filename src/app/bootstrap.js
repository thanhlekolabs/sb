import {createHistory} from 'history';
import reduxThunk from 'redux-thunk';

import reducers from 'app/reducers';
import loggerMiddleware from 'common/middlewares/logger';

axios.defaults.baseURL = Config.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const customHistory = ReactRouter.useRouterHistory(createHistory)({
	basename: Config.DEFAULT_FOLDER
});

const routingMiddleware = ReactRouterRedux.routerMiddleware(customHistory);
const createStoreWithMiddleware = Redux.applyMiddleware(reduxThunk, routingMiddleware,loggerMiddleware)(Redux.createStore);
const store = createStoreWithMiddleware(reducers);
const history = ReactRouterRedux.syncHistoryWithStore(customHistory, store);

import translationObject from 'lang';

ReactReduxI18n.syncTranslationWithStore(store);
store.dispatch(ReactReduxI18n.loadTranslations(translationObject));
store.dispatch(ReactReduxI18n.setLocale('en'));

import routes from 'app/routes';
const Provider = ReactRedux.Provider;
const Router = ReactRouter.Router;

//PHAI SUA
if(localStorage.getItem('token')){
	const token = localStorage.getItem('token');
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			{routes}
		</Router>
	</Provider>
, document.getElementById('app'));