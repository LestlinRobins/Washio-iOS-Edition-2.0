import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import SignOut from "./SignOut";
import { supabase } from "../supabase";
import { Link, useNavigate } from "react-router-dom";
import { Home, Settings, ArrowLeft } from "react-feather";
import { motion } from "motion/react";
function SettingsPage({ currentUserData }) {
  const { email, photoURL } = auth.currentUser;
  const navigate = useNavigate();

  return (
    <div>
      <div className="topBarBookingPage">
        <button
          className="backButton"
          onClick={() => {
            navigator.vibrate(50);
            navigate("/");
          }}
        >
          <ArrowLeft />
        </button>
        <p>Settings</p>
      </div>

      <img src={photoURL} alt="Profile" />
      <p>{currentUserData.name}</p>
      <p>{currentUserData.emailID}</p>
      <p>{currentUserData.hostelName}</p>
      <p>{currentUserData.roomNo}</p>
      <SignOut />
      <div className="bottomBarHomePage">
        <Link to="/" style={{ flex: 1 }}>
          <motion.div
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1, ease: "easeInOut" },
            }}
            onClick={() => {
              navigator.vibrate(50);
            }}
            style={{
              color: "white",
              height: "3em",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 0.2em",
              minWidth: 0, // Prevents flex item from overflowing
            }}
          >
            <Home size={26} />
          </motion.div>
        </Link>

        <Link to="/SettingsPage" style={{ flex: 1 }}>
          <motion.div
            initial={{
              x: -300,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 90,
              damping: 15,
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1, ease: "easeInOut" },
            }}
            onClick={() => {
              navigator.vibrate(50);
            }}
            style={{
              backgroundColor: "#2CFF2F",
              color: "black",
              height: "3em",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 0px 30px 1px rgba(50, 50, 50, 0.54)",
              margin: "0 0.2em",
              minWidth: 0, // Prevents flex item from overflowing
            }}
          >
            <Settings size={26} />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

export default SettingsPage;
