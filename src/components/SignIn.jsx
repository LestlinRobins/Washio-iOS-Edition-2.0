import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "../firebase.jsx";
import SplashScreenStatic from "./SplashScreenStatic.jsx";
import { motion } from "motion/react";

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
      <motion.img
        src="/illustrations/login.svg"
        alt="Description"
        width="300"
        className="login-illustration"
        initial={{ opacity: 0, filter: "blur(10px)", x: "-100px" }}
        animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
        transition={{
          duration: 0.6,
          delay: 0.1,
          type: "spring",
          stiffness: 100,
        }}
      />
      <motion.h1
        style={{
          fontSize: "40px",
          alignSelf: "center",
          textAlign: "center",
          lineHeight: "150%",
          position: "relative",
          top: "3vh",
        }}
        initial={{ opacity: 0, filter: "blur(10px)", x: "-100px" }}
        animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          type: "spring",
          stiffness: 100,
        }}
      >
        Let's get you <br />
        signed in!
      </motion.h1>
      <motion.p
        style={{
          alignSelf: "center",
          fontFamily: "Albert Sans",
          fontStyle: "italic",
          color: "#959595",
          fontWeight: "400",
          marginTop: "0.5rem",
          fontSize: "17px",
        }}
        initial={{ opacity: 0, filter: "blur(10px)", x: "-100px" }}
        animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
        transition={{
          duration: 0.6,
          delay: 0.5,
          type: "spring",
          stiffness: 100,
        }}
      >
        Just for the good vibes.
      </motion.p>
      <motion.button
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
          outline: "none",
          border: "none",
          WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
          transition: "all 0.1s ease",
        }}
        onTouchStart={(e) => {
          e.target.style.backgroundColor = "rgb(44, 255, 48)";
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0px 0px 30px 1px rgba(0, 255, 34, 0.54)";
          // e.target.style.filter = "blur(2px)";
          e.target.style.transition = "all 0.1s ease";
        }}
        onTouchEnd={(e) => {
          e.target.style.backgroundColor = "#2CFF2F";
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "none";
          // e.target.style.filter = "blur(0px)";
          e.target.style.transition = "all 0.8s ease";
        }}
        initial={{
          opacity: 0,
          filter: "blur(10px)",
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
        }}
        transition={{ duration: 0.6, delay: 1.3 }}
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </motion.button>
      <motion.p
        style={{
          position: "absolute",
          bottom: "1vh",
          color: "gray",
          textAlign: "center",
          fontSize: "12px",
          width: "80vw",
          fontFamily: "Albert Sans",
          fontStyle: "italic",
        }}
        initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        You log in, we assume you're cool with the{" "}
        <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">
          terms of service
        </a>
        . That's how trust works, right?{" "}
      </motion.p>
    </div>
  );
}

export default SignIn;
