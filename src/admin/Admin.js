import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link,withRouter,Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import AppProvider, {  Consumer } from './AppProvider';
import Login from './Login';
import Signup from './Signup';

import Navbar from './Navbar';
import FlashMessage from './FlashMessage';
import HomePage from './page/HomePage';
import SignedOutPage from './page/SignedOutPage';
import AccountCreatedPage from './page/AccountCreatedPage';
import DashboardPage from './page/DashboardPage';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import TourIndex from './tour/TourIndex';
import TourListIndex from './tour/TourListIndex';

import Dashboard from "./template/layouts/Dashboard/Dashboard";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Admin extends Component {
  render() {

    return (    
      <AppProvider>
        <Router >
          <Fragment>
            {/* <Navbar/>              */}
            <FlashMessage />
            <Grid container spacing={16}>
                 <Grid item xs={3}>
                    <Paper className={styles.paper}>
                        <Link to="/admin/tour"> Add New Tour</Link> 
                        <br/>
                        <Link to="/admin/tours"> Tours</Link> 
                    </Paper>                           
                  </Grid>
                 <Grid item xs={9}>
                  <Paper className={styles.paper}>
                    <Switch>
                      <Route exact path="/admin" component={() => <HomePage />} />              
                      <Route exact path="/admin/login" component={() => <Login />} />
                      <Route exact path="/admin/signup" component={() => <Signup />} />        
                      <Route exact path="/admin/dashboard" component={() => 
                        <Consumer>
                        {                
                          ({ state, ...context })  => state.currentUser ?  
                            <div className="container">                            
                               <h1 className="content">Protected dashboard!</h1>                                                                                      
                            </div>
                            :
                            <div className="container"> 
                                <div className="content">
                                  <h1>Access denied.</h1>
                                  <p>You are not authorized to access this page.</p>
                                  <br/>
                                  <Link to="/admin/login"> Proceed to Login</Link> 
                                </div>
                            </div>              
                        }              
                      </Consumer>
                      } />
                      <Route exact path="/admin/signedOut" component={() => <SignedOutPage/>} />
                      <Route exact path="/admin/accountCreated" component={() => <AccountCreatedPage/>} />

                      <Route exact path="/admin/tour" component={() => <TourIndex/>} />
                      {/* <Route exact path="/admin/tour" component={() => <Consumer>
                        {                
                          ({ state, ...context })  => state.currentUser ?  
                             <TourIndex/>
                            :
                            <div className="container"> 
                                <div className="content">
                                  <h1>Access denied.</h1>
                                  <p>You are not authorized to access this page.</p>
                                  <br/>
                                  <Link to="/admin/login"> Proceed to Login</Link> 
                                </div>
                            </div>              
                        }              
                      </Consumer>} /> */}
                      <Route exact path="/admin/tour/:id?" component={(props) => <TourIndex id={props.match.params.id} />} />
                      <Route exact path="/admin/tours" component={() => <TourListIndex props={this.props}/>} />                                          
                    </Switch>
                </Paper>
               </Grid>
              </Grid> 
          </Fragment>
        </Router>
      </AppProvider>
    );
  }
}

export default withRouter(Admin);