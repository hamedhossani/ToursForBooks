import React, { Component } from 'react'

// Style
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MaterialIcon from '../utils/MaterialIcon'

class TourImage extends Component {
  render() {
    const { classes, activities } = this.props
    return (
      <div>
        {activities.map((activity, index) => (
          <Grid
            container
            spacing={24}
            key={index}
            className={classes.activityRoot}
          >
            <Grid item xs={12} sm={2}>
              <Typography variant="subtitle2">{activity.time}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={10}
              className={classes.activityByNameWrapper}
            >
              {activity.icon.map((item, index) => (
                <MaterialIcon key={index} iconName={item} />
              ))}
              <Typography variant="subtitle2" className={classes.activityName}>
                {activity.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2} className={classes.activityBy}>
              {activity.by && <MaterialIcon iconName={activity.by} />}
            </Grid>
            {activities.length - 1 !== index ? (
              <Grid item xs={12} sm={9} className={classes.activityNoteWrapper}>
                <Typography variant="body1" className={classes.activityNote}>
                  {activity.note}
                </Typography>
              </Grid>
            ) : (
              <Grid item xs={12} sm={9} />
            )}
          </Grid>
        ))}
      </div>
    )
  }
}

const styles = theme => ({
  activityRoot: {
    marginTop: theme.spacing.unit,
    alignItems: 'center'
  },
  activityByNameWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& div + div': {
      marginLeft: theme.spacing.unit
    }
  },
  activityName: {
    marginLeft: theme.spacing.unit,
    textTransform: 'capitalize'
  },
  activityNoteWrapper: {
    marginLeft: '32px',
    borderLeft: `1px solid ${theme.palette.common.darkGrey}`
  },
  activityNote: {
    paddingLeft: '16px',
    paddingBottom: '20px'
  }
})

export default withStyles(styles)(TourImage)
