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

import TourCreationForm from '../admin/TourCreationForm'

const api = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_PROJECT_ID + '.firebaseapp.com',
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET
}

firebase.initializeApp(api)

class AdminPage extends Component {
  state = {
    isAuthenticated: !!firebase.auth().currentUser,
    isSavedAndAddAnother: false
  }
  handleSignOut = () => {
    firebase.auth().signOut()
    window.localStorage.clear()
    this.setState({ isAuthenticated: false })
  }
  addTour = () => {
    if (!this.state.isAuthenticated) {
      return
    }
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(idToken => {
        fetch(`${SERVER_URI}/addTour`, {
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ idToken })
        }).then(res => {
          if (res.status === 200) {
            this.setState({ isSavedAndAddAnother: true })
          }
        })
      })
      .catch(error => console.log('Cannot get token', error))
  }

  handleSignInSuccess = () => {
    this.setState({ isAuthenticated: true })
  }

  render() {
    const { isSavedAndAddAnother, isAuthenticated } = this.state
    const { classes } = this.props
    return (
      <div className={classes.adminPage}>
        {/* {!isAuthenticated ? (
          <SignInPage signInSuccess={this.handleSignInSuccess} />
        ) : (
          <> */}
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
              className={classes.grow}
            >
              Admin Workspace
            </Typography>
            <Button onClick={this.handleSignOut} disabled={!isAuthenticated}>
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <TourCreationForm
            isAnthenticated={isAuthenticated}
            addTour={this.addTour}
          />
        </div>
        {/* </>
        )} */}
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
