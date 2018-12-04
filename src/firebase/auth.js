import { auth, fs } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
    auth.signOut();

// Password Reset
export const doPasswordReset = (email) =>
    auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
    auth.currentUser.updatePassword(password);

export const getCurrentUser = () => {
    let uid = auth.currentUser.uid;
    let docRef = fs.collection('users').doc(uid)
    return docRef.get()
        .then((doc) => {

            if (doc.exists) {
                //console.log("Document data:", doc.data().role);
                return doc.data().role;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });

}
