import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "../firebase.jsx";

function SignIn() {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      hd: "iiitkottayam.ac.in",
    });
    auth.signInWithPopup(provider);
  }
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In</button>
    </div>
  );
}

export default SignIn;
