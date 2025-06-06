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
      <img
        src="/illustrations/login.svg"
        alt="Description"
        width="300"
        className="login-illustration"
      />
      <h1
        style={{
          fontSize: "40px",
          alignSelf: "center",
          textAlign: "center",
          lineHeight: "150%",
          position: "relative",
          top: "3vh",
        }}
      >
        Let's get you <br />
        signed in!
      </h1>
      <p
        style={{
          alignSelf: "center",
          fontFamily: "Albert Sans",
          fontStyle: "italic",
          color: "#959595",
          fontWeight: "400",
          marginTop: "0.5rem",
          fontSize: "17px",
        }}
      >
        Just for the good vibes.
      </p>
      <button
        style={{
          alignSelf: "center",
          backgroundColor: "#2CFF2F",
          color: "black",
          position: "absolute",
          bottom: "12vh",
          width: "70vw",
          borderRadius: "25px",
          height: "60px",
          fontSize: "20px",
        }}
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
      <p
        style={{
          position: "absolute",
          bottom: "1vh",
          left: "50%",
          transform: "translateX(-50%)",
          color: "gray",
          textAlign: "center",
          fontSize: "12px",
          width: "80vw",
          fontFamily: "Albert Sans",
          fontStyle: "italic",
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
