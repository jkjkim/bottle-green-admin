import firebase from "firebase";
import 'firebase/auth/dist/index.cjs';
import 'firebase/firestore/dist/index.cjs';
const admin = require('firebase-admin');

var config = {
    apiKey: "AIzaSyBlKExhDlFYr9hM2CCv30FSMG9Wz0gLz3I",
    authDomain: "bottle-green-86d30.firebaseapp.com",
    databaseURL: "https://bottle-green-86d30.firebaseio.com",
    projectId: "bottle-green-86d30",
    storageBucket: "",
    messagingSenderId: "1032627040748"
};

firebase.initializeApp(config);

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
})


var serviceAccount = require('../adminCred.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bottle-green.firebaseio.com'
});

admin.database.enableLogging(true);


export {firebase, db, admin};