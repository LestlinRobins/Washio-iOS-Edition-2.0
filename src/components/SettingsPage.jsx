import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import SignOut from "./SignOut";
import { supabase } from "../supabase";

function SettingsPage() {
  const [currentUserData, setCurrentUserData] = useState({});
  const { email, photoURL } = auth.currentUser;

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
  useEffect(() => {
    async function fetchData() {
      await getUsers();
    }
    fetchData();
  }, []);

  return (
    <div>
      <img src={photoURL} alt="Profile" />
      <p>{currentUserData.name}</p>
      <p>{currentUserData.emailID}</p>
      <p>{currentUserData.hostelName}</p>
      <p>{currentUserData.roomNo}</p>
      <SignOut />
    </div>
  );
}

export default SettingsPage;
