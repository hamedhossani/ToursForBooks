import React, { Component } from 'react'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import SignInPage from './SignInPage'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'

import { Link } from 'react-router-dom'

import TourCreationForm from '../admin/tour/TourCreationForm'
import TourList from '../admin/tour/TourList'

class AdminPage extends Component {
  state = {
    isAuthenticated: !!firebase.auth().currentUser,
    isSavedAndAddAnother: false,
    idToken: localStorage.getItem('idToken') || null,
    isDrawerOpen: false
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
    var pathname = this.props.history.location.pathname
    var pathnameSplit = pathname.split('/')
    var id = pathnameSplit[pathnameSplit.length - 1]
    if (pathname === '/admin/addTour') {
      return <TourCreationForm isAnthenticated={isAuthenticated} />
    } else if (pathname === '/admin/tour/' + id) {
      return (
        <TourCreationForm isAnthenticated={isAuthenticated} id={Number(id)} />
      )
    } else if (pathname === '/admin/tours') {
      return <TourList tourLoading={true} />
    }
  }
  handleDrawerOpen = () => {
    this.setState({ isDrawerOpen: true })
  }

  handleDrawerClose = () => {
    this.setState({ isDrawerOpen: false })
  }

  render() {
    const { isSavedAndAddAnother, isAuthenticated, isDrawerOpen } = this.state
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
              onClick={this.handleDrawerOpen}
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
            {isAuthenticated && (
              <Button
                style={{ border: '1px solid white', color: 'white' }}
                onClick={this.handleSignOut}
                disabled={!isAuthenticated}
              >
                Sign Out
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={isDrawerOpen}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {isAuthenticated && (
            <>
              <Button>
                <Link to="/admin/addTour"> Add New Tour</Link>
              </Button>
            </>
          )}
        </Drawer>
        {isAuthenticated ? (
          <div className={classes.content} onClick={this.handleDrawerClose}>
            {this.loadPage(this.props, isAuthenticated)}
          </div>
        ) : (
          <div className={classes.content}>
            <div
              style={{
                textAlign: 'center',
                marginTop: 30,
                padding: 15,
                backgroundColor: 'orange'
              }}
            >
              You Are Not Login.
            </div>
            <SignInPage
              signInSuccess={this.handleSignInSuccess}
              signInSuccessUrl="/admin/"
              handleSignOut={this.handleSignOut}
            />
          </div>
        )}
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
  },
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    width: 240
  }
}

export default withStyles(styles)(AdminPage)
