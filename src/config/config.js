const SERVER_URI = `https://${process.env.REACT_APP_ZONE1}-${
  process.env.REACT_APP_PROJECT_ID
}.${process.env.REACT_APP_ZONE2}`

export default SERVER_URI

const devConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_PROJECT_ID + '.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABSE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID
}

export { devConfig }
