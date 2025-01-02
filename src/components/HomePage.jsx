import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import SignOut from "./SignOut";
import { supabase } from "../supabase";

function HomePage() {
  const [currentUserData, setCurrentUserData] = useState({});
  const { uid, photoURL, displayName, email } = auth.currentUser;
  function formatDisplayName(displayName) {
    const nameParts = displayName.split(" -")[0].split(" ");
    return nameParts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }
  async function getUsers() {
    const { data: userData, error } = await supabase
      .from("users")
      .select()
      .eq("emailID", email);
    if (error) {
      console.error("Error fetching users:", error);
    } else {
      setCurrentUserData(userData);
    }
  }

  useEffect(() => {
    console.log(currentUserData.emailID);
  }, [currentUserData]);

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      HomePage
      <p>{currentUserData.emailID}</p>
      <img alt="user photho" src={photoURL}></img>
      <h1>{formatDisplayName(displayName)}</h1>
      <SignOut />
    </div>
  );
}

export default HomePage;
