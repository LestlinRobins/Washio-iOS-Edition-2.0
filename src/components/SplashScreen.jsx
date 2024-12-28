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
      <Lottie speed={0.5} options={defaultOptions} height={150} width={150} />
      {/* <img
        className="splash-screen-app-logo"
        src="../src/assets/app-icon.png"
      ></img> */}
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