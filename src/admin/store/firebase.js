import * as firebase from "firebase";

import { devConfig } from "../firebase/config";

let firebaseApp = null;
    if (!firebase.apps.length) {
        firebaseApp = firebase.initializeApp(devConfig);
    }else{
        firebaseApp = firebase.app();
    }

const database = firebase.database();
const databaseRef = firebase.database().ref();
const toursRef = databaseRef.child("tours_test");
const toursTestRef = databaseRef.child("tours_test");

export {
    toursRef,
    toursTestRef,
    database,
    firebase,
    databaseRef,
    firebaseApp
}