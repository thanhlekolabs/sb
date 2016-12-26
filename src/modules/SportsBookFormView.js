const {Translate, I18n} = ReactReduxI18n
import HeaderFormView from 'modules/header/HeaderFormView'
import BalanceFormView from 'modules/balance/BalanceFormView'
import DashboardFormView from 'modules/dashboard/DashboardFormView'
import OddsFormView from 'modules/odds/OddsFormView'
import FooterFormView from 'modules/footer/FooterFormView'
class SportsBookFormView extends React.Component {
	_onGetDataBalance(){
	}
	_onExpand(){
		$(this.refs.expandContent).slideToggle()
        this._changeIcon()
	}
	_changeIcon() {
        let oldClass = $(this.refs.expandIcon).attr('class')
        let icons = ['fa fa-plus', 'fa fa-minus']
        let indexOldClass = icons.indexOf(oldClass)
        indexOldClass++
        let newClass = icons[indexOldClass%icons.length]
        setTimeout(()=>{
            $(this.refs.expandIcon).removeClass(oldClass)
            $(this.refs.expandIcon).addClass(newClass)
        }, 250)
    }
	render(){
		return (
			<div>
				<HeaderFormView />
				<main>
			        <div className="container">
			            <div className="row">
			                <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
			                	<BalanceFormView />
			                	<br/>
			                	<DashboardFormView />
			                </div>
			                <OddsFormView />
			            </div>
			        </div>
			    </main>
			    <FooterFormView />
			</div>
			)
	}
}
export default SportsBookFormView