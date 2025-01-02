import React from "react";

function SplashScreenStatic() {
  return (
    <div className="splash-screen-container">
      <img
        className="splash-screen-app-logo"
        src="https://lh3.googleusercontent.com/d/1XKMMFrBOiPo5anqPe91t7Qu8Xzv_UIas=w1000?authuser=1/view"
      ></img>
      <div className="splash-screen-company-logo-container">
        <p style={{ padding: "0px", margin: "0.2vh", color: "gray" }}>from</p>
        <img
          className="splash-screen-company-logo"
          src="https://lh3.googleusercontent.com/d/1ir0lsDxi3T8e2b9YrvZgpZ0b0NLwsA8m=w1000?authuser=1/view"
        ></img>
      </div>
    </div>
  );
}

export default SplashScreenStatic;
