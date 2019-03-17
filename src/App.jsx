import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// Components
import InitPage from './page/InitPage'
import TourPage from './tour/TourPage'
import AdminPage from './page/AdminPage'
import SignInPage from './page/SignInPage'

// Style
import { withStyles } from '@material-ui/core/styles'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faComments,
  faCoffee,
  faMapMarkerAlt,
  faShip,
  faBus,
  faSun,
  faFilm,
  faSmile,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'

import {
  faFacebook,
  faTwitter,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faComments,
  faCoffee,
  faMapMarkerAlt,
  faShip,
  faBus,
  faSun,
  faFilm,
  faSmile,
  faEnvelope,
  faFacebook,
  faTwitter,
  faWhatsapp
)

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Route exact path="/" render={props => <InitPage routing={props} />} />
        <Route
          exact
          path="/tour/:tour_id"
          render={props => <TourPage routing={props} />}
        />
        <Route exact path="/admin" render={props => <AdminPage {...props} />} />
        <div
          className="fb-customerchat"
          data-page_id="1726420851006429"
          data-ref=""
        />
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    '& a': {
      cursor: 'pointer',
      textDecoration: 'none'
    }
  }
})

export default withStyles(styles)(App)
