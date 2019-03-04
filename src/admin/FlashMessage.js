import React from 'react';
import { Consumer } from './AppProvider';

const FlashMessage = () => <Consumer>
  {({ state, ...context }) => state.message &&
  <div className="container"> 
    <div className="card red darken-1"> 
        <div className="card-content white-text">
          <p  className="flash-message">
            {state.message}
            <button type="button" onClick={() => context.clearMessage()} className="btn">Ok</button>
           </p>
        </div>
    </div>
   </div>
}
</Consumer>;

export default FlashMessage;