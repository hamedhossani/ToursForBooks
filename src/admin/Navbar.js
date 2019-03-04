import React from 'react';
import {
  Link,
  withRouter,
  NavLink,Nav
} from 'react-router-dom';
import {auth} from './firebase/index';
import { Consumer } from './AppProvider';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
// import LoginIcon from '@material-ui/core/icons/Login';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Z_BLOCK } from 'zlib';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  barButton:{
    color:'white'
  },
  menu:{
    '& li':{
      display:'inline-block',
      'padding-right':'10px'
    },
    '& li a':{
      cursor:'pointer', 
    }
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Navbar = props => {
  const { classes } = props;

  const handleLogout = context => {
    auth.logout();
    context.destroySession();
    props.history.push('/admin/signedOut');
  };

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>       
        <Typography variant="h6" color="inherit" className={classes.grow}>
        Admin Panel
        </Typography>
        <Consumer>    
            {({ state, ...context }) => (
              state.currentUser ?
              <div> 
                <Button >
                    <NavLink to="/admin/dashboard" color="inherit">Dashboard</NavLink>
                  </Button>
                  <Button color="inherit" onClick={() => handleLogout(context)}>
                    Logout 
                  </Button>
                </div>
                :
                <div>
                  <Button >
                    <NavLink to="/admin" color="inherit">Home</NavLink>
                  </Button>
                  <Button color="inherit">
                    <NavLink to="/admin/login" color="inherit">Login</NavLink>
                  </Button>
                  <Button color="inherit">
                    <NavLink to="/admin/signup" color="inherit">Create Account</NavLink>
                  </Button>                
                </div>
            )}
           </Consumer>
      </Toolbar>
    </AppBar>
  </div>
  )
};
  export default withRouter(withStyles(styles)(Navbar));