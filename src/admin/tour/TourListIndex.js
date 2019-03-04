import React from 'react';
import { withRouter } from 'react-router-dom'; 
import { Consumer } from '../AppProvider';
import TourList from './TourList';
import { connect } from 'react-redux';
 

const TourListIndex = props => <Consumer>
  {({ state, ...context }) => (
    <div className="container">
         <TourList props={props}/>
    </div>
  )}
</Consumer>;

const mapStateToProps = state => {
  return null;
  return {
    tourList: state.tourList
  };
};
const mapDispatchToProps = dispatch => {
  // console.log('TourListIndex mapDispatchToProps');
  // const result = {
  //   tourList: () => {
  //     dispatch(fetchToursList());
  //   }
  // };
  // console.log(result);
  return null;
};
export default  withRouter(TourListIndex);