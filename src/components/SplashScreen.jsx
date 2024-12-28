import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/app-icon-animation.json";

function SplashScreen() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="splash-screen-container">
      <Lottie options={defaultOptions} height={150} width={150} />
      {/* <img
        className="splash-screen-app-logo"
        src="../src/assets/app-icon.png"
      ></img> */}
      <div className="splash-screen-company-logo-container">
        <p style={{ padding: "0px", margin: "0.2vh", color: "gray" }}>from</p>
        <img
          className="splash-screen-company-logo"
          //   src="../src/assets/void-company-logo.png"
          src="https://lh3.googleusercontent.com/d/1ir0lsDxi3T8e2b9YrvZgpZ0b0NLwsA8m=w1000?authuser=1/view"
        ></img>
      </div>
    </div>
  );
}

export default SplashScreen;
