import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
 
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TourListItem from './TourListItem';
import TourDeleteDialog from './TourDeleteDialog';
import Tour from '../class/Tour';
import { fetchToursList } from '../store/action';  
import { fetchCloseMessage } from '../../page/action';//'./action';;
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
  listItem:{        
    'margin-bottom': '5px',
    'margin-left': '3px',
    'margin-right': '3px',
    'border': '1px solid #ccc',
    'border-radius': '4px',
    'background-color': '#f8f8f8'},
  itemRow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  }
}); 

class TourList extends Component{ 
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props); 
    this.state = {
      tourList: [],
      OpenTourDeleteDialog : false,
      OpenTourDeleteDialogTour :{id:'',name:''},
      tourLoading : false
    };
    console.log(props);
    this.handleClickOpenTourDeleteDialog = this.handleClickOpenTourDeleteDialog.bind(this);
    this.handleClickCloseTourDeleteDialog = this.handleClickCloseTourDeleteDialog.bind(this);

    this.tourLoading = true;
     console.log('dispatch action fetchToursList');
    //  this.props.dispatch(fetchToursList()).then((e)=>{ 
    //     this.tourLoading = false; 
    //   }); 
    this.props.fetchToursList().then((e)=>{ 
          this.tourLoading = false; 
        }); 
  }
   
  // componentDidMount(){ 
    componentWillMount(){ 
    // databaseRef.child('tours_test').orderByKey().once('value', snap => {
    //        snap.forEach(child => {
    //          var item = child.val();
    //           console.log(item);
    //         //  console.log(item.type);
             
    //          this.setState({ tourList:[...this.state.tourList, {
    //               name : item.name,
    //               type :item.type,
    //               boughts : item.boughts,
    //               description : item.description,
    //               images : item.images
    //             }]
    //            });
    //        });
    //    }); 
    //  this.tourLoading = true;
    //  console.log('dispatch action fetchToursList');
    //  this.props.dispatch(fetchToursList()).then((e)=>{ 
    //     this.tourLoading = false; 
    //   }); 
      }
      componentWillReceiveProps(newProps) {
        console.log('Component WILL RECIEVE PROPS! tour list')
        console.log(newProps);
        console.log('this.state');
        console.log(this.state);
        if ( newProps.OpenTourDeleteDialog !== undefined && newProps.OpenTourDeleteDialog === false  ) 
        {
          //this.setState({OpenTourDeleteDialog : newProps.OpenTourDeleteDialog});
          this.handleClickCloseTourDeleteDialog();
        }
        console.log('this.state');
        console.log(this.state);
      }
      handleClickOpenTourDeleteDialog (tour) {
        this.setState({ 
          OpenTourDeleteDialog: true,
          OpenTourDeleteDialogTour: tour
           });
      }
      handleClickCloseTourDeleteDialog () {
        console.log('handleClickCloseTourDeleteDialog');
        this.setState({ 
          OpenTourDeleteDialog: false,
          OpenTourDeleteDialogTour: {id:'',name:''}
        });
      }
      
      // shouldComponentUpdate(nextProps, nextState) {
      //   console.log(this.props.tourList, nextProps.tourList)
      //   if (nextProps.tourList !== this.props.tourList) {
      //     return true;
      //   }
      //   return false; //this is the missing piece
      // } 
       render() {
        const { classes } = this.props;
        const { message, messageOpen, dispatchCloseMessage } = this.props;
        console.log('this.props.tourList');
        console.log(this.props.tourList);
        return (
        
          <div>
            {/* {this.tourLoading && <div>loading ...</div>} */}
            <List className={classes.root}>
              {(this.props.tourList || []).map((tour,index) => 
                  <TourListItem 
                  classes={classes} 
                  tour={tour} 
                  key={"tour" + index}   
                  OpenTourDeleteDialog={this.handleClickOpenTourDeleteDialog} 
                  />                  
                )}
            </List>           
            <TourDeleteDialog 
              open={this.state.OpenTourDeleteDialog } 
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
  console.log('state tour list');
  console.log(state);
  const {  message, messageOpen }  = state.MessageReducer.CurrentMessageReducer ; 
  const {  tourList , OpenTourDeleteDialog }  = state.AdminReducers.InitialToursReducer;
  
  return {
    tourList : tourList,
    message,
    messageOpen,
    OpenTourDeleteDialog
  };
}; 
const mapDispatchToProps = (dispatch) => ({
    dispatchCloseMessage: (event, reason) => dispatch(fetchCloseMessage(event, reason)),
    fetchToursList: () => dispatch(fetchToursList()) 
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TourList));