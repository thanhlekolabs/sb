const {Translate, I18n} = ReactReduxI18n
class HeaderFormView extends React.Component {
	render(){
		return (
			<header>
		        <div className="container">
		            <div className="row">
		                <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
		                    <div className="logo">
		                        Sports<span className="text-accent">book</span>
		                    </div>
		                </div>
		                <div className="col-xs-12 col-sm-8 col-md-9 col-lg-9">
		                    <ul className="menu-top">
		                        <li><a><Translate value="headers.news"/></a></li>
		                        <li><a><Translate value="headers.betList"/></a></li>
		                        <li><a><Translate value="headers.betListFull"/></a></li>
		                        <li><a><Translate value="headers.statement"/></a></li>
		                        <li><a><Translate value="headers.casino"/></a></li>
		                        <li><a><Translate value="headers.liveCasino"/></a></li>
		                        <li><a><Translate value="headers.cashier"/></a></li>
		                        <li><a><Translate value="headers.teasers"/></a></li>
		                        <li><a><Translate value="headers.outrights"/></a></li>
		                        <li>
		                        	<a>
			                        	<Translate value="headers.linkMore"/>
			                        	<i className="fa fa-caret-down"></i>
		                        	</a>
                            	<ul>
                                <li><a className="pointer">Rules</a></li>
                                <li><a className="pointer">Settings</a></li>
                                <li><a className="pointer">Results</a></li>
                            </ul>
		                        </li>
		                    </ul>
		                    <br/>
		                    <div className="text-right">
		                        <span className="padding-right-10 bold">
		                            <i className="fa fa-envelope"></i> (0)
		                        </span>
		                        <span className="padding-right-10 bold"><Translate value="authentication.welcome" />, EW832838</span>
		                        <select className="select">
		                            <option value="">English (International)</option>
		                        </select>
		                        <a className="button button-primary"><Translate value="authentication.logout" /></a>
		                    </div>
		                </div>
		                <div className="clear"></div>
		            </div>
		        </div>
		    </header>
			)
	}
}
module.exports = HeaderFormView