import React from "react";
import { auth } from "../firebase";
import SignOut from "./SignOut";

function HomePage() {
  const { uid, photoURL, displayName } = auth.currentUser;
  function formatDisplayName(displayName) {
    const nameParts = displayName.split(" -")[0].split(" ");
    return nameParts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <div>
      HomePage
      <p>{uid}</p>
      <img alt="user photho" src={photoURL}></img>
      <h1>{formatDisplayName(displayName)}</h1>
      <SignOut />
    </div>
  );
}

export default HomePage;
