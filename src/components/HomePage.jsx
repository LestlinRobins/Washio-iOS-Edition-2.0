import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import SignOut from "./SignOut";
import { supabase } from "../supabase";
import SplashScreenStatic from "./SplashScreenStatic";
import SettingsPage from "./SettingsPage";
import { Home, Settings } from "react-feather";

function HomePage() {
  const [currentUserData, setCurrentUserData] = useState({});
  const [currentHostelData, setCurrentHostelData] = useState({});
  const { photoURL, email } = auth.currentUser;
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  async function getUsers() {
    const { data: userData, error } = await supabase
      .from("users")
      .select()
      .eq("emailID", email)
      .single();
    if (error) {
    } else {
      setCurrentUserData(userData);
    }
  }

  async function getHostelData() {
    const { data: hostelData, error } = await supabase
      .from("Hostels")
      .select()
      .eq("hostelName", currentUserData.hostelName)
      .single();
    if (error) {
    } else {
      setCurrentHostelData(hostelData);
    }
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await getUsers();
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUserData.hostelName) {
      async function fetchHostelData() {
        await getHostelData();
        setIsLoading(false);
      }
      fetchHostelData();
    }
  }, [currentUserData]);

  if (isLoading) {
    return <SplashScreenStatic />;
  }

  return (
    <div>
      <div className="topBarHomePage">
        <p className="appNameHomePage">Wash.io</p>
        <div className="userDetailsHomePage">
          <p className="userPlanHomePage">{currentUserData.plan}</p>
          <img
            className="userPhotoHomePage"
            alt="user photo"
            src={photoURL}
            onClick={() => {
              navigator.vibrate(50);
              setShowSettings(true);
            }}
          ></img>
        </div>
      </div>
      {showSettings ? (
        <SettingsPage />
      ) : (
        <div>
          Select your Floor
          <p>{currentUserData.hostelName}</p>
          <div className="floorBoxContainer">
            {Array.from({ length: currentHostelData.noOfFloors }, (_, i) => (
              <div className="singleFloorBox" key={i}>
                {i}
              </div>
            ))
              .reduce((acc, curr, index) => {
                if (index % 3 === 0) acc.push([]);
                acc[acc.length - 1].push(curr);
                return acc;
              }, [])
              .map((row, rowIndex) => (
                <div
                  className="floorRow"
                  key={rowIndex}
                  onClick={() => {
                    {
                      navigator.vibrate(50);
                    }
                  }}
                >
                  {row}
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="bottomBarHomePage">
        <div
          onClick={() => {
            navigator.vibrate(50);
            setShowSettings(false);
          }}
          className="bottomBarIconHomePage"
        >
          <Home />
        </div>
        <div
          onClick={() => {
            navigator.vibrate(50);
            setShowSettings(true);
          }}
          className="bottomBarIconHomePage"
        >
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
