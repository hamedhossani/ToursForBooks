import React, { Component } from 'react'

// Style
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

// Images
import BLVImage from '../images/BLV.jpg'
import VDGImage from '../images/VDG.png'
import TFBImage from '../images/logo.png'

class AboutUs extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root} id="about">
        <Typography variant="h2" color="primary">
          About Us
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4} className={classes.alignCenter}>
            <img className={classes.logo} src={TFBImage} alt="" />
            <Typography variant="body1" className={classes.alignCenter}>
              <span className={classes.strongText}>Tours For Books</span> is a
              social enterprise which offer a wide range of package tours,
              travel services and other travel solutions to individuals,
              families, large groups and travel agencies.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.alignCenter}>
            <div className={classes.alignMiddle}>
              <img className={classes.logo} src={VDGImage} alt="" />
            </div>
            <Typography variant="body1">
              <span className={classes.strongText}>VietDan Travel</span> is a
              fully licensed international inbound tour operator recognized by
              Vietnam National Administration of Tourism.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.alignCenter}>
            <img className={classes.logo} src={BLVImage} alt="" />
            <Typography variant="body1">
              <span className={classes.strongText}>Better Life Vietnam</span>, a
              non-profit organization that works to improve education conditions
              for underprivileged children and youth in Vietnam.
            </Typography>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5%',
    textAlign: 'center'
  },
  logo: {
    width: 120
  },
  alignCenter: {
    textAlign: 'center'
  },
  alignMiddle: {
    height: 125,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  strongText: {
    fontWeight: 'bold'
  }
})

export default withStyles(styles)(AboutUs)
