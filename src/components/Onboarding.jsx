import React from "react";
import SignOut from "./SignOut";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import HomePage from "./HomePage";
import { auth } from "../firebase.jsx";
import { useAuthState } from "react-firebase-hooks/auth";

function Onboarding() {
  const [userName, setUserName] = useState("");
  const [hostel, setHostel] = useState("");
  const [room, setRoom] = useState("");
  const [user] = useAuthState(auth);
  const [errorMsg, setErrorMsg] = useState("");

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
        <option value="Kalapurackal">Kalapurackal Hostel</option>
        <option value="Meenachil">Meenachil Hostel</option>
        <option value="Nila A">Nila A Hostel</option>
        <option value="Nila B">Nila B Hostel</option>
        <option value="Maryland">Maryland Hostel</option>
        <option value="Anamudi">Anamudi Hostel</option>
        <option value="Manimala">Manimala Hostel</option>
        <option value="Chittar">Chittar Hostel</option>
        <option value="Sahyadri">Sahyadri Hostel</option>
        <option value="Coop Tyre">Coop Tyre Arcade</option>
        <option value="Agasthya">Agasthya Hostel</option>
        <option value="Anna">Anna Residency</option>
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
      <input
        className="onboarding-name-collection-input"
        type="number"
        placeholder="Your room number"
        onChange={(e) => setRoom(e.target.value)}
      />
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
    <HomePage />,
  ];
  async function handleSubmit() {
    const { error } = await supabase.from("users").insert([
      {
        name: userName,
        emailID: user.email,
        hostelName: hostel,
        roomNo: room,
      },
    ]);
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully");
      // Add a delay before navigating to the next screen
      setTimeout(() => {
        setCurrentScreen(3); // Navigate to the next screen after successful insertion
      }, 2000); // 2-second delay
      setCurrentScreen(3); // Navigate to the next screen after successful insertion
    }
  }
  const [currentScreen, setCurrentScreen] = useState(0);

  return <div>{screens[currentScreen]}</div>;
}

export default Onboarding;
