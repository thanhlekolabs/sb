
class Loader extends React.Component{
	render(){
		const {size} = this.props
		return (
				<div className={`loader-gif ${size}`}>
					{this.props.children}
				</div>
			)
	}
}
Loader.defaultProps = {
	size: ''
}
module.exports = Loader