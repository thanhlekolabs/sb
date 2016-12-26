const { Translate, I18n } = ReactReduxI18n
import * as tabActions from 'modules/dashboard/actions/form'
class DashboardFormView extends React.Component {
    _onChangeTab(tabKey) {
        const { tabs } = this.props.dashboard
        tabs.map((tab, i)=>{
            if(tab.key==tabKey){
                tabs[i].active = true
            }
            else {
                tabs[i].active = false
            }
        })
        this.props.changeTab(tabs)
    }
    _onSelectSports(menuIndex){
        const {menus} = this.props.dashboard
        //close all menu
        menus.map((menu,i)=>{
            let subs = menus[i].sub
            if(subs.length!==0){
                if(i!==menuIndex){
                    subs.map((sub,iS)=>{
                        let subElem = $(this.refs[`menuEventFilter_${i}_${iS}`])
                        let isHidden=subElem.is(":hidden")
                        if(!isHidden){
                            subElem.slideToggle('slow',()=>{})
                        }                            
                    })
                }
            }
        })
        //expand current menu
        let  subs = menus[menuIndex].sub
        if(subs.length!==0){
            subs.map((sub,iS)=>{
                let subElem = $(this.refs[`menuEventFilter_${menuIndex}_${iS}`])
                let isHidden=subElem.is(":hidden")
                if(isHidden){
                    subElem.slideToggle('slow',()=>{})
                }
        })
        }
    }
    _onEventFilter(filter){
        //filter
        //deactive all event filter
        const {menus} = this.props.dashboard || {}
        const sportsIndex = filter.sportsIndex
        const subs = menus[sportsIndex].sub
        subs.map((sub, iS)=>{
            let subElem = $(this.refs[`buttonEventFilter_${sportsIndex}_${iS}`])
            if(subElem){
                subElem.removeClass('active')
            }
        })
        //active current event filter
        var currentElem = filter.event.currentTarget
        $(currentElem).addClass('active')
    }
    render() {
        const { tabs, menus, loading } = this.props.dashboard ? this.props.dashboard : {}
        let typeActive = 1
        tabs.map((tab,i)=>{
            if(tab.active)
                return typeActive = tab.type
        })
        return (
            <div className="box-tab">
                <div className="tab">
                    <div className="tab-heading">
                        {tabs.map((tab, i)=>{
                            if(tab.type!==typeActive){
                                return(
                                <div key={i} 
                                className={`tab-link ' ${(tabs[i].active ? 'active': '')}`} 
                                onClick={event =>{this._onChangeTab(tab.key)}}
                                ref={tab.key}>{I18n.t(`tabs.${tab.key}`)}</div>
                                )
                            }
                        })}
                        {tabs.map((tab, i)=>{
                            if(tab.type===typeActive){
                                return(
                                <div key={i} 
                                className={`tab-link ${(tabs[i].active ? 'active': '')}`} 
                                onClick={event =>{this._onChangeTab(tab.key)}}
                                ref={tab.key}>{I18n.t(`tabs.${tab.key}`)}</div>
                                )
                            }
                        })}
                    </div>
                    <div className="tab-content" ref="pendingBet" style={{display: tabs[0].active?'block': 'none'}}>
                        <div className="box">
                            <p>No bet found in Pending Bet. Please click Bet List to check accepted bets!</p>
                        </div>
                    </div>
                    <div className="tab-content" ref="betList" style={{display: tabs[1].active?'block': 'none'}}>
                        <div className="box">
                            <p>The data you requested is temporarily unavailable.</p>
                        </div>
                    </div>
                    <div className="tab-content" ref="sport" style={{display: tabs[2].active?'block': 'none'}}>
                       <ul className="list-nav">
                        {menus.map((menu, i)=>{
                            return (
                                <li ref={`menuSport_${i}`} key={i}>
                                    <a onClick={event=>{this._onSelectSports(i)}}
                                       className="pointer"><Translate value={`menus.${menu.key}`}/></a>
                                    {menu.sub.map((sub,iS)=>{
                                        return (
                                            <ul ref={`menuEventFilter_${i}_${iS}`} 
                                                key={iS} 
                                                className="menu-child-1"
                                                style={{display: menu.active?'block':'none'}}>
                                                <li>
                                                    <Dimmer isLoaded={sub.key==loading?false:true}>
                                                        <Loader size="" />
                                                    </Dimmer>
                                                    <a onClick={event=>{this._onEventFilter({event: event, key: sub.key, sportsIndex: i})}}
                                                       className={sub.active?'active pointer':'pointer'}
                                                       ref={`buttonEventFilter_${i}_${iS}`}><Translate value={`menus.${sub.key}`}/>
                                                       </a>
                                                </li>
                                            </ul>
                                                )
                                    })}
                                </li>
                                )
                        })}
                        </ul>
                    </div>
                    <div className="tab-content" ref="betSlip" style={{display: tabs[3].active?'block': 'none'}}>
                         <div className="box">
                                <br/>
                                <div>
                                    <a className="right"><i className="fa fa-remove"></i></a>
                                    <a className="button">refresh</a>
                                </div>
                                <br/>
                                <p className="border-bottom-dotted padding-bottom-10">
                                    <span>Soccer</span> <br/>
                                    <span>England - Premier League</span> <br/>
                                    <span>17/12/2016 22:10</span>
                                    <span>Match - Handicap (LIVE)</span>
                                </p>
                                <br/>
                                <p>
                                    <span className="bold text-blue">Middl­esbro­ugh</span>
                                    -vs-
                                    <span className="bold text-accent">Swans­ea Ci­ty</span>
                                </p>
                                <br/>
                                <div className="box bg-light-red padding-10 font-medium">
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-right">Total:</div>
                                        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8"> 2.5  [1-0]</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-right text-red">Under:</div>
                                        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8"> @ 2.240</div>
                                        <div className="clear"></div>
                                    </div>
                                </div>
                                <div className="margin-top-20 margin-bottom-10 text-right">
                                    <span className="radio padding-right-20">
                                        <input type="radio" name="risk_win" id="risk" value="risk" />
                                        <label htmlFor="risk">Rick</label>
                                    </span>
                                    <span className="radio">
                                        <input type="radio" name="risk_win" id="win" value="win" />
                                        <label htmlFor="win">Win</label>
                                    </span>
                                </div>
                                <br/>
                                <div className="">
                                    <b>Stake = USD</b>
                                    <input type="text" size="10" />
                                </div>
                                <div className="margin-top-20 margin-bottom-10">
                                    <div className="checkbox padding-right-20">
                                        <input type="checkbox" id="bet_max" />
                                        <label htmlFor="bet_max">Bet Maximum</label>
                                    </div>
                                    <div className="checkbox margin-top-10">
                                        <input type="checkbox" id="alway" />
                                        <label htmlFor="alway">Always accept better lines</label>
                                    </div>
                                </div>
                            </div>
                        <a className="button button-large button-block button-success">place bet</a>
                        <div className="margin-top-10 padding-10">
                            <table style={{width:100}}>
                                <tbody>
                                    <tr>
                                        <td width="130px" className="padding-bottom-10">Max Payout</td>
                                        <td className="padding-bottom-10"><b>USD 2,090.00</b></td>
                                    </tr>
                                    <tr>
                                        <td width="100px" className="padding-bottom-10">Min Win</td>
                                        <td className="padding-bottom-10"><b>USD 1.00</b></td>
                                    </tr>
                                    <tr>
                                        <td width="100px" className="padding-bottom-10">Max Win</td>
                                        <td className="padding-bottom-10"><b>USD 1,000.00</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ dashboard }) => {
    return { dashboard }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...tabActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DashboardFormView)
