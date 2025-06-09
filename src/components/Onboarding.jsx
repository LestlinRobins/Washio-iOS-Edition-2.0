import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import HomePage from "./HomePage";
import { auth } from "../firebase.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "react-feather";
import Lottie from "lottie-react";
import buildingAnimation from "../../public/animations/final.json";

function Onboarding() {
  const [userName, setUserName] = useState("");
  const [hostel, setHostel] = useState("");
  const [room, setRoom] = useState("");
  const [user] = useAuthState(auth);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentUserData, setCurrentUserData] = useState(null);
  const [currentHostelData, setCurrentHostelData] = useState(null);
  const [buildingProfile, setBuildingProfile] = useState(false);
  const [buildingText, setBuildingText] = useState("Just give us a moment...");
  const [hostels, setHostels] = useState([]);

  const buildingPattern = () => {
    if (navigator.vibrate) {
      const pattern = [
        25,
        250,
        30,
        220,
        35,
        200,
        40,
        180,

        // Phase 2: Building momentum (1-2s)
        45,
        160,
        50,
        140,
        55,
        120,
        60,
        100,
        65,
        90,
        70,
        80,
        75,
        70,

        // THE MOMENT - Profile complete! (at 2s mark)
        300,
        120, // Single powerful c
      ];
      navigator.vibrate(pattern);
    }
  };

  useEffect(() => {
    async function fetchHostels() {
      const { data, error } = await supabase.from("Hostels").select("*");
      if (error) {
        console.error("Error fetching hostels:", error);
      } else {
        setHostels(data);
      }
    }
    fetchHostels();
  }, []);

  const screens = [
    // Onboarding screen 1
    <div key="screen-0" className="onboarding-name-collection-screen">
      <motion.img
        src="/illustrations/name.svg"
        alt="Description"
        width="300"
        className="name-illustration"
        initial={{ opacity: 0, filter: "blur(10px)", x: "-100px" }}
        animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
        transition={{
          duration: 0.6,
          delay: 0.1,
          type: "spring",
          stiffness: 100,
        }}
      />
      <motion.h1
        style={{
          fontSize: "40px",
          alignSelf: "center",
          textAlign: "center",
          lineHeight: "150%",
          position: "relative",
          top: "4.5vh",
        }}
        initial={{ opacity: 0, filter: "blur(10px)", x: "-100px" }}
        animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          type: "spring",
          stiffness: 100,
        }}
      >
        Your name, <br />
        please?
      </motion.h1>
      <motion.input
        style={{
          alignSelf: "center",
          width: "75vw",
          position: "relative",
          top: "4vh",
          padding: "0px",
          borderRadius: "20px",
          border: "none",
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
          delay: 0.5,
          type: "spring",
          stiffness: 100,
        }}
        required
        className="onboarding-name-collection-input"
        type="text"
        placeholder="Your name"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />
      <div className="onboarding-error-div">{errorMsg}</div>
      <AnimatePresence>
        {userName.trim() && (
          <motion.button
            style={{
              alignSelf: "center",
              backgroundColor: "#2CFF2F",
              color: "black",
              position: "absolute",
              bottom: "12vh",
              width: "40vw",
              borderRadius: "25px",
              height: "60px",
              fontSize: "20px",
              outline: "none",
              border: "none",
              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
              transition: "all 0.1s ease",
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
            initial={{
              opacity: 0,
              filter: "blur(10px)",
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              scale: 1,
            }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
              scale: 0.9,
              transition: { duration: 0.2 },
            }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
            onClick={() => {
              navigator.vibrate(50);
              setCurrentScreen(1);
            }}
          >
            Continue
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {userName.trim() && (
          <motion.p
            style={{
              color: "gray",
              fontFamily: "Albert Sans, sans-serif",
              position: "fixed",
              top: "67%",
              width: "80vw",
              alignSelf: "flex-start",
              textAlign: "left",
              marginLeft: "2vw",
              fontSize: "16px",
              fontStyle: "italic",
              lineHeight: "130%",
            }}
            initial={{ opacity: 0, x: "-50px" }}
            animate={{ opacity: 1, x: "0px" }}
            transition={{
              duration: 0.5,
              delay: 0,
            }}
            exit={{ opacity: 0, x: "-50px", transition: { duration: 0.3 } }}
          >
            Your full name, please. The one your warden actually knows.
          </motion.p>
        )}
      </AnimatePresence>
      <motion.button
        style={{
          position: "fixed",
          top: "1.5vh",
          left: "0vw",
          backgroundColor: "transparent",
          fontFamily: "Albert Sans, sans-serif",
          alignItems: "center",
          alignSelf: "flex-start",
          display: "flex",
          flexDirection: "row",
          gap: "5px",
        }}
        initial={{ opacity: 0, filter: "blur(10px)", x: "-10px" }}
        animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          type: "spring",
          stiffness: 100,
        }}
        onClick={() => {
          navigator.vibrate(50);
          auth.signOut();
        }}
      >
        <ArrowLeft size={18} />
        Sign out
      </motion.button>

      <p style={{ position: "fixed", bottom: "5vh", color: "gray" }}></p>
    </div>,

    // Onboarding screen 2
    <div key="screen-1" className="onboarding-hostel-collection-screen">
      <motion.button
        style={{
          position: "fixed",
          top: "1.5vh",
          left: "0vw",
          backgroundColor: "transparent",
          fontFamily: "Albert Sans, sans-serif",
          alignItems: "center",
          alignSelf: "flex-start",
          display: "flex",
          flexDirection: "row",
          gap: "5px",
        }}
        initial={{ opacity: 0, filter: "blur(10px)", x: "-10px" }}
        animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          type: "spring",
          stiffness: 100,
        }}
        onClick={() => {
          navigator.vibrate(50);
          setCurrentScreen(0);
        }}
      >
        <ArrowLeft size={18} />
        Back
      </motion.button>
      <motion.img
        src="/illustrations/hostel.svg"
        alt="Description"
        width="300"
        className="hostel-illustration"
        initial={{ opacity: 0, filter: "blur(10px)", x: "-100px" }}
        animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
        transition={{
          duration: 0.6,
          delay: 0.1,
          type: "spring",
          stiffness: 100,
        }}
      />
      <motion.h1
        style={{
          fontSize: "40px",
          alignSelf: "center",
          textAlign: "center",
          lineHeight: "150%",
          position: "relative",
          top: "4.5vh",
        }}
        initial={{ opacity: 0, filter: "blur(10px)", x: "-100px" }}
        animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          type: "spring",
          stiffness: 100,
        }}
      >
        Where do you stay?
      </motion.h1>
      <motion.select
        required
        value={hostel}
        className="onboarding-name-collection-input"
        onChange={(e) => setHostel(e.target.value)}
        initial={{ opacity: 0, filter: "blur(10px)", x: "-100px" }}
        animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
        transition={{
          duration: 0.6,
          delay: 0.5,
          type: "spring",
          stiffness: 100,
        }}
        style={{
          alignSelf: "center",
          width: "75vw",
          position: "relative",
          top: "5vh",
          padding: "0px",
          borderRadius: "20px",
          border: "none",
          height: "60px",
          paddingLeft: "20px",
          paddingRight: "20px",
          backgroundColor: "#004901",
          fontFamily: "Albert Sans, sans-serif",
          fontSize: "18px",
        }}
      >
        <option
          style={{ fontFamily: "Albert Sans, sans-serif", fontSize: "18px" }}
          value=""
        >
          Select your hostel
        </option>
        {hostels.map((hostel) => (
          <option
            style={{ fontFamily: "Albert Sans, sans-serif", fontSize: "18px" }}
            key={hostel.id}
            value={hostel.hostelName}
          >
            {hostel.hostelName}
          </option>
        ))}
      </motion.select>

      <AnimatePresence>
        {hostel && (
          <motion.button
            style={{
              alignSelf: "center",
              backgroundColor: "#2CFF2F",
              color: "black",
              position: "absolute",
              bottom: "12vh",
              width: "40vw",
              borderRadius: "25px",
              height: "60px",
              fontSize: "20px",
              outline: "none",
              border: "none",
              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
              transition: "all 0.1s ease",
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
            initial={{
              opacity: 0,
              filter: "blur(10px)",
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              scale: 1,
            }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
              scale: 0.9,
              transition: { duration: 0.2 },
            }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
            onClick={() => {
              navigator.vibrate(50);
              setCurrentScreen(2);
            }}
          >
            Continue
          </motion.button>
        )}
      </AnimatePresence>
      <motion.p
        style={{ position: "fixed", bottom: "5vh", color: "gray" }}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.5,
          delay: 0.6,
        }}
      ></motion.p>
    </div>,

    // Onboarding screen 3 - FIXED VERSION
    <div key="screen-2" className="onboarding-room-collection-screen">
      <motion.button
        style={{
          position: "fixed",
          top: "1.5vh",
          left: "0vw",
          backgroundColor: "transparent",
          fontFamily: "Albert Sans, sans-serif",
          alignItems: "center",
          alignSelf: "flex-start",
          display: "flex",
          flexDirection: "row",
          gap: "5px",
        }}
        initial={{ opacity: 0, filter: "blur(10px)", x: "-10px" }}
        animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          type: "spring",
          stiffness: 100,
        }}
        onClick={() => {
          navigator.vibrate(50);
          setCurrentScreen(1);
        }}
      >
        <ArrowLeft size={18} />
        Back
      </motion.button>

      {/* Fixed: Added key prop and ensured proper motion component structure */}
      <motion.img
        key="room-illustration"
        src="/illustrations/room.svg"
        alt="Room illustration"
        width="300"
        className="room-illustration"
        style={{
          display: "block", // Ensure proper display
          position: "fixed", // Ensure positioning context
          zIndex: 1, // Ensure it's above other elements
        }}
        initial={{ opacity: 0, filter: "blur(10px)", x: "-100px" }}
        animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
        transition={{
          duration: 0.6,
          delay: 0.1,
          type: "spring",
          stiffness: 100,
        }}
      />

      {/* Fixed: Added key prop and ensured proper styling */}
      <motion.h1
        key="room-heading"
        style={{
          fontSize: "40px",
          alignSelf: "center",
          textAlign: "center",
          lineHeight: "150%",
          position: "relative",
          top: "0vh",
          margin: 0, // Remove default margins that might interfere
          padding: 0, // Remove default padding
          display: "block", // Ensure proper display
          zIndex: 1, // Ensure proper stacking
        }}
        initial={{ opacity: 0, filter: "blur(10px)", x: "-100px" }}
        animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          type: "spring",
          stiffness: 100,
        }}
      >
        Which room?
      </motion.h1>

      <div className="onboarding-room-collection-input-container">
        <motion.input
          value={`${
            hostels.find((h) => h.hostelName === hostel)?.abbreviation || ""
          }-`}
          readOnly
          style={{
            width: "50px",
            padding: "0px",
            position: "relative",
            marginRight: "5px",
            top: "2vh",
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
          onChange={(e) => setRoom(e.target.value)}
          type="number"
          required
          value={room}
          style={{
            padding: "0px",
            borderRadius: "20px",
            border: "none",
            position: "relative",
            top: "2vh",
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

      <AnimatePresence>
        {room && (
          <motion.button
            style={{
              alignSelf: "center",
              backgroundColor: "#2CFF2F",
              color: "black",
              position: "absolute",
              bottom: "12vh",
              width: "40vw",
              borderRadius: "25px",
              height: "60px",
              fontSize: "20px",
              outline: "none",
              border: "none",
              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
              transition: "all 0.1s ease",
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
            initial={{
              opacity: 0,
              filter: "blur(10px)",
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              scale: 1,
            }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
              scale: 0.9,
              transition: { duration: 0.2 },
            }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
            onClick={() => {
              navigator.vibrate(50);
              handleSubmit();
              setCurrentScreen(3);
            }}
          >
            Complete!
          </motion.button>
        )}
      </AnimatePresence>
    </div>,

    // Home screen
    <AnimatePresence>
      <div key="screen-3" className="last-onboarding-screen">
        <AnimatePresence mode="wait">
          {buildingProfile && (
            <motion.div
              key="building-profile" // Use a stable string key instead of the boolean state
              className="building-profile-container"
              initial={{ opacity: 0, filter: "blur(10px)", y: "10px" }}
              animate={{ opacity: 1, filter: "blur(0px)", y: "0px" }}
              exit={{
                opacity: 0,
                filter: "blur(10px)",
                scale: 0.9,
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Lottie animationData={buildingAnimation} loop={false} />
              <AnimatePresence mode="wait">
                <motion.p
                  key={buildingText}
                  initial={{ opacity: 0, filter: "blur(10px)", y: "10px" }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: "0px" }}
                  transition={{ duration: 0.6, delay: 0 }}
                  exit={{
                    opacity: 0,
                    filter: "blur(10px)",
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                >
                  {buildingText}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          )}

          {!buildingProfile && (
            <div className="completion-screen">
              <motion.img
                src="/illustrations/happy.svg"
                width="300"
                className="completion-illustration"
                initial={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              />
              <motion.h1
                key="welcome-message"
                style={{
                  fontSize: "40px",
                  alignSelf: "center",
                  textAlign: "center",
                  lineHeight: "150%",
                  position: "relative",
                  top: "20vh",
                  margin: 0,
                  paddingLeft: "5vw",
                  paddingRight: "5vw",
                  display: "block",
                  zIndex: 1,
                }}
                initial={{ opacity: 0, filter: "blur(10px)", y: "10px" }}
                animate={{ opacity: 1, filter: "blur(0px)", y: "0px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                exit={{
                  opacity: 0,
                  filter: "blur(10px)",
                  scale: 0.9,
                  transition: { duration: 0.2 },
                }}
              >
                We're so hyped you're here!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, filter: "blur(10px)", y: "10px" }}
                animate={{ opacity: 1, filter: "blur(0px)", y: "0px" }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.7 }}
                style={{
                  alignSelf: "center",
                  paddingLeft: "5vw",
                  paddingRight: "5vw",
                  fontFamily: "Albert Sans, sans-serif",
                  fontStyle: "italic",
                  color: "#959595",
                  fontWeight: "400",
                  position: "relative",
                  top: "18.5vh",
                  fontSize: "17px",
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(10px)",
                  scale: 0.9,
                  transition: { duration: 0.2 },
                }}
              >
                The fun starts now.
              </motion.p>
              <motion.button
                style={{
                  alignSelf: "center",
                  backgroundColor: "#2CFF2F",
                  color: "black",
                  position: "absolute",
                  bottom: "12vh",
                  width: "50vw",
                  borderRadius: "25px",
                  height: "60px",
                  fontSize: "20px",
                  outline: "none",
                  border: "none",
                  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  transition: "all 0.1s ease",
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
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  scale: 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: 1.5,
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(10px)",
                  scale: 0.9,
                  transition: { duration: 0.2 },
                }}
                onClick={() => {
                  navigator.vibrate(50);
                  window.location.reload();
                }}
              >
                Go to Home
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>,
  ];

  async function handleSubmit() {
    setBuildingProfile(true);
    buildingPattern();

    // Uncomment when ready to use database functionality
    const { error } = await supabase.from("users").insert([
      {
        name: userName,
        emailID: user.email,
        hostelName: hostel,
        roomNo: `${
          hostels.find((h) => h.hostelName === hostel)?.abbreviation || ""
        }-${room}`,
        plan: "Basic",
      },
    ]);
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully");
      fetchUserData();
      fetchHostelData();
      setTimeout(() => {
        setBuildingProfile(false);
      }, 5000);
      setTimeout(() => {
        setBuildingText("Your profile is ready!");
      }, 1500);
    }
  }

  async function fetchUserData() {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("emailID", user.email)
      .single();
    if (error) {
      console.error("Error fetching user data:", error);
    } else {
      setCurrentUserData(data);
    }
  }

  async function fetchHostelData() {
    const { data, error } = await supabase
      .from("Hostels")
      .select("*")
      .eq("hostelName", hostel)
      .single();
    if (error) {
      console.error("Error fetching hostel data:", error);
    } else {
      setCurrentHostelData(data);
    }
  }

  const [currentScreen, setCurrentScreen] = useState(0);

  return <div>{screens[currentScreen]}</div>;
}

export default Onboarding;
