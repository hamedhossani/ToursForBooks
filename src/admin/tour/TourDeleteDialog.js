import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom'; 

import { deleteTourById } from '../store/action'; 
import { fetchCurrentMessage } from '../../page/action';

class TourDeleteDialog extends React.Component { 
  constructor(props) {
    super(props);
  }
//   componentWillReceiveProps(newProps) {    
//     console.log('Component WILL RECIEVE PROPS! tour delete dialog');
//     console.log(newProps); 
//     if(newProps.open === false ||
//        (newProps.OpenTourDeleteDialog !== undefined && newProps.OpenTourDeleteDialog === false)){     
//        this.props.onClose();       
//     }
//  }
//  shouldComponentUpdate(newProps, newState) {
//   console.log('shouldComponentUpdate');
//   console.log(newProps);
//   console.log(this.props.open);
//   console.log(newState);
//   //  if(newProps == this.props) return false;
//   return (newProps.open);
// }
  render() {
    return (
      <div>
        {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open alert dialog
        </Button> */}
        <Dialog
          open={this.props.open }
          onClose={this.props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.tour.name+" !"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you Sure, Delete Tour by name "{this.props.tour.name}" ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button  color="primary" 
                     onClick={this.props.onClose} >
              Cancel
            </Button>
            <Button  color="secondary" variant="outlined" autoFocus
                     onClick={() => this.props.deleteTour()}
                      >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {  
  return{
    deleteTour: () => dispatch(deleteTourById(ownProps.tour.id))
   ,dispatchCurrentMessage: (message) => dispatch(fetchCurrentMessage(message))
  }
}
  const mapStateToProps = (state, props) => { 
    const { OpenTourDeleteDialog }  = state.AdminReducers.InitialToursReducer ;
     if(OpenTourDeleteDialog !== undefined)        
        return { open : OpenTourDeleteDialog };
     return {};
  } 
// export default withRouter(connect(mapStateToProps)( TourDeleteDialog)); 
export default  connect(mapStateToProps,mapDispatchToProps)(TourDeleteDialog); 