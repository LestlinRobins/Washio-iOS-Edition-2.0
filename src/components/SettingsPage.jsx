import React, { useState, useEffect, useRef } from "react";
import { auth } from "../firebase";
import SignOut from "./SignOut";
import { supabase } from "../supabase";
import { Link, useNavigate } from "react-router-dom";
import { Home, Settings, ArrowLeft } from "react-feather";
import { motion } from "motion/react";
import ConfettiExplosion from "react-confetti-explosion";

function SettingsPage({ currentUserData }) {
  const { email, photoURL } = auth.currentUser;
  const navigate = useNavigate();
  const [easterEgg, setEasterEgg] = useState(false);
  const tapCount = useRef(0);
  const tapTimeout = useRef(null);
  const buildingPattern = () => {
    if (navigator.vibrate) {
      const pattern = [
        5, 25, 5, 25, 5, 25, 5, 25, 5, 25, 5, 25, 5, 25, 5, 25, 5, 25, 5, 25, 5,
        25, 5, 25, 5, 25, 5, 25, 5, 25, 5, 25,
      ];
      navigator.vibrate(pattern);
    }
  };
  const handleTap = () => {
    navigator.vibrate(50);
    tapCount.current += 1;

    // Reset tap count after 1.5s of inactivity
    if (tapTimeout.current) clearTimeout(tapTimeout.current);
    tapTimeout.current = setTimeout(() => {
      tapCount.current = 0;
    }, 1500);

    if (tapCount.current >= 6) {
      setEasterEgg(true);
      tapCount.current = 0; // Reset after triggering
      console.log("Easter egg activated!");
      buildingPattern();
    }
  };
  return (
    <div>
      {easterEgg && (
        <div
          style={{
            position: "fixed",
            left: "20%", // Position horizontally
            bottom: "20%", // Position vertically
            zIndex: 9999,
            pointerEvents: "none",
          }}
          className="easterEggContainer"
        >
          <ConfettiExplosion
            duration={5000}
            particleCount={300}
            onComplete={() => {
              setEasterEgg(false);
            }}
            className="easterEggConfetti"
            force={0.9}
            particleSize={25}
            height={"250vh"}
            colors={["#24fc03", "#6cfc56", "#169c02", "#31c91a"]}
            origin={{ x: 0.2, y: 0.8 }}
            style={{
              position: "fixed",
              left: "30%", // Position horizontally
              top: "80%", // Pos
            }}
          />
        </div>
      )}
      <div className="topBarSettingsPage">
        <div className="topBarLeftSettingsPage">
          <motion.button
            viewport={{ once: true }}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.0,
            }}
            className="backButton"
            onClick={() => {
              navigator.vibrate(50);
              navigate("/");
            }}
          >
            <ArrowLeft />
          </motion.button>
          <motion.p
            viewport={{ once: true }}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              type: "spring",
              stiffness: 100,
            }}
            className="appNameSettingsPage"
          >
            Settings
          </motion.p>
        </div>
        <div className="userDetailsHomePage">
          <motion.div
            className="signOutButton"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1, ease: "easeInOut" },
            }}
          >
            <SignOut />
          </motion.div>
        </div>
      </div>
      <div className="profile-section">
        <motion.div
          className="profile-picture-container"
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            type: "spring",
            stiffness: 100,
          }}
        >
          <img src={photoURL} alt="Profile" className="profile-picture" />
        </motion.div>

        <div className="profile-details">
          <motion.div
            className="profile-field"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
            }}
          >
            <label className="profile-label">Name</label>
            <input
              readOnly
              className="profile-value"
              value={currentUserData.name}
            />
          </motion.div>

          <motion.div
            className="profile-field"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay: 0.7,
              type: "spring",
              stiffness: 100,
            }}
          >
            <label className="profile-label">Hostel</label>
            <input
              readOnly
              className="profile-value"
              value={currentUserData.hostelName}
            />
          </motion.div>

          <motion.div
            className="profile-field"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay: 0.9,
              type: "spring",
              stiffness: 100,
            }}
          >
            <label className="profile-label">Room number</label>
            <div className="setting-room-collection-input-container">
              <motion.input
                value={`${currentUserData.roomNo.split("-")[0]}-`}
                readOnly
                style={{
                  width: "50px",
                  padding: "0px",
                  position: "relative",
                  marginRight: "5px",
                  borderRadius: "20px",
                  border: "none",
                  height: "60px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  backgroundColor: "#004901",
                  fontFamily: "Albert Sans, sans-serif",
                  fontSize: "18px",
                }}
                initial={{ opacity: 0, filter: "blur(10px)", x: "-100px" }}
                animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
                className="onboarding-name-collection-input"
              />
              <motion.input
                placeholder="Your room number"
                type="number"
                readOnly
                value={`${currentUserData.roomNo.split("-")[1]}`}
                style={{
                  padding: "0px",
                  borderRadius: "20px",
                  border: "none",
                  position: "relative",
                  alignSelf: "center",
                  height: "60px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  backgroundColor: "#004901",
                  fontFamily: "Albert Sans, sans-serif",
                  fontSize: "18px",
                }}
                onFocus={(e) => {
                  e.target.style.outline = "1px solid #2CFF2F";
                }}
                onBlur={(e) => {
                  e.target.style.outline = "none";
                }}
                initial={{ opacity: 0, filter: "blur(10px)", x: "-100px" }}
                animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.7,
                  type: "spring",
                  stiffness: 100,
                }}
                className="onboarding-name-collection-input"
              />
            </div>
          </motion.div>
        </div>
      </div>{" "}
      <div
        style={{
          position: "fixed",
          bottom: "0px",
          width: "100%",
          height: "30vh",
        }}
      >
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
          animate={{ opacity: 0.5, filter: "blur(0px)", scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.0,
            type: "spring",
            stiffness: 100,
          }}
          className="settingsPatternCircle1"
        ></motion.div>
        <motion.div
          className="settingsPatternCircle2"
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
          animate={{ opacity: 0.5, filter: "blur(0px)", scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.2,
            type: "spring",
            stiffness: 100,
          }}
        ></motion.div>
        <motion.div
          className="settingsPatternCircle3"
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
          animate={{ opacity: 0.5, filter: "blur(0px)", scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.4,
            type: "spring",
            stiffness: 100,
          }}
        ></motion.div>
        <motion.div
          className="settingsPatternCircle4"
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
          animate={{ opacity: 0.5, filter: "blur(0px)", scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.6,
            type: "spring",
            stiffness: 100,
          }}
        ></motion.div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
            gap: "-0.5rem",
            position: "absolute",
            bottom: "-1vh",
          }}
        >
          <motion.p
            viewport={{ once: true }}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
            animate={{ opacity: 0.2, filter: "blur(0px)", scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 1.7,
              type: "spring",
              stiffness: 100,
            }}
            style={{
              color: "#2CFF2F",
              fontSize: "2.2rem",
              fontFamily: "Laviossa",
              alignItems: "center",
              display: "flex",
              gap: "0.5rem",
              position: "relative",
              left: "5%",
              opacity: 0.2,
              padding: 0,
              marginBottom: "-0.4rem",
            }}
          >
            With{" "}
            <motion.svg
              whileTap={{
                scale: 0.75,
                transition: {
                  duration: 0.1,
                  type: "spring",
                  stiffness: 500,
                  damping: 20,
                },
              }}
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="#2CFF2F"
              style={{ display: "inline", verticalAlign: "middle" }}
              onClick={handleTap}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>
          </motion.p>
          <motion.p
            viewport={{ once: true }}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
            animate={{ opacity: 0.2, filter: "blur(0px)", scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 1.8,
              type: "spring",
              stiffness: 100,
            }}
            style={{
              color: "#2CFF2F",
              fontSize: "2.2rem",
              fontFamily: "Laviossa",
              position: "relative",
              left: "5%",
              opacity: 0.2,
              padding: 0,
              margin: 0,
              marginBottom: "-0.4rem",
            }}
          >
            from the
          </motion.p>
          <motion.p
            viewport={{ once: true }}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
            animate={{ opacity: 0.2, filter: "blur(0px)", scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 1.9,
              type: "spring",
              stiffness: 100,
            }}
            style={{
              color: "#2CFF2F",
              fontSize: "2.2rem",
              fontFamily: "Laviossa",
              position: "relative",
              left: "5%",
              opacity: 0.2,
              padding: 0,
              margin: 0,
            }}
          >
            Wash.io team!
          </motion.p>
        </div>
      </div>
      <div className="bottomBarHomePage">
        <Link to="/" style={{ flex: 1 }}>
          <motion.div
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1, ease: "easeInOut" },
            }}
            onClick={() => {
              navigator.vibrate(50);
            }}
            style={{
              color: "white",
              height: "3em",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 0.2em",
              minWidth: 0, // Prevents flex item from overflowing
            }}
          >
            <Home size={26} />
          </motion.div>
        </Link>

        <Link to="/SettingsPage" style={{ flex: 1 }}>
          <motion.div
            initial={{
              x: -300,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 90,
              damping: 15,
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1, ease: "easeInOut" },
            }}
            onClick={() => {
              navigator.vibrate(50);
            }}
            style={{
              backgroundColor: "#2CFF2F",
              color: "black",
              height: "3em",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 0px 30px 1px rgba(50, 50, 50, 0.54)",
              margin: "0 0.2em",
              minWidth: 0, // Prevents flex item from overflowing
            }}
          >
            <Settings size={26} />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

export default SettingsPage;
