const {Translate, I18n} = ReactReduxI18n;

class UserFormSignIn extends React.Component{
	componentWillMount(){
		$('body').addClass('login');
	}
	componentWillUnmount(){
		$('body').removeClass('login');
	}
  componentDidMount(){
    KeyboardJS.bind('enter', (event) => {
      const email = $('#email').val();
      const password = $('#password').val();
      axios.post(`${Config.DEFAULT_URL}auth/login`, {email, password})
      .then((response) => {
        localStorage.setItem('token', response.data.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
        this.props.push(Routes.dashboard.view);
      })
      .catch((response) => {
        alert('Email hay pass sai');
      })  
    });
  }
  _onLogin(){
    const email = $('#email').val();
    const password = $('#password').val();
    axios.post(`${Config.DEFAULT_URL}auth/login`, {email, password})
    .then((response) => {
      localStorage.setItem('token', response.data.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
      this.props.push(Routes.dashboard.view);
    })
    .catch((response) => {
      alert('Email hay pass sai');
    })
  }
	render(){
		return (
			<Grid theme="middle aligned center aligned">
  				<Column>
  					<Header theme="huge image">
  						<Content>
  							<Translate value="signIn.title"/>&nbsp;<Translate value="application.name"/>
  						</Content>
  					</Header>
  					<Form theme="large">
  						<Segment theme="stacked">
  							<Field>
  								<Input theme="left icon">
  									<Icon theme="user"/>
  									<input type="text" placeholder={I18n.t('application.field.email')} id="email"/>
  								</Input>
  							</Field>
  							<Field>
  								<Input theme="left icon">
  									<Icon theme="lock"/>
  									<input type="password" placeholder={I18n.t('application.field.password')} id="password"/>
  								</Input>
  							</Field>
  							<Button theme="fluid large black submit" onClick={this._onLogin.bind(this)}>
  								<Translate value="signIn.button"/>
  							</Button>
  						</Segment>
  					</Form>
  				</Column>
  			</Grid>
		);
	};
};

const mapStateToProps = ({userAuth}) => {
  return {userAuth};
};

const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators({
    ...ReactRouterRedux.routerActions
  }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UserFormSignIn);