import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import SupportTouch from '../utils/SupportTouch'

// Style
import { withStyles } from '@material-ui/core/styles'
import widthWidth from '../utils/withWidth'
import Typography from '@material-ui/core/Typography'
import MaterialIcon from '../utils/MaterialIcon'

class TourItineraryMobile extends Component {
  render() {
    const { classes, activities } = this.props
    return (
      <SupportTouch>
        <SwipeableViews className={classes.swipeContainer}>
          {activities.map((activity, index) => (
            <div key={index} className={classes.slide}>
              <div className={classes.activityIcons}>
                {activity.icon.map((item, index) => (
                  <MaterialIcon key={index} iconName={item} />
                ))}
              </div>
              <Typography
                variant="body1"
                className={[classes.activityName, classes.centerAlign].join(
                  ' '
                )}
              >
                {activity.name}
              </Typography>
              <Typography variant="subtitle2" className={classes.centerAlign}>
                {activity.time}
              </Typography>
              <div className={classes.activityNote}>
                <Typography variant="body1" className={classes.centerAlign}>
                  {activity.note}
                </Typography>
              </div>
            </div>
          ))}
        </SwipeableViews>
      </SupportTouch>
    )
  }
}

const styles = theme => ({
  swipeContainer: {
    padding: '0 18px',
    '& >div >div': {
      padding: '0 8px'
    }
  },
  slide: {
    padding: theme.spacing.unit,
    paddingTop: 0,
    minHeight: '62vh',
    color: '#fff',
    marginTop: 40,
    border: '1px solid lightgrey',
    borderRadius: 10
  },
  activityIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    '& >div': {
      marginTop: -20,
      padding: `0 ${theme.spacing.unit}px`,
      backgroundColor: 'white'
    }
  },
  activityName: {
    textTransform: 'capitalize'
  },
  activityNote: {
    marginTop: theme.spacing.unit * 3,
    '& p': theme.typography.body1
  },
  centerAlign: {
    textAlign: 'center'
  }
})

export default widthWidth(withStyles(styles)(TourItineraryMobile))
