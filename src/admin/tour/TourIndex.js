import React from 'react';
import { withRouter } from 'react-router-dom'; 
import { Consumer } from '../AppProvider';
import TourAdd from './TourAdd';
import TourList from './TourList';

 

const TourIndex = props => <Consumer>
  {({ state, ...context }) => (
    <div className="container">
         <TourAdd id={props.id} />
         <br/>        
         {/* <TourList /> */}
    </div>
  )}
</Consumer>;

export default withRouter(TourIndex);