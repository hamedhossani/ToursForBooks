import React, { Component } from 'react'

// Style
import breakpoints from '../theme/breakpoints'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

// Components
import TourDetail from './TourDetail'
import ActionButton from '../utils/ActionButton'
import TourBook from './TourBook'

const styles = theme => ({
  media: {
    height: 150
  },
  [`@media (min-width: ${breakpoints['md']}px)`]: {
    media: {
      height: 200
    }
  },
  overflowText: {
    /* hide text if it more than N lines  */
    overflow: 'hidden',
    /* for set '...' in absolute position */
    position: 'relative',
    /* use this value to count block height */
    lineHeight: '1.2em',
    /* max-height = line-height (1.2) * lines max number (3) */
    maxHeight: '3.1em',
    /* fix problem when last visible word doesn't adjoin right side  */
    textAlign: 'justify',
    /* place for '...' */
    marginRight: '-1em',
    paddingRight: '1em',
    '&:before': {
      /* points in the end */
      content: '"..."',
      /* absolute position */
      position: 'absolute',
      /* set position to right bottom corner of block */
      right: 0,
      bottom: 0,
      marginRight: '1em',
      paddingLeft: '0.5em',
      lineHeight: '1.3em',
      backgroundColor: 'white',
      color: 'black',
      [`@media (min-width: ${breakpoints['sm']}px)`]: {
        lineHeight: '1.2em'
      }
    },
    /* hide ... if we have text, which is less than or equal to max lines */
    '&:after': {
      /* points in the end */
      content: '""',
      /* absolute position */
      position: 'absolute',
      /* set position to right bottom corner of text */
      right: 0,
      /* set width and height */
      width: '1em',
      height: '1em',
      marginTop: '0.2em',
      /* bg color = bg color under block */
      background: 'white'
    }
  },
  dialog: {
    [`@media (max-width: ${breakpoints['sm']}px)`]: {
      marginTop: 40,
      height: '90%'
    },
    zIndex: 1600
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
  backDialogButton: {
    transform: 'rotate(180deg)'
  },
  closeDialogButton: {
    backgroundColor: theme.palette.common.lightWhite,
    color: theme.palette.common.darkGrey
  },
  bookNowButton: {
    position: 'absolute',
    top: 0,
    right: -100
  },
  price: {
    display: 'flex',
    marginLeft: '16px',
    '& h1 + h1': {
      marginLeft: theme.spacing.unit
    }
  }
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class TourCardMediaContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      booking: false,
      contact: false,
      tooltip: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleBooking = this.handleBooking.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  handleClickOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleBooking() {
    this.setState({ open: false, booking: true })
  }

  handleContact() {
    this.setState({ contact: true })
  }

  handleBack() {
    this.setState({ open: true, booking: false })
  }

  handleCancel() {
    this.setState({ open: false, booking: false })
  }
  render() {
    const { classes, tour, fullScreen } = this.props
    let imgUrl = `${process.env.REACT_APP_STORAGE_URL}/tourImg/${
      tour.images[0]
    }.jpg`
    return (
      <div>
        <div onClick={this.handleClickOpen}>
          {imgUrl && (
            <CardMedia
              className={classes.media}
              image={imgUrl}
              title={tour.name}
            />
          )}
          <CardContent>
            <Typography variant="subtitle1">{tour.name}</Typography>
            <div className={classes.overflowText}>
              <Typography variant="body1" align="justify">
                {tour.description}
              </Typography>
            </div>
          </CardContent>
        </div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="responsive-dialog-title"
          className={[classes.dialog, classes.hiddenScrollX].join(' ')}
        >
          <DialogContent className={classes.hiddenScrollY}>
            <TourDetail tour={tour} />
          </DialogContent>
          <div className={classes.topRight}>
            <IconButton
              className={classes.closeDialogButton}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
          {tour.type === 'local' ? (
            <DialogActions>
              <div className={classes.price}>
                <Typography variant="h5" color="primary">
                  ${tour.price.amount}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${tour.price.discountAmount}
                </Typography>
              </div>
              <ActionButton variant="primary" onClick={this.handleBooking}>
                Book Now
              </ActionButton>
            </DialogActions>
          ) : (
            <DialogActions>
              <div
                className="fb-messengermessageus"
                data-messenger_app_id="133018877378513"
                data-page_id="1726420851006429"
                data-color="blue"
                data-size="large"
              />
            </DialogActions>
          )}
          <div className={classes.topRight}>
            <IconButton
              className={classes.closeDialogButton}
              onClick={this.handleCancel}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </Dialog>
        <TourBook
          tour={tour}
          booking={this.state.booking}
          backTourCardMediaContent={this.handleBack}
          closeTourBook={this.handleCancel}
        />
      </div>
    )
  }
}

export default withStyles(styles)(withMobileDialog()(TourCardMediaContent))
