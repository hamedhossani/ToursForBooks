import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { connect } from 'react-redux'

import { deleteTourById } from '../action'
import { fetchCurrentMessage } from '../../page/action'

class TourDeleteDialog extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Delete Tour {"' " + this.props.tour.name + " '"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you Sure, Delete Tour by name "{this.props.tour.name}" ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.props.onClose}>
              Cancel
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              autoFocus
              onClick={() => this.props.deleteTour()}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteTour: () => dispatch(deleteTourById(ownProps.tour.id)),
    dispatchCurrentMessage: message => dispatch(fetchCurrentMessage(message))
  }
}
const mapStateToProps = (state, props) => {
  const { OpenTourDeleteDialog } = state.ToursReducer.InitialToursReducer

  if (OpenTourDeleteDialog !== undefined) {
    state.ToursReducer.InitialToursReducer.OpenTourDeleteDialog = undefined
    return { open: OpenTourDeleteDialog }
  }
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TourDeleteDialog)
