import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import { Consumer } from './AppProvider';

const Login = props => <Consumer>
  {({ state, ...context }) => (
    <div className="container">
      <Form
        action="signIn"
        title="Login"
        onSuccess={() => props.history.push('/admin/dashboard')}
        onError={({ message }) => context.setMessage(`Login failed: ${message}`)}
      />
    </div>
  )}
</Consumer>;

export default withRouter(Login);