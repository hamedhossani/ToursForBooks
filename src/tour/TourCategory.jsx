import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
  root: {
    // display: 'flex',
    // justifyContent: 'center',
    // flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit
  }
})

class TourCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'default',
      active: 'none'
    }
  }

  ChipColor(position) {
    if (this.state.active === position) {
      return 'primary'
    }
    return 'default'
  }

  toggle(position) {
    if (this.state.active === position) {
      this.setState({ active: 'none' }, () => {
        this.props.handleCategory(this.state.active)
      })
    } else {
      this.setState({ active: position }, () => {
        this.props.handleCategory(this.state.active)
      })
    }
    if (this.state.active === 'none') {
      this.setState({ active: position }, () => {
        this.props.handleCategory(this.state.active)
      })
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Chip
          label="Commerical"
          color={this.ChipColor('Commerical')}
          onClick={() => {
            this.toggle('Commerical')
          }}
          className={classes.chip}
        />
        <Chip
          label="Volunteer"
          color={this.ChipColor('Volunteer')}
          onClick={() => {
            this.toggle('Volunteer')
          }}
          className={classes.chip}
        />
        <Chip
          label="EcoTour"
          color={this.ChipColor('EcoTour')}
          onClick={() => {
            this.toggle('EcoTour')
          }}
          className={classes.chip}
        />
      </div>
    )
  }
}

TourCategory.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TourCategory)
