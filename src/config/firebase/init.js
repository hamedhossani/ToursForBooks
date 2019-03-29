import * as firebase from 'firebase'

import { devConfig } from '../config'

let firebaseApp = null
console.log(firebase.apps.length)
console.log(devConfig)
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(devConfig)
} else {
  firebaseApp = firebase.app()
}

export const database = firebaseApp.database()
export const databaseRef = firebaseApp.database().ref()
export const toursRef = databaseRef.child('tours_test')
export const toursTestRef = databaseRef.child('tours_test')

export default {
  toursRef,
  toursTestRef,
  database,
  firebase,
  databaseRef,
  firebaseApp
}
