const {Translate, I18n} = ReactReduxI18n;

const customStyles = {
	content : {
    	top                   : '50%',
    	left                  : '50%',
    	right                 : 'auto',
    	bottom                : 'auto',
    	marginRight           : '-50%',
    	transform             : 'translate(-50%, -50%)'
  	},
  	overlay: {
  		backgroundColor: 'rgba(0, 0, 0, 0.5)'
  	}
};

class ConfirmModal extends React.Component{
	render(){
		return (
			<ReactModal
				isOpen={this.props.modal}
				style={customStyles}
				onRequestClose={this.props.onRequestClose}
          		closeTimeoutMS={150}
          		contentLabel="">
          		<Segment theme="basic">
          			<p>{this.props.message}</p>
          			<Button theme="red" onClick={this.props.onAccept}><Translate value="application.button.yes"/></Button>
          			<Button onClick={this.props.onRequestClose}><Translate value="application.button.no"/></Button>
          		</Segment>
			</ReactModal>
		);
	};
};

module.exports = ConfirmModal;