import React, { Component } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'

class SignInPage extends Component {
  state = {
    uiConfig: {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      callbacks: {
        signInSuccess: this.props.signInSuccess
      },
      // We will display Google and Facebook as auth providers.
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    }
  }
  render() {
    return (
      <div>
        <StyledFirebaseAuth
          uiConfig={this.state.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    )
  }
}

export default SignInPage
