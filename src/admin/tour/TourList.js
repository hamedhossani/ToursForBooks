import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { compose } from 'redux'

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TourListItem from './TourListItem';
import TourDeleteDialog from './TourDeleteDialog';
//import Tour from '../class/Tour'; 
import { fetchCloseMessage } from '../../page/action';//'./action';;
import { fetchInitialTours } from '../../tour/action';
import Message from '../../utils/Message';//'../../utils/Message';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  listItem: {
    'margin-bottom': '5px',
    'margin-left': '3px',
    'margin-right': '3px',
    'border': '1px solid #ccc',
    'border-radius': '4px',
    'background-color': '#f8f8f8'
  },
  itemRow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  }
});

class TourList extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);
    this.state = {
      tours: [],
      OpenTourDeleteDialog: false,
      OpenTourDeleteDialogTour: { id: '', name: '' }
    };

    this.handleClickOpenTourDeleteDialog = this.handleClickOpenTourDeleteDialog.bind(this);
    this.handleClickCloseTourDeleteDialog = this.handleClickCloseTourDeleteDialog.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.OpenTourDeleteDialog !== undefined && newProps.OpenTourDeleteDialog === false) {
      this.handleClickCloseTourDeleteDialog();
    }
  }
  componentWillMount() {
    this.props.dispatchFetchInitialTours()
  }
  handleClickOpenTourDeleteDialog(tour) {
    this.setState({
      OpenTourDeleteDialog: true,
      OpenTourDeleteDialogTour: tour
    });
  }
  handleClickCloseTourDeleteDialog() {
    this.setState({
      OpenTourDeleteDialog: false,
      OpenTourDeleteDialogTour: { id: '', name: '' }
    });
  }

  render() {
    const { classes } = this.props;
    const { message, messageOpen, dispatchCloseMessage } = this.props;

    return (
      <div>
        {this.props.tourLoading && <div>loading ...</div>}

        <List className={classes.root}>
          {(this.props.tours || []).map((tour, index) =>
            <TourListItem
              classes={classes}
              tour={tour}
              key={"tour" + index}
              OpenTourDeleteDialog={this.handleClickOpenTourDeleteDialog}
            />
          )}
        </List>
        <TourDeleteDialog
          open={this.state.OpenTourDeleteDialog}
          tour={this.state.OpenTourDeleteDialogTour}
          onClose={this.handleClickCloseTourDeleteDialog}
        />
        <Message
          message={message}
          messageOpen={messageOpen}
          handleCloseMessage={(event, reason) => dispatchCloseMessage(event, reason)}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { message, messageOpen } = state.MessageReducer.CurrentMessageReducer;
  const { tours, OpenTourDeleteDialog } = state.ToursReducer.InitialToursReducer;

  return {
    tours,
    message,
    messageOpen,
    OpenTourDeleteDialog,
    tourLoading: false
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatchCloseMessage: (event, reason) => dispatch(fetchCloseMessage(event, reason)),
  dispatchFetchInitialTours: () => dispatch(fetchInitialTours())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TourList)); 