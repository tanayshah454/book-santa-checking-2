import firebase from 'firebase'

require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyCF9J7lP9RQPToClsdrZes-pPeaF-xEYaQ",
    authDomain: "book-santa-3e632.firebaseapp.com",
    projectId: "book-santa-3e632",
    storageBucket: "book-santa-3e632.appspot.com",
    messagingSenderId: "737163119473",
    appId: "1:737163119473:web:36fdd3f005a465968cc4d0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 export default firebase.firestore()