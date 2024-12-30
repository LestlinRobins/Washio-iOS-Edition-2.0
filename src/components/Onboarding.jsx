import React from "react";
import SignOut from "./SignOut";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function Onboarding() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
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
        className="onboarding-name-collection-input"
        type="text"
        placeholder="Your name"
      />
      <button
        style={{ position: "relative", top: "5vh" }}
        onClick={() => setCurrentScreen(1)}
      >
        Next
      </button>
      <SignOut />

      <p style={{ position: "fixed", bottom: "5vh", color: "gray" }}>
        No socks were harmed in the making of this app
      </p>
    </div>,

    // Onboarding screen 2
    <div className="onboarding-hostel-collection-screen">
      <button
        style={{ position: "fixed", top: "2vh", left: "4vw" }}
        onClick={() => setCurrentScreen(0)}
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
      <input
        className="onboarding-name-collection-input"
        type="text"
        placeholder="Your name"
      />

      <button
        style={{ position: "relative", top: "5vh" }}
        onClick={() => setCurrentScreen(2)}
      >
        Next
      </button>
      <p style={{ position: "fixed", bottom: "5vh", color: "gray" }}>
        No socks were harmed in the making of this app
      </p>
    </div>,

    // Onboarding screen 3
    <div>
      Screen 3
      <button
        style={{ position: "relative", top: "5vh" }}
        onClick={() => setCurrentScreen(1)}
      >
        Back
      </button>
    </div>,
  ];

  const [currentScreen, setCurrentScreen] = useState(0);

  async function getUsers() {
    const { usersData } = await supabase.from("users").select();
    setUsers(usersData);
    console.log(users);
  }

  return <div>{screens[currentScreen]}</div>;
}

export default Onboarding;
