import React from "react";
import { auth } from "../firebase.jsx";

function SignOut() {
  return (
    <div>
      <button
        style={{
          width: "100%",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontSize: "18px",
          padding: "0.5rem",
        }}
        onClick={() => {
          navigator.vibrate(50);
          auth.signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default SignOut;
