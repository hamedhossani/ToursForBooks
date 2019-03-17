import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Style
import breakpoints from '../theme/breakpoints'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClickOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  render() {
    const { classes, fullScreen } = this.props
    return (
      <div className={classes.root}>
        <div>
          <Typography variant="body2" component="p">
            © Vietnam Tours For Books
          </Typography>
          <Typography variant="body2" component="p">
            3 Lý Thường Kiệt, Phú La, Hà Đông, Hanoi, Vietnam
          </Typography>
        </div>
        <div>
          <Typography
            variant="body2"
            component="p"
            onClick={this.handleClickOpen}
          >
            Terms & Conditions
          </Typography>
        </div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClick={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Terms & Conditions
          </DialogTitle>
          <DialogContent>
            <List>
              <ListItem>
                <ListItemText primary="Minimum booking notice: 24 hours in advance" />
              </ListItem>
              <ListItem>
                {' '}
                <ListItemText primary="Cancellation policy: As a general rule, unless otherwise stated, our policy is that all cancellation must be informed in writing by email. You can cancel free of charge until 48 hours before your reservation starts. After that time, no cancellations, changes or refunds will be made." />
              </ListItem>
              <ListItem>
                {' '}
                <ListItemText primary="Tour costs: Tour costs and what inclusion or exclusion is listed on the itinerary for each tour. No refunds will be given for unutilized services." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Children aged 2 and younger are complimentary." />
              </ListItem>
              <ListItem>
                {' '}
                <ListItemText primary="Payment method: Paid online in USD or in cash in VND." />
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%'
  },
  [`@media (max-width: ${breakpoints['md']}px)`]: {
    root: {
      flexDirection: 'column',
      marginBottom: 50,
      '& p': {
        textAlign: 'center'
      }
    }
  }
})

Footer.propTypes = {
  fullScreen: PropTypes.bool.isRequired
}

export default withStyles(styles)(withMobileDialog()(Footer))
