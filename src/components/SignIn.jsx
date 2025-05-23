import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "../firebase.jsx";
import SplashScreenStatic from "./SplashScreenStatic.jsx";

function SignIn() {
  const [loading, setLoading] = useState(false);

  function signInWithGoogle() {
    navigator.vibrate(50);
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      hd: "iiitkottayam.ac.in",
    });
    auth.signInWithPopup(provider).finally(() => setLoading(false));
  }
  if (loading) {
    return <SplashScreenStatic />;
  }
  return (
    <div className="sign-in-screen-container">
      <h1
        style={{
          fontSize: "40px",
          alignSelf: "flex-start",
          textAlign: "left",
          marginLeft: "10vw",
        }}
      >
        Welcome to <br />
        Wash.io
      </h1>
      <p style={{ alignSelf: "flex-start", marginLeft: "10vw" }}>
        First things first, let's get you signed in
      </p>
      <button style={{ alignSelf: "center" }} onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p
        style={{
          position: "absolute",
          bottom: "5vh",
          left: "50%",
          transform: "translateX(-50%)",
          color: "gray",
          textAlign: "center",
          fontSize: "12px",
          width: "80vw",
        }}
      >
        By signing in, you confirm you’ve read Wash.io's{" "}
        <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">
          terms of service
        </a>
        , and that you're okay with it.
      </p>
    </div>
  );
}

export default SignIn;
