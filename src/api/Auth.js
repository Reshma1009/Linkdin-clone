import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase.config";

export let RegistationAuthintacation = (email, password) => {
  try {
    return createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error;
  }
};
export let LoginAuthintacation = (email, password) => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error;
  }
};
export let ResetEmailAuthintacation = (email) => {
  try {
    return sendPasswordResetEmail(auth, email);
  } catch (error) {
    return error;
  }
};

