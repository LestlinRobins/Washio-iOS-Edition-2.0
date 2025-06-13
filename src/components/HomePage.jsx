import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import SignOut from "./SignOut";
import { supabase } from "../supabase";
import SplashScreenStatic from "./SplashScreenStatic";
import SettingsPage from "./SettingsPage";
import BookingPage from "./BookingPage";
import { Home, Settings, ArrowLeft } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function HomePage({ currentHostelData, currentUserData }) {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const { email, photoURL } = auth.currentUser;
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(() => {
    return sessionStorage.getItem("bottomBarAnimated") === "true";
  });
  const [animationKey, setAnimationKey] = useState(0);

  return (
    <div>
      {selectedFloor !== null && (
        <div className="topBarBookingPage">
          <div className="appBGBooking"></div>
          <button
            className="backButton"
            onClick={() => {
              navigator.vibrate(50);
              setSelectedFloor(null);
            }}
          >
            <ArrowLeft />
          </button>
          <p>Floor {selectedFloor} Slot Booking</p>
        </div>
      )}
      {selectedFloor === null && (
        <div className="topBarHomePage">
          <div className="topBarLeftHomePage">
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
              className="appNameHomePage"
            >
              Wash.io
            </motion.p>
            <motion.p
              viewport={{ once: true }}
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                type: "spring",
                stiffness: 100,
              }}
              style={{
                color: "#959595",
                margin: "0px",
                borderRadius: "20px",
                fontFamily: "Albert Sans, sans-serif",
                fontStyle: "italic",
                fontSize: "1rem",
                marginTop: "-5px",
              }}
            >
              {currentUserData.hostelName}
            </motion.p>
          </div>
          <div className="userDetailsHomePage">
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
              className="userPlanHomePage"
            >
              {currentUserData.plan}
            </motion.p>
            <Link className="userPhotoHomePage" to="/SettingsPage">
              <motion.img
                viewport={{ once: true }}
                initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
                className="userPhotoHomePage"
                alt="user photo"
                src={photoURL}
                onClick={() => {
                  navigator.vibrate(50);
                  setSelectedFloor(null);
                }}
              />
            </Link>
          </div>
        </div>
      )}
      {selectedFloor !== null ? (
        <div>
          <BookingPage
            floorNo={selectedFloor}
            hostelData={currentHostelData}
            userData={currentUserData}
          />
        </div>
      ) : (
        <div>
          <motion.h1
            style={{
              fontSize: "4vh",
              alignSelf: "center",
              textAlign: "center",
              lineHeight: "150%",
              position: "relative",
              bottom: "4vh",
              fontFamily: "Laviossa, sans-serif",
              paddingLeft: "3rem",
              paddingRight: "3rem",
            }}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
            }}
          >
            Which floor are you on?
          </motion.h1>

          <div className="floorBoxContainer">
            {Array.from({ length: currentHostelData.noOfFloors }, (_, i) => (
              <Link to={`/BookingPage/${i}`} key={i}>
                <motion.div
                  className="singleFloorBox"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.8 + i * 0.1,
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  onTouchStart={(e) => {
                    e.target.style.backgroundColor = "rgb(44, 255, 48)";
                    e.target.style.transform = "scale(0.95)";
                    e.target.style.boxShadow =
                      "0px 0px 30px 1px rgba(0, 255, 34, 0.54)";
                    e.target.style.transition = "all 0.1s ease";
                  }}
                  onTouchEnd={(e) => {
                    e.target.style.backgroundColor = "#2CFF2F";
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "none";
                    e.target.style.transition = "all 0.8s ease";
                  }}
                  onClick={() => {
                    navigator.vibrate(50);
                    setSelectedFloor(i);
                  }}
                >
                  {i}
                </motion.div>
              </Link>
            ))
              .reduce((acc, curr, index) => {
                if (index % 3 === 0) acc.push([]);
                acc[acc.length - 1].push(curr);
                return acc;
              }, [])
              .map((row, rowIndex) => (
                <div className="floorRow" key={rowIndex}>
                  {row}
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="bottomBarHomePage">
        <Link to="/">
          <motion.div
            key={animationKey}
            initial={{
              x: hasAnimatedOnce ? 0 : 300,
              opacity: hasAnimatedOnce ? 1 : 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            onAnimationComplete={() => {
              if (!hasAnimatedOnce) {
                setHasAnimatedOnce(true);
                sessionStorage.setItem("bottomBarAnimated", "true");
              }
            }}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.1, ease: "easeInOut" },
            }}
            transition={{
              duration: hasAnimatedOnce ? 0 : 0.3,
              type: "spring",
              stiffness: 90,
              damping: 15,
            }}
            onClick={() => {
              navigator.vibrate(50);
              setSelectedFloor(null);
              setAnimationKey((prev) => prev + 1);
              sessionStorage.removeItem("bottomBarAnimated");
            }}
            style={{
              backgroundColor: "#2CFF2F",
              color: "black",
              height: "3em",
              width: "11.5em",
              marginLeft: "0.4em",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 0px 30px 1px rgba(50, 50, 50, 0.54)",
            }}
          >
            <Home size={26} />
          </motion.div>
        </Link>
        <Link to="/SettingsPage">
          <motion.div
            whileTap={{
              scale: 0.9,
              backgroundColor: "rgb(44, 255, 48)",
              boxShadow: "0px 0px 30px 1px rgba(0, 255, 34, 0.54)",
            }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            onClick={() => {
              navigator.vibrate(50);
              setSelectedFloor(null);
              setAnimationKey((prev) => prev + 1);
              sessionStorage.removeItem("bottomBarAnimated");
            }}
            style={{
              color: "white",
              height: "3em",
              width: "11.5em",
              marginLeft: "0.4em",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Settings size={26} />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
