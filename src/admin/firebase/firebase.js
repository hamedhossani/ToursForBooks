// import {devConfigFirebase} from '../../../app'

import * as firebase from 'firebase';
 
import React, {
  Component,
  createRef
} from 'react';
 
//.env
// FIREBASE_API_KEY=AIzaSyDX8HXto42pWC12zdcZwrt-RIPScFyJBik
// FIREBASE_AUTH_DOMAIN=bloggy-170620.firebaseapp.com
// FIREBASE_PROJECT_ID=bloggy-170620
// DB_URL=https://bloggy-170620.firebaseio.com 
// STORAGE_BUCKET=bloggy-170620.appspot.com
// FIREBASE_MESSAGEING_SENDER_ID=634344137184
const devConfig = {
  apiKey: "AIzaSyDX8HXto42pWC12zdcZwrt-RIPScFyJBik",
  authDomain: "bloggy-170620.firebaseapp.com",
  databaseURL: "https://bloggy-170620.firebaseio.com",
  projectId: "bloggy-170620",
  storageBucket: "bloggy-170620.appspot.com",
  messagingSenderId: "634344137184"
};
// const devConfig = {
//   apiKey: "AIzaSyBarb9rJT4PKNxNrI-nz-e0NGjL2jP-IFM",
//   authDomain: "testreact-319d5.firebaseapp.com",
//   databaseURL: "https://testreact-319d5.firebaseio.com",
//   projectId: "testreact-319d5",
//   storageBucket: "testreact-319d5.appspot.com",
//   messagingSenderId: "164637775885"
// };

//devConfigFirebase in app.js declear
//console.log(devConfig);
!firebase.apps.length && firebase.initializeApp(devConfig);

const auth = firebase.auth();

export {
  auth
}