import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import SignOut from "./SignOut";
import { supabase } from "../supabase";
import SplashScreenStatic from "./SplashScreenStatic";

function HomePage() {
  const [currentUserData, setCurrentUserData] = useState({});
  const { photoURL, email } = auth.currentUser;
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
  }

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return <SplashScreenStatic />;
  }
  return (
    <div>
      HomePage
      <p>{currentUserData.emailID}</p>
      <img alt="user photho" src={photoURL}></img>
      <h1>{currentUserData.name}</h1>
      <SignOut />
    </div>
  );
}

export default HomePage;
