import React from "react";
import { auth } from "../firebase.jsx";

function SignOut() {
  return (
    <div>
      <button
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
