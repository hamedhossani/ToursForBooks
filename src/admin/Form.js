import React, {
    Component,
    createRef
  } from 'react';
  import PropTypes from 'prop-types';
  import { auth } from './firebase/index';
  import TextField from '@material-ui/core/TextField';
  import { withStyles } from '@material-ui/core/styles';
  import {connect} from "react-redux";
  
  class Form extends Component {
    constructor(props) {
      super(props);
  
      this.email = createRef();
      this.password = createRef();
      this.handleSuccess = this.handleSuccess.bind(this);
      this.handleErrors = this.handleErrors.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this); 
      this.handleChangeEmail = this.handleChangeEmail.bind(this); 
    }
  
    handleSuccess() {
      this.resetForm();
      this.props.onSuccess && this.props.onSuccess();
    }
  
    handleErrors(reason) {
      this.props.onError && this.props.onError(reason);
    }
  
    handleSubmit(event) {
      event.preventDefault();

      this.email = this.state.email;
      this.password = this.state.password;

      const {
        email,
        password,
        props: { action }
      } = this; 

      auth.userSession(
        action,
        email,
        password
      ).then(this.handleSuccess).catch(this.handleErrors);
    }
  
    resetForm() {
      if (!this.email.current || !this.password.current) { return }
      const { email, password } = Form.defaultProps;
      this.email.current.value = email;
      this.password.current.value = password;
    }
  handleChangeEmail (event) {
    this.setState({
      ['email']: event.target.value,
    });
  };
  handleChangePassword (event) {
    this.setState({
      ['password']: event.target.value,
    });
  };
 
    render() {
      return (
        <form onSubmit={this.handleSubmit} className="col s12">
          <div className="row">
            <h1>{this.props.title}</h1>

            <div className="input-field col s6">
              <TextField 
                label="Email" 
                type="email"
                name="email" 
                onChange={this.handleChangeEmail}
              />
            </div>
            <div className="input-field col s6">
            <TextField 
                label="Password" 
                type="password"
                name="password" 
                onChange={this.handleChangePassword}
              />
            </div>          
          
            <button type="submit" color="primary" >Submit</button>
          </div>
        </form>
      )
    }
  }
  
  Form.propTypes = {
    title: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func
  }
  
  Form.defaultProps = {
    errors: '',
    email: '',
    password: ''
  }
  const mapStateToProps = (state, props) => {
    const {email ,password}  = state ;
    return { 
      email ,
      password 
    }; 
  }
  export default connect(mapStateToProps)(Form);