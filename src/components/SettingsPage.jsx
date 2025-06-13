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
        <Link to="/">
          <div
            onClick={() => {
              navigator.vibrate(50);
            }}
            style={{
              color: "white",
              height: "3em",
              width: "11.5em",
              marginLeft: "0.4em",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Home size={26} />
          </div>
        </Link>
        <Link
          to="/SettingsPage"
          style={{ width: "50% ", position: "fixed", right: "0.4em" }}
        >
          <motion.div
            initial={{
              left: "-300px",
              position: "relative",
            }}
            animate={{ left: "0px", position: "relative" }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 90,
              damping: 15,
            }}
            onClick={() => {
              navigator.vibrate(50);
            }}
            style={{
              backgroundColor: "#2CFF2F",
              color: "black",
              height: "3em",
              width: "100%",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 0px 30px 1px rgba(50, 50, 50, 0.54)",
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
