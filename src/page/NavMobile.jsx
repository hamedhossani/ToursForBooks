import React, { Component } from 'react';

// Style
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import CloseIcon from '@material-ui/icons/Close';
import ExploreIcon from '@material-ui/icons/Explore';
import VisaIcon from '@material-ui/icons/AssignmentInd';
import TransportationIcon from '@material-ui/icons/DirectionsBus';
import PhoneIcon from '@material-ui/icons/Phone';

// Component
import NavItem from './NavItem';

var smoothScroll = require('smoothscroll');
class NavMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modal: '',
      value: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }
  
  handleChange(event, value){
    this.setState({ value })
  }
  
  handleClick(event, modal){
    event.preventDefault()
    this.setState({ open: true, modal: modal });
  };

  handleClose(){
    this.setState({ open: false, modal: '' });
  };
  
  handleScroll(event, sectionId){
    event.preventDefault();
    this.handleClose()
    let section = document.querySelector(sectionId);
    smoothScroll(section);
  }

  render() {
    const { classes, fullScreen } = this.props
    const { open, modal, value } = this.state
    return (
      <div>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label="Explore" icon={<ExploreIcon />} onClick={(e) => this.handleScroll(e,'#tours')}/>
          <BottomNavigationAction label="Visa" icon={<VisaIcon />} onClick={(e) => this.handleClick(e, 'visa')} />
          <BottomNavigationAction label="Commute" icon={<TransportationIcon />} onClick={(e) => this.handleClick(e, 'commute')} />
          <BottomNavigationAction label="Contact" icon={<PhoneIcon />} onClick={(e) => this.handleScroll(e,'#contactUs')} />
        </BottomNavigation>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          keepMounted
          aria-labelledby="responsive-dialog-title"
          onClick={this.handleClose}
          className={[classes.dialog, classes.hiddenScrollX].join(' ')}
        >
          <DialogContent className={classes.hiddenScrollY}>
            <NavItem modal={modal} />
          </DialogContent>
          <div className={classes.topRight}>
            <IconButton className={classes.closeDialogButton} onClick={this.handleClose}><CloseIcon />
            </IconButton>
          </div>
        </Dialog>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 1501
  },
  topRight: {
    position: 'absolute',
    top: 0,
    right: 0
  }
});

export default withStyles(styles)(withMobileDialog()(NavMobile));