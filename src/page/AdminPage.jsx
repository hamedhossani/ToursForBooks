import React, { Component } from 'react'
import SERVER_URI from '../config'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import SignInPage from './SignInPage'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { BrowserRouter as Router, Route, Link, withRouter, Switch } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import TourCreationForm from '../admin/TourCreationForm'
import TourList from '../admin/tour/TourList'

import { devConfig } from '../admin/firebase/config'

// const api = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_PROJECT_ID + '.firebaseapp.com',
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET
// }

if (!firebase.apps.length) {
  firebase.initializeApp(devConfig)
}

const menuLink = {
  backgroundColor: '#f9f5f5',
  width: '97%',
  textAlign: 'center',
  display: 'inline-block',
  borderRadius: '8px',
  border: '1px solid black',
  margin: '3px'
}
class AdminPage extends Component {
  state = {
    isAuthenticated: !!firebase.auth().currentUser,
    isSavedAndAddAnother: false,
    idToken: localStorage.getItem('idToken') || null
  }

  handleSignOut = () => {
    firebase.auth().signOut()
    window.localStorage.clear()
    this.setState({ isAuthenticated: false })
  }
  // addTour = () => {
  //   if (!this.state.isAuthenticated) {
  //     return
  //   }
  //   firebase
  //     .auth()
  //     .currentUser.getIdToken()
  //     .then(idToken => {
  //       fetch(`${SERVER_URI}/addTour`, {
  //         method: 'POST',
  //         header: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ idToken })
  //       }).then(res => {
  //         if (res.status === 200) {
  //           this.setState({ isSavedAndAddAnother: true })
  //         }
  //       })
  //     })
  //     .catch(error => console.log('Cannot get token', error))
  // }

  handleSignInSuccess = () => {
    this.setState({ isAuthenticated: true })
  }
  loadPage = (props, isAuthenticated) => {
    var pathname = this.props.history.location.pathname;
    var pathnameSplit = (pathname).split('/');
    var id = pathnameSplit[pathnameSplit.length - 1];
    if (pathname === '/admin/addTour') {
      return (<TourCreationForm
        isAnthenticated={isAuthenticated}
      />)
    }
    else  if (pathname === '/admin/tour/'+id) {
      return (<TourCreationForm
        isAnthenticated={isAuthenticated}
        id={Number(id)}
      />)
    }
    else if (pathname === '/admin/tours') {
      return (<TourList tourLoading={true} />);
    }
  }

  render() {
    const { isSavedAndAddAnother, isAuthenticated } = this.state
    const { classes } = this.props
    return (
      <div className={classes.adminPage}>        
        {isSavedAndAddAnother && <h6>New Tour is created!</h6>}
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="body1"
              color="inherit"
              className={classes.grow}>
              Admin Workspace
            </Typography>
            {isAuthenticated &&
              <Button style={{ border: '1px solid white', color: 'white' }}
                onClick={this.handleSignOut} disabled={!isAuthenticated}>
                Sign Out
              </Button>
            }
          </Toolbar>
        </AppBar>
        {isAuthenticated &&
          <Grid container spacing={16}>
            <Grid item xs={3}>
              <Paper className={styles.paper}>
                <Link to="/admin/addTour" style={menuLink}> Add New Tour</Link>
                <br />
                <Link to="/admin/tours" style={menuLink}> Tours</Link>
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <div className={classes.content}>
                {
                  this.loadPage(this.props, isAuthenticated)
                }
              </div>
            </Grid>
          </Grid>
        }
        {!isAuthenticated &&
          <div className={classes.content}>
            <div style={{ textAlign: "center", marginTop: 30, padding: 15, backgroundColor: 'orange' }}>
              You Are Not Login.
            </div>
            <SignInPage signInSuccess={this.handleSignInSuccess}
              signInSuccessUrl="/admin/"
              handleSignOut={this.handleSignOut} />
          </div>
        }
      </div>
    )
  }
}

const styles = {
  adminPage: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    paddingRight: '15%',
    paddingLeft: '15%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

export default withStyles(styles)(AdminPage)
