import React, { Component } from 'react'

// Style
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ActionButton from '../utils/ActionButton'
import breakpoints from '../theme/breakpoints'
import widthWidth from '../utils/withWidth'

// Image
import heroImage from '../images/central_tour.jpg'
var smoothScroll = require('smoothscroll')

class Hero extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }
  handleScroll(event) {
    event.preventDefault()
    let tourSection = document.querySelector('#tours')
    smoothScroll(tourSection)
  }
  render() {
    const { classes } = this.props
    const isMobile = this.props.width < breakpoints['md']
    let logoImgUrl = `https://storage.googleapis.com/bloggy-170620.appspot.com/appImg/logo.png`
    return (
      <div>
        <div className={classes.heroWrapper}>
          {isMobile ? (
            <div
              className={classes.logo}
              style={{ backgroundImage: `url(${logoImgUrl})` }}
            />
          ) : (
            ''
          )}
          <Typography variant="h1" align="center" className={classes.heroText}>
            start your adventure today
          </Typography>
          <ActionButton variant="primary" onClick={this.handleScroll}>
            Explore
          </ActionButton>
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  heroWrapper: {
    height: '100vh',
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5%',
    paddingTop: '20%'
  },
  logo: {
    height: '150px',
    width: '150px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '80% 80%',
    backgroundPosition: '50% 50%',
    borderRadius: '50%',
    backgroundColor: 'white'
  },
  heroText: {
    marginBottom: theme.spacing.unit * 3,
    color: theme.palette.common.white,
    '&>a': {
      color: theme.palette.common.white
    }
  },
  [theme.breakpoints.down('sm')]: {
    logo: {
      height: '80px',
      width: '80px',
      backgroundSize: '70px'
    }
  }
})

export default widthWidth(withStyles(styles)(Hero))
