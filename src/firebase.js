import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCMOAflnX0-roEvcPvqAI6QSVimFtEcBpI",
    authDomain: "clone-decc1.firebaseapp.com",
    databaseURL: "https://clone-decc1.firebaseio.com",
    projectId: "clone-decc1",
    storageBucket: "clone-decc1.appspot.com",
    messagingSenderId: "637752841752",
    appId: "1:637752841752:web:27f5bc84ab9e0c9887556d",
    measurementId: "G-XEWQMP20K3"
};
firebase.initializeApp(config);
const auth = firebase.auth();
const db = firebase.database();

export { auth, db };