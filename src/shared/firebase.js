import * as firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: 'AIzaSyCIPg-zS-WLDCdS11P4jKPZt6w95Wjs5OI',
    authDomain: 'react-burger-builder-3d148.firebaseapp.com',
    databaseURL:
        'https://react-burger-builder-3d148-default-rtdb.firebaseio.com',
    projectId: 'react-burger-builder-3d148',
    storageBucket: 'react-burger-builder-3d148.appspot.com',
    messagingSenderId: '817401606464',
    appId: '1:817401606464:web:392e47fb7a89863ff0caa5',
    measurementId: 'G-55B2ZYTKQT'
});

export const auth = firebase.auth();
const googleProvider = new auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider)
        .then((res) => {
            console.log(res.user);
        })
        .catch((error) => {
            console.log(error.message);
        });
};
