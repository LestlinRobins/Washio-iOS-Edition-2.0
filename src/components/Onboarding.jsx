import React from "react";
import SignOut from "./SignOut";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import HomePage from "./HomePage";
import { auth } from "../firebase.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

function Onboarding() {
  const [userName, setUserName] = useState("");
  const [hostel, setHostel] = useState("");
  const [room, setRoom] = useState("");
  const [user] = useAuthState(auth);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentUserData, setCurrentUserData] = useState(null);
  const [currentHostelData, setCurrentHostelData] = useState(null);
  const [hostels, setHostels] = useState([]);
  useEffect(() => {
    async function fetchHostels() {
      const { data, error } = await supabase.from("Hostels").select("*");
      if (error) {
        console.error("Error fetching hostels:", error);
      } else {
        setHostels(data);
      }
    }
    fetchHostels();
  }, []);

  const screens = [
    // Onboarding screen 1
    <div className="onboarding-name-collection-screen">
      <h1
        style={{
          fontSize: "40px",
          alignSelf: "flex-start",
          textAlign: "left",
        }}
      >
        Welcome to <br />
        Wash.io
      </h1>
      <p style={{ fontSize: "20px", color: "gray", alignSelf: "flex-start" }}>
        Let's start with your name
      </p>
      <input
        required
        className="onboarding-name-collection-input"
        type="text"
        placeholder="Your name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <div className="onboarding-error-div">{errorMsg}</div>
      {userName.trim() && (
        <button
          style={{ position: "relative", top: "5vh" }}
          onClick={() => {
            navigator.vibrate(50);
            setCurrentScreen(1);
          }}
        >
          Next
        </button>
      )}
      <div style={{ position: "fixed", top: "2vh", left: "4vw" }}>
        <SignOut />
      </div>

      <p style={{ position: "fixed", bottom: "5vh", color: "gray" }}></p>
    </div>,

    // Onboarding screen 2
    <div className="onboarding-hostel-collection-screen">
      <button
        style={{ position: "fixed", top: "2vh", left: "4vw" }}
        onClick={() => {
          navigator.vibrate(50);
          setCurrentScreen(0);
        }}
      >
        Back
      </button>
      <h1
        style={{
          fontSize: "40px",
          alignSelf: "flex-start",
          textAlign: "left",
        }}
      >
        Powered by <br />
        Void
      </h1>
      <p
        style={{
          fontSize: "20px",
          color: "gray",
          alignSelf: "flex-start",
        }}
      >
        Which hostel do you stay in?
      </p>
      <select
        required
        className="onboarding-name-collection-input"
        onChange={(e) => setHostel(e.target.value)}
      >
        <option value="">Select your hostel</option>
        {hostels.map((hostel) => (
          <option key={hostel.id} value={hostel.hostelName}>
            {hostel.hostelName}
          </option>
        ))}
      </select>

      {hostel && (
        <button
          style={{ position: "relative", top: "5vh" }}
          onClick={() => {
            navigator.vibrate(50);
            setCurrentScreen(2);
          }}
        >
          Next
        </button>
      )}
      <p style={{ position: "fixed", bottom: "5vh", color: "gray" }}></p>
    </div>,

    // Onboarding screen 3
    <div className="onboarding-hostel-collection-screen">
      <button
        style={{ position: "fixed", top: "2vh", left: "4vw" }}
        onClick={() => {
          navigator.vibrate(50);
          setCurrentScreen(1);
        }}
      >
        Back
      </button>
      <h1
        style={{
          fontSize: "40px",
          alignSelf: "flex-start",
          textAlign: "left",
        }}
      >
        Welcome to <br />
        Wash.io
      </h1>
      <p
        style={{
          fontSize: "20px",
          color: "gray",
          alignSelf: "flex-start",
        }}
      >
        Type in your room number
      </p>
      <div className="onboarding-name-collection-input-container">
        <input
          value={`${
            hostels.find((h) => h.hostelName === hostel)?.abbreviation || ""
          }-`}
          readOnly
          style={{ width: "50px", marginRight: "5px" }}
          className="onboarding-name-collection-input"
        />
        <input
          placeholder="Your room number"
          onChange={(e) => setRoom(e.target.value)}
          className="onboarding-name-collection-input"
          type="number"
          required
        />
      </div>
      {room && (
        <button
          style={{ position: "relative", top: "5vh" }}
          onClick={() => {
            navigator.vibrate(50);
            handleSubmit();
            setCurrentScreen(3);
          }}
        >
          Complete
        </button>
      )}
      <p style={{ position: "fixed", bottom: "5vh", color: "gray" }}>
        No socks were harmed in the making of this app
      </p>
    </div>,

    // Home screen
    <div>
      <button
        onClick={() => {
          navigator.vibrate(50);
          window.location.reload();
        }}
      >
        Go to Home
      </button>
    </div>,
  ];

  async function handleSubmit() {
    const { error } = await supabase.from("users").insert([
      {
        name: userName,
        emailID: user.email,
        hostelName: hostel,
        roomNo: `${
          hostels.find((h) => h.hostelName === hostel)?.abbreviation || ""
        }-${room}`,
        plan: "Basic",
      },
    ]);
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully");
      fetchUserData(); // Fetch user data after insertion
      fetchHostelData(); // Fetch hostel data after insertion
      // Add a delay before navigating to the next screen
      setTimeout(() => {
        setCurrentScreen(3); // Navigate to the next screen after successful insertion
      }, 2000); // 2-second delay
    }
  }

  async function fetchUserData() {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("emailID", user.email)
      .single();
    if (error) {
      console.error("Error fetching user data:", error);
    } else {
      setCurrentUserData(data);
    }
  }

  async function fetchHostelData() {
    const { data, error } = await supabase
      .from("Hostels")
      .select("*")
      .eq("hostelName", hostel)
      .single();
    if (error) {
      console.error("Error fetching hostel data:", error);
    } else {
      setCurrentHostelData(data);
    }
  }

  const [currentScreen, setCurrentScreen] = useState(0);

  return <div>{screens[currentScreen]}</div>;
}

export default Onboarding;
