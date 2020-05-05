import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config={
    apiKey: "AIzaSyAAp0kak9IONM6HvdAbETxV36z9qcFZAG8",
    authDomain: "crwn-90fea.firebaseapp.com",
    databaseURL: "https://crwn-90fea.firebaseio.com",
    projectId: "crwn-90fea",
    storageBucket: "crwn-90fea.appspot.com",
    messagingSenderId: "802193182314",
    appId: "1:802193182314:web:ace89c7f171018c4818413",
    measurementId: "G-DJQLG26E5P"
  };

  export const createUserProfileDocument=async(userAuth,additionalData)=>{
      if(!userAuth) return;

      const userRef=firestore.doc(`users/${userAuth.uid}`);
      const snapShot=userRef.get();

      if(!snapShot.exists){
        const {displayName,email}=userAuth;
        const createdAt=new Date();
        try{
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })

        } catch(error){
          console.log('error creating user',error)
        }
      }

      return userRef;
  }

  firebase.initializeApp(config);

  export const auth=firebase.auth();
  export const firestore=firebase.firestore();
  const provider=new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle=()=>auth.signInWithPopup(provider);

  export default firebase;