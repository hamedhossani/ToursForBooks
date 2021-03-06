const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const admin = require('firebase-admin')

const api = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.PROJECT_ID + '.firebaseapp.com',
  projectId: process.env.PROJECT_ID,
  databaseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.DATABASE_URL
      : functions.config().key.database_url,

  storageBucket:
    process.env.NODE_ENV === 'development'
      ? process.env.STORAGE_BUCKET
      : functions.config().key.storage_bucket
}

admin.initializeApp(api)

exports.getTours = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    admin
      .database()
      .ref('tours')
      .once('value', data => res.status(200).send(data.val()))
  })
})

exports.getTour = functions.https.onRequest((req, res) => {
  const { id } = req.query // ???
  return cors(req, res, () => {
    admin
      .database()
      .ref('/tours/' + id)
      .once('value', data => res.status(200).send(data.val()))
  })
})

exports.addTour = functions.https.onRequest((req, res) => {
  const body = JSON.parse(req.body)
  if (body && body.idToken) {
    return cors(req, res, () => {
      admin
        .auth()
        .verifyIdToken(body.idToken)
        .then(function(decodedToken) {
          const uid = decodedToken.uid
          admin
            .database()
            .ref('whitelist')
            .once('value', data => {
              const whitelist = data.val()
              if (whitelist[uid]) {
                admin
                  .database()
                  .ref('/tours_test')
                  .push()
                  .set({ name: 'new item' }, error => {
                    if (error) {
                      res.status(500).send(error)
                    } else {
                      res.status(200).send('Created')
                    }
                  })
              } else {
                res.status(400).send('Unauthorized')
              }
            })
        })
        .catch(function(error) {
          res.status(500).send(error)
        })
    })
  } else {
    res.status(403).send('Bad request')
  }
})
// Get one image's link by its name
// export const getImage = functions.https.onRequest((req, res) => {
//   const {folder, name} = req
//   res.send({
//     link: `https://storage.googleapis.com/${storageBucket}/${folder}/${name}`
//   });
// }

// Get all images links in one folder
// // Upload images on Firebase have to be .jpg
// export const getTour = functions.https.onRequest((req, res) => {
//   const {folder} = req
//   const options = {
//     prefix: `${folder}/`,
//     delimiter: "/"
//   };
//   functions.storage
//     .bucket()
//     .getFiles(options)
//     .then(links => {
//       res.send({ links: links });
//     });
// }
