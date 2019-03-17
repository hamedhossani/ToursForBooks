import React, { Component } from 'react'
import { connect } from 'react-redux'

// Style
import widthWidth from '../utils/withWidth'
import breakpoints from '../theme/breakpoints'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// Store
import { fetchInitialTours } from './action'

// Component
import TourCard from './TourCard';
import TourCategory from './TourCategory';
var smoothScroll = require('smoothscroll');

class Tours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      localTourOpen: false,
      customTourOpen: false,
      category:'none'
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleApply = this.handleApply.bind(this)
    this.handleCategory = this.handleCategory.bind(this)
  }

  handleClick() {
    this.setState({ open: true })
  }
  handleClose() {
    this.setState({ open: false })
  }
  handleChange(tourType, checked) {
    this.setState({ [tourType]: checked })
  }
  handleReset() {
    this.setState({ localTourOpen: false, customTourOpen: false })
  }

  handleApply() {
    this.handleClose()
    let tourSection = document.querySelector('#tours')
    smoothScroll(tourSection)
  }
  handleCategory(category){
    this.setState({category : category})
  }
  componentWillMount(){
    this.props.dispatchFetchInitialTours()
  }

  render() {
    const { classes, tours } = this.props
    const { localTourOpen, customTourOpen } = this.state
    return (
      <div className={classes.tourWrapper} id='tours' >
        <Grid container spacing={16} className={classes.tourWrapper}>
        <Grid item xs={12} md={12}>
            <TourCategory handleCategory={this.handleCategory}/>
          </Grid>
          { tours && tours.map((tour) =>        
            ( (
            (this.state.category === 'none' || tour.category === (this.state.category).toLowerCase())&&
            ((localTourOpen && tour.type === 'local') || 
            (customTourOpen && tour.type === 'custom') || 
            (!localTourOpen && !customTourOpen)))&& 
              <Grid item xs={12} sm={6} md={4} key={tour.id}>
                <TourCard tour={tour} />
              </Grid>
            )
          )}
        </Grid>
      </div>
    )
  }
}

const styles = theme => ({
  tourWrapper: {
    padding: '5%',
    'padding-top':'1%',
    flexGrow: 1,
  },
  [`@media (min-width: ${breakpoints['md']}px)`]: {
    tourWrapper: {
      display: 'flex',
      padding: '5% 10%',
      'padding-top':'1%',
      flexDirection: 'row',
      justifyContent: 'stretch'
    }
  }
})

const mapStateToProps = (state, ownProps) => {
  const { tours } = state.ToursReducer.InitialToursReducer
  return { tours }
}

const mapDispatchToProps = dispatch => ({
  dispatchFetchInitialTours: () => dispatch(fetchInitialTours())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(widthWidth(withStyles(styles)(Tours)))
