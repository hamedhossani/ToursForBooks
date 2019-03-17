import React from 'react'
import { connect } from 'react-redux'

// Style
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

// Store
import { fetchCurrentMessage } from '../page/action'

class BookingPayment extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      paypal: {
        flow: 'checkout',
        amount: '',
        currency: 'USD',
        buttonStyle: {
          layout: 'vertical',
          size: 'medium',
          shape: 'rect',
          color: 'gold'
        }
      }
    }
  }
  componentDidMount() {
    //create braintree
    // const {tour, submittedContent, onChange, dispatchCurrentMessage} = this.props
    // to-do: add new payment system
  }

  render() {
    const { classes, tour, submittedContent } = this.props
    return (
      <div>
        <Typography variant="display1" className={classes.marginBottom}>
          <span className={classes.capitalize}>{submittedContent.name}</span>,
          your new adventure is almost there !
        </Typography>
        <Typography variant="body1" className={classes.strongText}>
          Contact Information
        </Typography>
        <Grid container className={classes.marginBottom}>
          <Grid item xs={8}>
            <Typography variant="body1">Your Name</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" className={classes.floatRight}>
              {submittedContent.name}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">Your Phone Number</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" className={classes.floatRight}>
              {submittedContent.phone}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">Your Email</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" className={classes.floatRight}>
              {submittedContent.email}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1" className={classes.strongText}>
          Tour Information
        </Typography>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="body1">{tour.name}</Typography>
            <Typography variant="body1" className={classes.smallText}>
              on {submittedContent.date}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" className={classes.floatRight}>
              ${tour.price.discountAmount}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              x {submittedContent.numberOfPax}{' '}
              {submittedContent.numberOfPax > 1 ? 'passengers' : 'passenger'}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" className={classes.floatRight}>
              ${submittedContent.numberOfPax * tour.price.discountAmount}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" className={classes.strongText}>
              Total:{' '}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="body1"
              className={[classes.strongText, classes.floatRight].join(' ')}
            >
              ${submittedContent.numberOfPax * tour.price.discountAmount}
            </Typography>
          </Grid>
        </Grid>
        <div id="dropin-container" />
      </div>
    )
  }
}

const styles = theme => ({
  marginBottom: {
    marginBottom: 20
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  smallText: {
    fontSize: '0.7rem'
  },
  floatRight: {
    float: 'right'
  },
  strongText: {
    fontWeight: 'bold'
  }
})

const mapDispatchToProps = dispatch => ({
  dispatchCurrentMessage: message => dispatch(fetchCurrentMessage(message))
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(BookingPayment))
