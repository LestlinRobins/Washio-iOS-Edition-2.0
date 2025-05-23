import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import SignOut from "./SignOut";
import { supabase } from "../supabase";
import { Link, useNavigate } from "react-router-dom";
import { Home, Settings, ArrowLeft } from "react-feather";

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
            className="bottomBarIconHomePage"
          >
            <Home />
          </div>
        </Link>
        <Link to="/SettingsPage">
          <div
            onClick={() => {
              navigator.vibrate(50);
            }}
            className="bottomBarIconHomePage"
          >
            <Settings />

            <p
              style={{
                padding: "0px",
                margin: "0px",
                fontWeight: "800",
                marginTop: "-10px",
                alignSelf: "center",
                fontSize: "20px",
                marginBottom: "-10px",
              }}
            >
              —
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SettingsPage;
