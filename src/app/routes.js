import App from 'app/App'
import Backend from 'app/Backend'
import UserFormSignIn from 'modules/user/UserFormSignIn'

import SportsBookFormView from 'modules/SportsBookFormView'
const {Route, IndexRoute} = ReactRouter

import AuthHoc from 'common/hoc/Auth'

const routes = (
	<Route component={App}>
		<Route component={UserFormSignIn} path="/login"/>
		<Route component={AuthHoc(Backend)}>
			<IndexRoute component={SportsBookFormView}/>
			<Route component={SportsBookFormView} path={Routes.sports.view} />
		</Route>
	</Route>
)

module.exports = routes