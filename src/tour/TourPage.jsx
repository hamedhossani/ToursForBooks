import React, { Component } from 'react'
import { connect } from 'react-redux'

// Style
import widthWidth from '../utils/withWidth'
import breakpoints from '../theme/breakpoints'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

// Components
import TourDetail from './TourDetail'
import TourPrice from './TourPrice'
import TourBook from './TourBook'
import ContactUs from '../page/ContactUs'

// Store
import { fetchOneTourById } from './action'
import Divider from '@material-ui/core/Divider'

class TourPage extends Component {
  componentWillMount() {
    const tour_id = this.props.routing.match.params.tour_id
    this.props.dispatchFetchOneTour(tour_id)
  }

  render() {
    const { classes } = this.props
    const { tour, isFetching } = this.props
    return (
      <div>
        {!isFetching ? (
          <div className={classes.root}>
            {/** Tour Review Summary**/}
            <Grid container spacing={16}>
              <Grid item xs={12} md={8}>
                <TourDetail tour={tour} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TourPrice price={tour.price} />
                <TourBook tour={tour} />
              </Grid>
            </Grid>
          </div>
        ) : (
          ''
        )}
        <Divider />
        <ContactUs />
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    padding: '0 2% 5% 2%'
  },
  [`@media (min-width: ${breakpoints['md']}px)`]: {
    root: {
      padding: '0 10% 5% 10%'
    }
  }
})

const mapStateToProps = (state, ownProps) => {
  const { tour, isFetching } = state.ToursReducer.CurrentToursReducer
  return { tour, isFetching }
}

const mapDispatchToProps = dispatch => ({
  dispatchFetchOneTour: id => dispatch(fetchOneTourById(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(widthWidth(withStyles(styles)(TourPage)))
