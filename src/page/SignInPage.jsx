import React, { Component } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'

class SignInPage extends Component {
  state = {
    uiConfig: {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      signInSuccessUrl: this.props.signInSuccessUrl,
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      callbacks: {
        //signInSuccess: this.props.signInSuccess
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
      },
      // We will display Google and Facebook as auth providers.
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    }
  }
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({ isSignedIn: !!user },
        () => {
          if (this.state.isSignedIn === true) {
            this.props.signInSuccess();
          }
        })
    );
  }
  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <StyledFirebaseAuth
            uiConfig={this.state.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      )
    } else {
      return (
        <div>
          <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
          <span style={{
            padding: 10,
            border: '1px solid',
            borderRadius: 8,
            backgroundColor: '#ccc',
            cursor: 'pointer'
          }}
            onClick={
              () => {
                this.props.handleSignOut()
              }
            }>Sign-out</span>
        </div>
      );
    }
  }
}
export default SignInPage
