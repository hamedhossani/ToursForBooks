import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import {auth} from './firebase/index';
import { Consumer } from './AppProvider';

const Signup = props => <Consumer>
  {({ state, ...context }) => (
    <div className="container"> 
      <Form
        action="createUser"
        title="Create account"
        onSuccess={() => auth.logout().then(() => {
          context.destroySession();
          context.clearMessage();
          props.history.push('/admin/accountCreated');
        })}
        onError={({ message }) => context.setMessage(`Error occured: ${message}`)}
      />
    </div>
  )}
</Consumer>;

export default withRouter(Signup);