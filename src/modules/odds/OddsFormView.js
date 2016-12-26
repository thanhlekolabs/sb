const {Translate, I18n} = ReactReduxI18n
import * as oddsFormActions from 'modules/odds/actions/form'
import {menuLoading, menuLoaded} from 'modules/dashboard/actions/form'
const oddsConfig = {
    themeHomeTeam: 'bold text-orange text-left',
    themeAwayTeam: 'bold text-blue text-left',
    iconOddsUp: 'fa fa-sort-desc',
    iconOddsDown: 'fa fa-sort-desc',
    oddsPositive: 'text-grey',
    oddsNegative: 'text-red'
}
const periods = [{
    value: [0,2],
    key: 'Match',
    index:0
},{
    value: [1,2],
    key: '1st Half',
    index:1
},{
    value: [2,3],
    key: '2nd Half',
    index: 2
}]
const selectBuySellLevels = [{
    value: 1,
    key: '1Line'
},{
    value: 3,
    key: '3Line'
},{
    value: 5,
    key: '5Line'
},{
    value: 'all',
    key: 'all'
}]
const buySellLevel = {}
class OddsFormView extends React.Component{
    constructor(){
        super()
        this.state = {
            init: false
        }
    }
    _onChangeLanguage(){
        ReactReduxI18n.setTranslations('vi')
    }
    _onExpandMatch(iL){
        const {list} = this.props.odds || {}
        list[iL].Matches.map((m, iM)=>{
            $(this.refs[`subTable_${iL}_${iM}`])
                .toggleClass('active')
        })
        this._onChangeIcon(iL)
    }
    _onChangeIcon(iL){
        let oldClass = $(this.refs[`expandIcon_${iL}`]).attr('class')
        let icons = ['fa fa-chevron-down', 'fa fa-chevron-right']
        let indexOldClass = icons.indexOf(oldClass)
        indexOldClass++
        let newClass = icons[indexOldClass%icons.length]
        setTimeout(()=>{
            $(this.refs[`expandIcon_${iL}`]).removeClass(oldClass)
            $(this.refs[`expandIcon_${iL}`]).addClass(newClass)
        }, 250)
    }
    componentDidMount(){
        this.props.getOdds()
            .then(()=>{
                this.setState({init: true})
                this.props.menuLoaded()
            },()=>{
                this.props.menuLoaded()
            })
    }
    _checkKeyMatch(match){
        return (
            match &&
            match.Id &&
            match.Team1 &&
            match.Team2 &&
            match.IsTeam1Home &&
            match.Start &&
            (!_.isUndefined(match.Status)) &&
            match.Periods
            )
    }
	render() {
        const {list, isLoaded, period, level} = this.props.odds || {}
        const {loading, loaded} = this.props.dashboard || {}
        let keyLevel = level.key
        let valueLevel = level.value
        if(keyLevel &&
            valueLevel){
            buySellLevel[keyLevel] = valueLevel
        }
        let listFilter = []
        _.map(list, (l)=>{
            let pass = false
            if(!_.isEmpty(l) &&
            !_.isEmpty(l.Matches) &&
            _.isArray(l.Matches)){
                _.map(l.Matches,(match) =>{
                    if(!_.isEmpty(match) &&
                        !_.isEmpty(match.Periods) &&
                        _.isArray(match.Periods)){
                        _.map(match.Periods,(per)=>{
                            if(!_.isEmpty(per) &&
                                per.Market==period){
                                pass = true
                            }
                        })
                    }
                })
            }
            if(pass){
                listFilter.push(l)
            }
        })
        let periodValue = _.find(periods, (p)=>{
            return p.index == period
        }).value
        let currentPeriods = _.slice(periods, periodValue[0], periodValue[1])       
		return (
			<div className="col-xs-12 col-sm-8 col-md-9 col-lg-9">
                <div className="box-table">
                        <div className="main-header">    
                            <div className="right">
                                <select className="select" onChange={event =>{
                                    this.props.changePeriod(event.target.value)
                                }}>
                                    {periods.map((per, iP)=>{
                                        return (
                                            <option key={iP} value={per.index} defaultValue="0">
                                                {I18n.t(`odds.period.${per.key}`)}
                                            </option>
                                            )
                                    })}
                                </select>
                            </div>
                            <h3 className="text-white">SOCCER</h3>
                        </div>
                        <div className="sub-header">
                            <span className="right"><a onClick={event =>{this._onChangeLanguage()}} className="buttonRefresh">refresh 21</a></span>
                            <h3 className="">LIVE</h3>
                        </div>
                        <div className="clear"></div>
                        <div className="container-table">
                            <table className="customtable">
                                <thead className="uppercase">
                                    <tr className="bg-primary">
                                        <th rowSpan="2" colSpan="2">Time</th>
                                        <th rowSpan="2" colSpan="2">Event</th>
                                        <th colSpan="6"><Translate value={`odds.period.${(currentPeriods && currentPeriods[0] && currentPeriods[0].key)?currentPeriods[0].key:''}`}/></th>
                                        <th colSpan="6"><Translate value={`odds.period.${(currentPeriods && currentPeriods[1] && currentPeriods[1].key)?currentPeriods[1].key:''}`}/></th>
                                    </tr>
                                    <tr className="bg-primary">
                                        <th colSpan="2">1X2</th>
                                        <th colSpan="2">hdp</th>
                                        <th colSpan="2">o/u</th>
                                        <th colSpan="2">1X2</th>
                                        <th colSpan="2">hdp</th>
                                        <th colSpan="2">o/u</th>
                                    </tr>
                                </thead>                    
                                    {
                                        listFilter.map((league, iL)=>{
                                            return (
                                            <tbody key={iL}>
                                                <tr className="active table-heading 1 bg-accent">
                                                    <td colSpan="10" className="title text-left borderless italic">
                                                        <div><span>{league.Name}</span></div>
                                                    </td>
                                                    <td colSpan="2" className="text-right borderless">
                                                        <select className="select-line margin-top-2"
                                                        onChange={event=>{this.props.onChangeSellLevel(league.Id, event.target.value)}}>
                                                            {selectBuySellLevels.map((buySL, iSL)=>{
                                                                return (
                                                                    <option key={iSL} value={buySL.value} 
                                                                            selected={buySellLevel[league.Id]===buySL.value}>
                                                                        {I18n.t(`odds.buySellLevel.${buySL.key}`)}
                                                                    </option>
                                                                    )
                                                            })}
                                                        </select>
                                                    </td>
                                                    <td colSpan="2" className="borderless">
                                                        <a className="pointer"><i className="fa fa-refresh"></i></a>
                                                    </td>
                                                    <td colSpan="2" className="borderless" >
                                                        <a className="pointer" onClick={event=>{this._onExpandMatch(iL)}}><i ref={`expandIcon_${iL}`} className="fa fa-chevron-down"></i></a>
                                                    </td>
                                                </tr>
                                                {league.Matches.map((match, iM)=>{
                                                    if(this._checkKeyMatch(match)){
                                                        let start = match.Start
                                                        let startDay = moment(start).format('MM/DD')
                                                        let startTime = moment(start).format('HH:mm')
                                                        let isTeam1Home = match.IsTeam1Home
                                                        let team1 = match.Team1
                                                        let team2 = match.Team2
                                                        let status = match.Status
                                                        let periods = []
                                                        periods = _.clone(match.Periods, true)
                                                        //get Spreads or Totals maxlength
                                                        let loopBuySell = []
                                                        let maxLengthBuySell = 1
                                                        if(buySellLevel[league.Id]==='all'){
                                                            let lengthFirstPeriodSpread = 
                                                                (periods &&
                                                                periods[period] &&
                                                                _.isArray(periods[period].Spreads)) ?
                                                                periods[period].Spreads.length:1
                                                            let lengthFirstTotalSpread = 
                                                                (periods &&
                                                                periods[period] &&
                                                                _.isArray(periods[period].Totals))?
                                                                    periods[period].Totals.length:
                                                                    1
                                                            let lengthSecondPeriodSpread = 
                                                                (periods &&
                                                                periods[period+1] &&
                                                                _.isArray(periods[period+1].Spreads)) ?
                                                                periods[period+1].Spreads.length:1
                                                            let lengthSecondTotalSpread = 
                                                                (periods &&
                                                                periods[period+1] &&
                                                                _.isArray(periods[period+1].Totals))?
                                                                    periods[period+1].Totals.length:
                                                                    1
                                                            maxLengthBuySell = Math.max(lengthFirstPeriodSpread,lengthFirstTotalSpread,lengthSecondPeriodSpread,lengthSecondTotalSpread)
                                                        }
                                                        else if(buySellLevel[league.Id]){
                                                            maxLengthBuySell = buySellLevel[league.Id]
                                                        }
                                                        
                                                        for(let i = 0;i<maxLengthBuySell;i++){
                                                            loopBuySell.push(i)
                                                        }
                                                        let mapDefault =[1]
                                                        return loopBuySell.map((val,i)=>{
                                                            //point 1st half
                                                            let pointSpreadHalf1 = (periods && 
                                                                        periods[period] && 
                                                                        periods[period].Spreads &&
                                                                        periods[period].Spreads[i] &&
                                                                        periods[period].Spreads[i].Points) ? periods[period].Spreads[i].Points : null
                                                            let pointSpreadHalf1Home = pointSpreadHalf1?pointSpreadHalf1:null
                                                            let pointSpreadHalf1Away = pointSpreadHalf1?pointSpreadHalf1*-1:null
                                                            let pointTotalHalf1 = (periods && 
                                                                        periods[period] && 
                                                                        periods[period].Totals &&
                                                                        periods[period].Totals[i] &&
                                                                        periods[period].Totals[i].Points) ? periods[period].Totals[i].Points : null
                                                            let pointTotalHalf1Home = pointTotalHalf1?pointTotalHalf1:null
                                                            let pointTotalHalf1Away = pointTotalHalf1?pointTotalHalf1*-1:null
                                                            //point 2nd half
                                                            let pointSpreadHalf2 = (periods && 
                                                                        periods[period] && 
                                                                        periods[period].Spreads &&
                                                                        periods[period].Spreads[i] &&
                                                                        periods[period].Spreads[i].Points) ? periods[period].Spreads[i].Points : null
                                                            let pointSpreadHalf2Home = pointSpreadHalf2?pointSpreadHalf2:null
                                                            let pointSpreadHalf2Away = pointSpreadHalf2?pointSpreadHalf2*-1:null
                                                            let pointTotalHalf2 = (periods && 
                                                                        periods[period] && 
                                                                        periods[period].Totals &&
                                                                        periods[period].Totals[i] &&
                                                                        periods[period].Totals[i].Points) ? periods[period].Totals[i].Points : null
                                                            let pointTotalHalf2Home = pointTotalHalf2?pointTotalHalf2:null
                                                            let pointTotalHalf2Away = pointTotalHalf2?pointTotalHalf2*-1:null
                                                            return (
                                                                <tr ref={`subTable_${iL}_${iM}`} key={`subTable_${iL}_${iM}_${i}`} className="active sub-table">
                                                                    <td colSpan="2">
                                                                        <div><span>{startDay}</span></div>
                                                                        <div><span>{startTime}</span></div>
                                                                    </td>
                                                                    <td colSpan="2">
                                                                        <div className={(pointSpreadHalf1Home && pointSpreadHalf1Home<0)?oddsConfig.themeHomeTeam: oddsConfig.themeAwayTeam}><span>{(team1)?team1:''}</span></div>
                                                                        <div className={(pointSpreadHalf1Away && pointSpreadHalf1Away<0)?oddsConfig.themeHomeTeam: oddsConfig.themeAwayTeam}><span>{(team2)?team2:''}</span></div>
                                                                        {mapDefault.map(()=>{
                                                                            if(!_.isEmpty(periods[period]) &&
                                                                                !_.isEmpty(periods[period].MoneyLine) &&
                                                                                    !_.isEmpty(periods[period].MoneyLine.Draw) &&
                                                                                    i===0){
                                                                            return (
                                                                                <div key={`Draw_Title_${iL}${iM}`} className="bold text-left"><span>Draw</span></div>
                                                                                )
                                                                        }
                                                                        })}
                                                                    </td>
                                                                    <td colSpan="2" className="bg-light-yellow">
                                                                        {
                                                                        periods.map((per, iP)=>{
                                                                            if(!_.isEmpty(per) &&
                                                                                !_.isEmpty(per.MoneyLine) &&
                                                                                per.Market==period){
                                                                            let {Draw, Team1, Team2} = per.MoneyLine
                                                                            let team1Value = (Team1 && Team1.Value)?(Team1.Value>0?`+${Team1.Value}`:Team1.Value):''
                                                                            let team2Value = (Team2 && Team2.Value)?(Team2.Value>0?`+${Team2.Value}`:Team2.Value):''
                                                                            let drawValue = (Draw && Draw.Value)?(Draw.Value>0?`+${Draw.Value}`:Draw.Value):''
                                                                            return (
                                                                                <div key={`MoneyLine_${iL}${iM}`}>
                                                                                    <div key={`team1_${iL}${iM}`}>
                                                                                        <span className={Team1.Value>0?'':oddsConfig.oddsNegative}>
                                                                                            {(team1Value && i==0)?team1Value:''}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div key={`team2_${iL}${iM}`}>
                                                                                        <span className={Team2.Value>0?'':oddsConfig.oddsNegative}>
                                                                                            {(team2Value && i===0)?team2Value:''}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div key={`draw_${iL}${iM}`}>
                                                                                        <span className={Draw.Value>0?'':oddsConfig.oddsNegative}>
                                                                                            {(drawValue && i===0)?drawValue:''}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                            }
                                                                        })
                                                                        }
                                                                    </td>
                                                                    <td colSpan="2" className="bg-light-yellow">
                                                                        {periods.map((per, iP)=>{
                                                                            if(!_.isEmpty(per) &&
                                                                                !_.isEmpty(per.Spreads) &&                                                                                per.Market==period){
                                                                                let {Team1, Team2, Draw} = (!_.isEmpty(per.Spreads) &&
                                                                                                            !_.isEmpty(per.Spreads[i]))?per.Spreads[i]:{}
                                                                                let team1Value = (Team1 && Team1.Value)?(Team1.Value>0?`+${Team1.Value}`:Team1.Value):''
                                                                                let team2Value = (Team2 && Team2.Value)?(Team2.Value>0?`+${Team2.Value}`:Team2.Value):''
                                                                                let drawValue = (Draw && Draw.Value)?(Draw.Value>0?`+${Draw.Value}`:Draw.Value):''
                                                                                return (
                                                                                    <div key={`MoneyLine_${iL}${iM}`}>
                                                                                        <div key={`team1_${iL}${iM}`} className="text-left">
                                                                                            <span className="text-grey">
                                                                                                {pointSpreadHalf1Home?pointSpreadHalf1Home:''}
                                                                                            </span>
                                                                                            <span className={`${Team1&&Team1.Value>0?'':oddsConfig.oddsNegative} right`}>
                                                                                                {team1Value}&nbsp;
                                                                                            </span>
                                                                                        </div>
                                                                                        <div key={`team2_${iL}${iM}`} className="text-left">
                                                                                            <span className="text-grey left">
                                                                                                {pointSpreadHalf1Away?pointSpreadHalf1Away:''}
                                                                                            </span>
                                                                                            <span className={`${Team2&&Team2.Value>0?'':oddsConfig.oddsNegative} right`}>{team2Value}&nbsp;</span>
                                                                                        </div>
                                                                                        <div key={`draw_${iL}${iM}`} className="text-left">
                                                                                            <span className={`${Draw&&Draw.Value>0?'':oddsConfig.oddsNegative} right`}>{drawValue}&nbsp;</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    )
                                                                            }
                                                                        })}
                                                                    </td>
                                                                    <td colSpan="2" className="bg-light-yellow">
                                                                        {periods.map((per, iP)=>{
                                                                            if(!_.isEmpty(per) &&
                                                                                !_.isEmpty(per.Totals) &&                                                                                per.Market==period){
                                                                                let {Team1, Team2} = (!_.isEmpty(per.Totals) &&
                                                                                                      !_.isEmpty(per.Totals[i]))?per.Totals[i]:{}
                                                                                let team1Value = (Team1 && Team1.Value)?(Team1.Value>0?`+${Team1.Value}`:Team1.Value):''
                                                                                let team2Value = (Team2 && Team2.Value)?(Team2.Value>0?`+${Team2.Value}`:Team2.Value):''
                                                                                return (
                                                                                    <div key={`MoneyLine_${iL}${iM}`}>
                                                                                        <div key={`team1_${iL}${iM}`}>
                                                                                            <span className="text-grey left">{pointTotalHalf1Home?pointTotalHalf1Home:''}&nbsp;</span>
                                                                                            <span className="text-grey">o</span>
                                                                                            <span className={`${Team1&&Team1.Value>0?'':oddsConfig.oddsNegative} right`}>{team1Value}&nbsp;</span>
                                                                                        </div> 
                                                                                        <div key={`team2_${iL}${iM}`}>
                                                                                            <span className="text-grey left">{pointTotalHalf1Away?pointTotalHalf1Away:''}&nbsp;</span>
                                                                                            <span className="text-grey">u</span>
                                                                                            <span className={`${Team2&&Team2.Value>0?'':oddsConfig.oddsNegative} right`}>{team2Value}&nbsp;</span>
                                                                                        </div>
                                                                                        <div key={`draw_${iL}${iM}`}>
                                                                                            <span className="left">&nbsp;</span>
                                                                                            <span className="text-grey">&nbsp;</span>
                                                                                            <span className="right">&nbsp;</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    )
                                                                            }
                                                                        })}
                                                                    </td>
                                                                    <td colSpan="2" className="bg-light-yellow">
                                                                        {
                                                                        periods.map((per, iP)=>{
                                                                            if(!_.isEmpty(per) &&
                                                                                !_.isEmpty(per.MoneyLine) &&
                                                                                per.Market==period+1){
                                                                            let {Draw, Team1, Team2} = per.MoneyLine
                                                                            let team1Value = (Team1 && Team1.Value)?(Team1.Value>0?`+${Team1.Value}`:Team1.Value):''
                                                                            let team2Value = (Team2 && Team2.Value)?(Team2.Value>0?`+${Team2.Value}`:Team2.Value):''
                                                                            let drawValue = (Draw && Draw.Value)?(Draw.Value>0?`+${Draw.Value}`:Draw.Value):''
                                                                            return (
                                                                                <div key={`MoneyLine_${iL}${iM}`}>
                                                                                    <div key={`team1_${iL}${iM}`}>
                                                                                        <span className={Team1.Value>0?'':oddsConfig.oddsNegative}>{team1Value}</span>
                                                                                    </div>
                                                                                    <div key={`team2_${iL}${iM}`}>
                                                                                        <span className={Team2.Value>0?'':oddsConfig.oddsNegative}>{team2Value}</span>
                                                                                    </div>
                                                                                    <div key={`draw_${iL}${iM}`}>
                                                                                        <span className={Draw.Value>0?'':oddsConfig.oddsNegative}>{drawValue}</span>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                            }
                                                                        })
                                                                        }
                                                                    </td>
                                                                    <td colSpan="2" className="bg-light-yellow">
                                                                        {periods.map((per, iP)=>{
                                                                            if(!_.isEmpty(per) &&
                                                                                !_.isEmpty(per.Spreads) &&                                                                                per.Market==period+1){
                                                                                let {Team1, Team2, Draw} = (!_.isEmpty(per.Spreads) &&
                                                                                                            !_.isEmpty(per.Spreads[i]))?per.Spreads[i]:{}
                                                                                let team1Value = (Team1 && Team1.Value)?(Team1.Value>0?`+${Team1.Value}`:Team1.Value):''
                                                                                let team2Value = (Team2 && Team2.Value)?(Team2.Value>0?`+${Team2.Value}`:Team2.Value):''
                                                                                let drawValue = (Draw && Draw.Value)?(Draw.Value>0?`+${Draw.Value}`:Draw.Value):''
                                                                                return (
                                                                                    <div key={`MoneyLine_${iL}${iM}`}>
                                                                                        <div key={`team1_${iL}${iM}`} className="text-left">
                                                                                            <span className="text-grey">
                                                                                                {pointSpreadHalf2Home?pointSpreadHalf2Home:''}
                                                                                            </span>
                                                                                            <span className={`${Team1&&Team1.Value>0?'':oddsConfig.oddsNegative} right`}>
                                                                                                {team1Value}&nbsp;
                                                                                            </span>
                                                                                        </div>
                                                                                        <div key={`team2_${iL}${iM}`} className="text-left">
                                                                                            <span className="text-grey">
                                                                                                {pointTotalHalf2Home?pointTotalHalf2Home:''}
                                                                                            </span>
                                                                                            <span className={`${Team2&&Team2.Value>0?'':oddsConfig.oddsNegative} right`}>
                                                                                                {team2Value}&nbsp;
                                                                                            </span>
                                                                                        </div>
                                                                                        <div key={`draw_${iL}${iM}`}>
                                                                                            <span className={`${Draw&&Draw.Value>0?'':oddsConfig.oddsNegative} right`}>{drawValue}&nbsp;</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    )
                                                                            }
                                                                        })}
                                                                    </td>
                                                                    <td colSpan="2" className="bg-light-yellow">
                                                                        {periods.map((per, iP)=>{
                                                                            if(!_.isEmpty(per) &&
                                                                                !_.isEmpty(per.Totals) &&
                                                                                per.Market==period+1){
                                                                                let {Team1, Team2} = (!_.isEmpty(per.Totals) && !_.isEmpty(per.Totals[i])) ? per.Totals[i]: {}
                                                                                let team1Value = (Team1 && Team1.Value)?(Team1.Value>0?`+${Team1.Value}`:Team1.Value):''
                                                                                let team2Value = (Team2 && Team2.Value)?(Team2.Value>0?`+${Team2.Value}`:Team2.Value):''
                                                                                return (
                                                                                    <div key={`MoneyLine_${iL}${iM}`}>
                                                                                        <div key={`team1_${iL}${iM}`}>
                                                                                            <span className="left text-grey">
                                                                                                {pointTotalHalf2Home?pointTotalHalf2Home:''}&nbsp;
                                                                                            </span>
                                                                                            <span className="text-grey">o</span>
                                                                                            <span className={`${Team1&&Team1.Value>0?'':oddsConfig.oddsNegative} right`}>{team1Value}&nbsp;</span>
                                                                                        </div> 
                                                                                        <div key={`team2_${iL}${iM}`}>
                                                                                            <span className="left text-grey">{pointTotalHalf2Away?pointTotalHalf2Away:''}&nbsp;</span>
                                                                                            <span className="text-grey">u</span>
                                                                                            <span className={`${Team2&&Team2.Value>0?'':oddsConfig.oddsNegative} right`}>{team2Value}&nbsp;</span>
                                                                                        </div>
                                                                                        <div key={`draw_${iL}${iM}`}>
                                                                                            <span className="left">
                                                                                                &nbsp;
                                                                                            </span>
                                                                                            <span className="text-grey">&nbsp;</span>
                                                                                            <span className="right">&nbsp;</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    )
                                                                            }
                                                                        })}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                })}
                                            </tbody>
                                                )
                                        })
                                    } 
                                    <tbody ref="noEvent" style={{display:'none'}}>
                                        <tr rowSpan="2">
                                            <td colSpan="16">
                                                <Translate value="odds.noEvent" />
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr style={{height: '40px', display: this.state.init?'none':'block-inline'}}>
                                            <td colSpan="16">
                                                <Loader size="" />
                                            </td>
                                        </tr>
                                    </tbody>
                            </table>
                        </div>
                </div>
			</div>
			)
	}
}
const mapStateToProps = ({odds, dashboard}) =>{
    return {
        odds,
        dashboard
    }
}
const mapDispatchToProps = (dispatch) =>{
    return Redux.bindActionCreators({
        ...oddsFormActions,
        menuLoading,
        menuLoaded
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(OddsFormView)
