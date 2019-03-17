import React from 'react'

// Style
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

// Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ContactUs = ({ classes }) => {
  return (
    <div className={classes.root} id="contactUs">
      <Typography variant="h2" color="primary">
        Let's Connect!
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12} md={4} className={classes.contactItem}>
          <FontAwesomeIcon
            icon="envelope"
            size="lg"
            style={{ color: '#FF632B' }}
          />
          <Typography variant="body1">
            inquiry@vietnamtoursforbooks.com
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <a
            href="https://www.facebook.com/toursforbooks"
            className={classes.contactItem}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={['fab', 'facebook']}
              style={{ color: '#3b5998' }}
              size="lg"
            />
            <Typography variant="body1" className={classes.alignCenter}>
              toursforbooks
            </Typography>
          </a>
        </Grid>
        <Grid item xs={12} md={2}>
          <a
            href="https://twitter.com/toursforbooks"
            className={classes.contactItem}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={['fab', 'twitter']}
              style={{ color: '#1da1f2' }}
              size="lg"
            />
            <Typography variant="body1">@toursforbooks</Typography>
          </a>
        </Grid>
        <Grid item xs={12} md={4}>
          <a
            href="https://api.whatsapp.com/send?phone=84986894714"
            className={classes.contactItem}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={['fab', 'whatsapp']}
              style={{ color: '#25d366' }}
              size="lg"
            />
            <Typography variant="body1">
              +84 98 6894714 (WhatsApp/Zalo)
            </Typography>
          </a>
        </Grid>
      </Grid>
    </div>
  )
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
  contactItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 0px',
    '& p': {
      marginLeft: 5
    }
  },
  alignCenter: {
    textAlign: 'center'
  },
  accentColor: {
    backgroundColor: theme.palette.secondary[500],
    color: theme.palette.common.white
  }
})

export default withStyles(styles)(ContactUs)
