import React, { Component } from 'react'
import breakpoints from '../theme/breakpoints'

// Style
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import withMobileDialog from '@material-ui/core/withMobileDialog'

// Component
import NavItem from './NavItem'
var smoothScroll = require('smoothscroll')

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      modal: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleClick(event) {
    this.setState({ open: true, modal: event.target.getAttribute('name') })
  }

  handleClose() {
    this.setState({ open: false, modal: '' })
  }

  handleScroll(event) {
    event.preventDefault()
    let whyChooseUs = document.querySelector('#whyChooseUs')
    smoothScroll(whyChooseUs)
  }

  render() {
    const { classes, fullScreen } = this.props
    let logoImgUrl = `https://storage.googleapis.com/bloggy-170620.appspot.com/appImg/logo.png`
    const { open, modal } = this.state
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div
              className={classes.logo}
              style={{ backgroundImage: `url(${logoImgUrl})` }}
            />
            <Typography variant="subtitle1" className={classes.flex}>
              VietNam Tours For Books
            </Typography>
            <Typography
              variant="body1"
              className={[classes.strongText, classes.marginLeft].join(' ')}
              name="visa"
              onClick={this.handleClick}
            >
              Apply Visa
            </Typography>
            <Typography
              variant="body1"
              className={[classes.strongText, classes.marginLeft].join(' ')}
              name="commute"
              onClick={this.handleClick}
            >
              Transportation
            </Typography>
            <Typography
              variant="body1"
              className={[classes.strongText, classes.marginLeft].join(' ')}
              name="question"
              onClick={this.handleScroll}
            >
              Why Choose Us
            </Typography>
          </Toolbar>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            keepMounted
            aria-labelledby="responsive-dialog-title"
            onClick={this.handleClose}
            className={[classes.dialog, classes.hiddenScrollX].join(' ')}
          >
            <DialogContent className={classes.hiddenScrollY}>
              <NavItem modal={modal} />
            </DialogContent>
            <div className={classes.topRight}>
              <IconButton
                className={classes.closeDialogButton}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </Dialog>
        </AppBar>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    [`@media (min-width: ${breakpoints['md']}px)`]: {
      position: 'absolute',
      width: '100%',
      '& header': {
        background: theme.palette.common.white,
        // boxShadow: 'none',
        '& div': {
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }
      }
    }
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  flex: {
    flex: 1,
    color: theme.palette.primary.main
  },
  hiddenScrollX: {
    [`@media (min-width: ${breakpoints['md']}px)`]: {
      '& >div': {
        overflowX: 'hidden'
      }
    }
  },
  hiddenScrollY: {
    [`@media (min-width: ${breakpoints['md']}px)`]: {
      marginRight: -18
    }
  },
  topRight: {
    position: 'absolute',
    top: 15,
    right: 15,
    '& div + div': {
      marginLeft: theme.spacing.unit * 2
    }
  },
  closeDialogButton: {
    backgroundColor: theme.palette.common.lightWhite,
    color: theme.palette.common.darkGrey
  },
  strongText: {
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  marginLeft: {
    marginLeft: 20
  }
})

export default withStyles(styles)(withMobileDialog()(Nav))
