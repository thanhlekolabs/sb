const { Translate, I18n } = ReactReduxI18n
import * as balanceFormActions from 'modules/balance/actions/form'
class BalanceFormView extends React.Component {
    constructor(){
        super()
        this.state = {
            expandTurn: null
        }
    }
    componentDidMount(){
        this.props.getData()
    }
    _onRefresh() {
        this.props.getData()
    }
    _onExpand() {
        $(this.refs.expandContent).slideToggle('slow',()=>{})
        this._changeIcon()
        let isHidden = $(this.refs.expandContent).is(":hidden")
        if (!isHidden === true) {
            let expandNew = setTimeout(()=>{
                let isHidden = $(this.refs.expandContent).is(":hidden")
                if(!isHidden &&
                    this.state.expandTurn==expandNew){
                    $(this.refs.expandContent).slideToggle('slow',()=>{})
                }
            },10000)
            this.setState({
                expandTurn: expandNew
            })
        }
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
    render() {
        const {data, isLoaded} = this.props.balance || {}
        return (
        	<div className="panel">
                <Dimmer isLoaded={isLoaded}>
                    <Loader size="" />
                </Dimmer>
                <div className="panel-heading">
                    USD: {data.cashBalance}
                    <div className="right">
                        <a className="pointer" onClick={event =>{this._onRefresh()}}><i className="fa fa-refresh"></i></a>
                        &nbsp;&nbsp;&nbsp;
                        <a className="pointer" onClick={event =>{this._onExpand()}}><i className="fa fa-plus" ref="expandIcon"></i></a>
                    </div>
                </div>
                <div className="panel-content hide" ref="expandContent">
                    <table className="table table-borderless text-left">
                        <tbody>
                            <tr>
                                <td><Translate value="balance.clientID" />:</td>
                                <td>{data.clientID}</td>
                            </tr>
                            <tr>
                                <td><Translate value="balance.currency" />:</td>
                                <td>{data.currency}</td>
                            </tr>
                            <tr>
                                <td><Translate value="balance.cashBalance" />:</td>
                                <td>{data.cashBalance}</td>
                            </tr>
                            <tr>
                                <td><Translate value="balance.outstandingTrans" />:</td>
                                <td>{data.outstandingTrans}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        	)
    }
}
const mapStateToProps = ({balance}) => {
    return { balance }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...balanceFormActions
    }, dispatch)
}
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(BalanceFormView)
