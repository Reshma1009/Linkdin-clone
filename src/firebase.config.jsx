// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPg9pWg89A-f51kvW3MimOXLIgAQbugYc",
  authDomain: "linkdin-clone-9d251.firebaseapp.com",
  projectId: "linkdin-clone-9d251",
  storageBucket: "linkdin-clone-9d251.appspot.com",
  messagingSenderId: "532627410388",
  appId: "1:532627410388:web:66b1fd34073684396bda41",
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );
const auth = getAuth( app )
export { auth, app };
// export default firebaseConfig;