import React from "react";

function SplashScreen() {
  return (
    <div className="splash-screen-container">
      <img
        className="splash-screen-app-logo"
        src="../src/assets/app-icon.png"
      ></img>
      <div className="splash-screen-company-logo-container">
        <p style={{ padding: "0px", margin: "0.2vh" }}>from</p>
        <img
          className="splash-screen-company-logo"
          src="../src/assets/void-company-logo.png"
        ></img>
      </div>
    </div>
  );
}

export default SplashScreen;
