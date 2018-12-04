import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

const firebaseconfig = {
    apiKey: "AIzaSyDGjahq71fdElx3kW7CDR2zGOKA4FBCfdM",
    authDomain: "chatbout-7.firebaseapp.com",
    databaseURL: "https://chatbout-7.firebaseio.com",
    projectId: "chatbout-7",
    storageBucket: "chatbout-7.appspot.com",
    messagingSenderId: "695070527241"
};
firebase.initializeApp(firebaseconfig);

firebase.firestore().settings(settings);

const fs = firebase.firestore();
const db = firebase.database();
const auth = firebase.auth();

export {
    fs,
    db,
    auth,
}