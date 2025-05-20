import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import SignOut from "./SignOut";
import { supabase } from "../supabase";
import SplashScreenStatic from "./SplashScreenStatic";
import SettingsPage from "./SettingsPage";
import BookingPage from "./BookingPage";
import { Home, Settings, ArrowLeft } from "react-feather";
import { Link, useNavigate } from "react-router-dom";

function HomePage({ currentHostelData, currentUserData }) {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const { email, photoURL } = auth.currentUser;
  const navigate = useNavigate();

  return (
    <div>
      {selectedFloor !== null && (
        <div className="topBarBookingPage">
          <div className="appBGBooking"></div>
          <button
            className="backButton"
            onClick={() => {
              navigator.vibrate(50);
              setSelectedFloor(null);
            }}
          >
            <ArrowLeft />
          </button>
          <p>Floor {selectedFloor} Slot Booking</p>
        </div>
      )}
      {selectedFloor === null && (
        <div className="topBarHomePage">
          <div className="topBarLeftHomePage">
            <p className="appNameHomePage">Wash.io</p>
          </div>
          <div className="userDetailsHomePage">
            <p className="userPlanHomePage">{currentUserData.plan}</p>
            <Link to="/SettingsPage">
              <img
                className="userPhotoHomePage"
                alt="user photo"
                src={photoURL}
                onClick={() => {
                  navigator.vibrate(50);
                  setSelectedFloor(null);
                }}
              ></img>
            </Link>
          </div>
        </div>
      )}
      {selectedFloor !== null ? (
        <div>
          <BookingPage
            floorNo={selectedFloor}
            hostelData={currentHostelData}
            userData={currentUserData}
          />
        </div>
      ) : (
        <div>
          Select your Floor
          <p>{currentUserData.hostelName}</p>
          <div className="floorBoxContainer">
            {Array.from({ length: currentHostelData.noOfFloors }, (_, i) => (
              <Link to={`/BookingPage/${i}`}>
                <div
                  className="singleFloorBox"
                  onClick={() => {
                    navigator.vibrate(50);
                    setSelectedFloor(i);
                  }}
                >
                  {i}
                </div>
              </Link>
            ))
              .reduce((acc, curr, index) => {
                if (index % 3 === 0) acc.push([]);
                acc[acc.length - 1].push(curr);
                return acc;
              }, [])
              .map((row, rowIndex) => (
                <div className="floorRow" key={rowIndex}>
                  {row}
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="bottomBarHomePage">
        <Link to="/">
          <div
            onClick={() => {
              navigator.vibrate(50);
              setSelectedFloor(null);
            }}
            className="bottomBarIconHomePage"
          >
            <Home />

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
        <Link to="/SettingsPage">
          <div
            onClick={() => {
              navigator.vibrate(50);
              setSelectedFloor(null);
            }}
            className="bottomBarIconHomePage"
          >
            <Settings />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
