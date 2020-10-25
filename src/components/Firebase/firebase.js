import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyALRFBjQFMQ9mwfuU97JzPrDSNl6XTi7ok",
  authDomain: "dream-journal-ad06e.firebaseapp.com",
  databaseURL: "https://dream-journal-ad06e.firebaseio.com",
  projectId: "dream-journal-ad06e",
  storageBucket: "dream-journal-ad06e.appspot.com",
  messagingSenderId: "347770236687",
  appId: "1:347770236687:web:0f44173a891d31d634987a",
  measurementId: "G-XQDM5DGEDC",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database();
  }

  user = (uid) => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");

  /*** Authentication  ***/
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  addDream = (uid, dream) => {
    const ref = this.db.ref().child(`users/${uid}/dreams`);
    ref.push(dream);
  };

  updateDream = (uid, dream, dreamKey) => {
    const ref = this.db.ref().child(`users/${uid}/dreams/${dreamKey}`);
    ref.update(dream);
  };
}

export default Firebase;
