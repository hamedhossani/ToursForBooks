import React, { Component } from 'react'
import { connect } from 'react-redux'
import update from 'react-addons-update'
import 'whatwg-fetch'

// Style
import { withStyles, withTheme } from '@material-ui/core/styles'
import breakpoints from '../theme/breakpoints'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import CircularProgress from '@material-ui/core/CircularProgress'

// Component
import TourBookContent from './TourBookContent'
import CloseIcon from '@material-ui/icons/Close'

// Store
import { fetchCurrentMessage } from '../page/action'
var shortid = require('shortid')

function getStepName(step) {
  const stepName = [
    'Pick your day',
    "Let's connect",
    'Review and Make a payment',
    'All done!'
  ]
  return stepName[step]
}

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class TourBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      disabledNext: true,
      errorPayment: false,
      loading: false,
      submittedContent: {
        date: '',
        numberOfPax: '',
        note: '',
        name: '',
        email: '',
        phone: '',
        instance: '',
        payload: ''
      }
    }
    this.handleBack = this.handleBack.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.handleBooking = this.handleBooking.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.sendEmail = this.sendEmail.bind(this)
  }
  handleNext() {
    this.setState({
      activeStep: this.state.activeStep + 1,
      disabledNext: true
    })
  }

  handleBack() {
    if (this.state.activeStep === 0) {
      this.props.backTourCardMediaContent()
    } else {
      this.setState({
        activeStep: this.state.activeStep - 1
      })
    }
  }

  handleChange(input) {
    const { activeStep, submittedContent } = this.state
    if (input.type === 'option' || input.type === 'contact') {
      const newInput = update(submittedContent, { $merge: input.fields })
      this.setState({ submittedContent: newInput })
      switch (activeStep) {
        case 0:
          if (newInput.date && newInput.numberOfPax) {
            this.setState({ disabledNext: false })
          } else {
            this.setState({ disabledNext: true })
          }
          break
        case 1:
          if (
            newInput.name &&
            newInput.phone &&
            this.validateEmail(newInput.email)
          ) {
            this.setState({ disabledNext: false })
          } else {
            this.setState({ disabledNext: true })
          }
          break
        default:
          this.setState({ disabledNext: true })
      }
    } else if (input.type === 'payload') {
      const newInput = update(submittedContent, { $merge: input.fields })
      if (newInput.instance) {
        this.setState({ disabledNext: false })
      } else {
        this.setState({ disabledNext: true })
      }
      this.setState({ submittedContent: newInput })
    }
  }

  validateEmail(input) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
      return true
    } else {
      return false
    }
  }

  handleBooking() {
    const { instance, numberOfPax } = this.state.submittedContent
    const { tour, dispatchCurrentMessage } = this.props
    const paypalContent = {
      orderId: shortid.generate(),
      tourId: tour.id,
      amount: tour.price.discountAmount * numberOfPax
    }

    this.setState(
      { loading: true },
      instance.requestPaymentMethod((err, payload) => {
        if (!err) {
          fetch('/api/checkout', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              payload: { nonce: payload.nonce },
              transaction: {
                paypal: paypalContent
              }
            })
          })
            .then(res => res.json())
            .then(data => {
              if (data.status === 'success') {
                this.setState({ loading: false })
                this.handleNext()
                this.sendEmail(paypalContent)
              } else {
                this.setState({ errorPayment: true })
                dispatchCurrentMessage(
                  'Error: Unsuccessful Payment. Please contact us at inquiry@vietnamtoursforbooks.com.'
                )
              }
            })
        } else {
          dispatchCurrentMessage(
            'Error: Cannot request payment method. Please contact us at inquiry@vietnamtoursforbooks.com.'
          )
        }
      })
    )
  }

  handleClose() {
    this.props.closeTourBook()
  }

  sendEmail(order) {
    const { tour, dispatchCurrentMessage } = this.props
    const {
      name,
      email,
      phone,
      numberOfPax,
      note,
      date
    } = this.state.submittedContent
    const url = 'https://hooks.zapier.com/hooks/catch/2690251/s7buaa/'
    const payload = {
      order,
      name,
      email,
      phone,
      numberOfPax,
      date,
      note,
      tour: tour.name
    }
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => {
      if (response.status === 200) {
        dispatchCurrentMessage(`The confirmation is sent to ${email}`)
      } else {
        dispatchCurrentMessage(
          'Payment is successful but we have problem email the confirmation (0). Please contact us at inquiry@vietnamtoursforbooks.com'
        )
      }
    })
  }

  render() {
    const { classes, tour, booking, fullScreen, theme } = this.props
    const {
      activeStep,
      submittedContent,
      disabledNext,
      loading,
      errorPayment
    } = this.state
    return (
      <Dialog
        fullScreen={fullScreen}
        maxWidth="sm"
        open={booking}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="responsive-dialog-title"
        className={[classes.hiddenScrollX].join(' ')}
      >
        <DialogContent className={classes.hiddenScrollY}>
          {!errorPayment ? (
            <div className={classes.dialogContent}>
              <Typography variant="subtitle1">
                Step {activeStep + 1} of 4: {getStepName(activeStep)}
              </Typography>
              <div>
                <TourBookContent
                  activeStep={activeStep}
                  tour={tour}
                  submittedContent={submittedContent}
                  handleChange={this.handleChange}
                />
              </div>
            </div>
          ) : (
            <div className={classes.dialogContent}>
              <Typography variant="subtitle1">
                Oh no! Something went wrong from our end
              </Typography>
              <div>
                <Typography variant="body1">
                  Please try again or contact us at
                  inquiry@vietnamtoursforbooks.com
                </Typography>
              </div>
            </div>
          )}
        </DialogContent>
        {activeStep !== 3 ? (
          <DialogActions>
            <Button onClick={this.handleBack}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
            {activeStep === 2 ? (
              <div className={classes.wrapper}>
                <Button
                  onClick={this.handleBooking}
                  disabled={disabledNext || loading}
                >
                  Book Now
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            ) : (
              <Button onClick={this.handleNext} disabled={disabledNext}>
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            )}
          </DialogActions>
        ) : (
          ''
        )}
        <div className={classes.topRight}>
          <IconButton
            className={classes.closeDialogButton}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </Dialog>
    )
  }
}

const styles = theme => ({
  root: {},
  dialog: {
    width: '100%',
    '& >div:nth-child(2)': {
      height: '90vh'
    },
    [`@media (max-width: ${breakpoints['sm']}px)`]: {
      marginTop: 40,
      height: '90%'
    }
  },
  dialogContent: {
    padding: '5%'
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
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 38,
    paddingLeft: '5%',
    marginBottom: theme.spacing.unit
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
  wrapper: {
    position: 'relative'
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
})

const mapDispatchToProps = dispatch => ({
  dispatchCurrentMessage: message => dispatch(fetchCurrentMessage(message))
})

export default connect(
  null,
  mapDispatchToProps
)(withMobileDialog()(withTheme()(withStyles(styles)(TourBook))))
