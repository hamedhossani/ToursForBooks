
import React, {Component,createContext} from 'react';
import * as  firebaseAuth  from './firebase/firebase';
import { createStore, combineReducers, compose,applyMiddleware  } from 'redux' ;
import thunk from 'redux-thunk';
import reducers from './store/reducer';
import {fetchToursList} from './store/action';

  export const {Provider,Consumer} = createContext();  
  class AppProvider extends Component {
    constructor(props) {
      super(props);
      // Don't do this!
      this.state = {
        currentUser: AppProvider.defaultProps.currentUser,
        message: AppProvider.defaultProps.message
      }   
      // const store = createStore(reducers,  applyMiddleware(thunk));
      // var ddd= store.dispatch(fetchToursList());
      //  console.log('createStore(reducers,  applyMiddleware(thunk))');
      //  console.log(props);
     }
  
    componentDidMount() {
      firebaseAuth.auth.onAuthStateChanged(user => user && this.setState({
        currentUser: user
      }))
    } 
    render() {
      //this.store.dispatch(fetchToursList());
      return (
        <Provider  value={{
          state: this.state,
          destroySession: () => this.setState({ 
            currentUser: AppProvider.defaultProps.currentUser 
          }),
          setMessage: message => this.setState({ message }),
          clearMessage: () => this.setState({ 
            message: AppProvider.defaultProps.message 
          })
        }}> 
        {/* <ReactReduxFirebaseProvider {...rrfProps}>
          {this.props.children}
        </ReactReduxFirebaseProvider>           */}
       
        {this.props.children}
         
        </Provider>
      )
    }
  }
  
  AppProvider.defaultProps = {
    currentUser: null,
    message: null
  }
  
  export default AppProvider;