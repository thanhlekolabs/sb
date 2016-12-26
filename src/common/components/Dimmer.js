class Dimmer extends React.Component{
	render(){
		const {isLoaded} = this.props
		return (
				<div className="dimmer" style={{display: isLoaded?'none':'block'}}>
					{this.props.children}
				</div>
			)
	}
}
module.exports = Dimmer