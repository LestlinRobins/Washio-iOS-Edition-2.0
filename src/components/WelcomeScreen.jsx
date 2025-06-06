import React, { useState, useEffect } from "react";
import SplashScreenStatic from "./SplashScreenStatic.jsx";
import { motion } from "motion/react";

function WelcomeScreen({ setStartSelected }) {
  const text = "Meet Wash.io!";
  const tagline = "Laundry drama? Nah, just vibes.";

  return (
    <div className="welcome-screen-container">
      <motion.img
        src="/illustrations/start.svg"
        alt="Description"
        width="400"
        className="welcome-illustration"
        initial={{ opacity: 0, filter: "blur(10px)", x: "-10px", y: "-10px" }}
        animate={{ opacity: 1, filter: "blur(0px)", x: "0px", y: "0px" }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      <motion.h1
        style={{
          fontSize: "40px",
          alignSelf: "center",
          textAlign: "center",
          lineHeight: "150%",
          position: "relative",
          top: "2.5vh",
        }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              filter: "blur(10px)",
              x: "-10px",
              y: "-10px",
            }}
            animate={{ opacity: 1, filter: "blur(0px)", x: "0px", y: "0px" }}
            transition={{ duration: 0.6, delay: 1.3 + index * 0.03 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        style={{
          alignSelf: "center",
          fontFamily: "Albert Sans",
          fontStyle: "italic",
          color: "#959595",
          fontWeight: "400",
          marginTop: "0rem",
          fontSize: "17px",
        }}
      >
        {tagline.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              filter: "blur(10px)",
              x: "-10px",
              y: "-10px",
            }}
            animate={{ opacity: 1, filter: "blur(0px)", x: "0px", y: "0px" }}
            transition={{ duration: 0.6, delay: 1.8 + index * 0.02 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
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
          e.target.style.transition = "all 0.1s ease";
        }}
        onTouchEnd={(e) => {
          e.target.style.backgroundColor = "#2CFF2F";
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "none";
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
        transition={{ duration: 0.6, delay: 2.7 }}
        onClick={() => setStartSelected(true)}
      >
        Get started!
      </motion.button>
    </div>
  );
}

export default WelcomeScreen;
