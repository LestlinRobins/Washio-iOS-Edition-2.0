import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import HomePage from "./HomePage";
import { auth } from "../firebase.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "react-feather";

function Onboarding() {
  const [userName, setUserName] = useState("");
  const [hostel, setHostel] = useState("");
  const [room, setRoom] = useState("");
  const [user] = useAuthState(auth);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentUserData, setCurrentUserData] = useState(null);
  const [currentHostelData, setCurrentHostelData] = useState(null);
  const [hostels, setHostels] = useState([]);
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
    <div className="onboarding-name-collection-screen">
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
          fontSize: "20px",
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
              // e.target.style.filter = "blur(2px)";
              e.target.style.transition = "all 0.1s ease";
            }}
            onTouchEnd={(e) => {
              e.target.style.backgroundColor = "#2CFF2F";
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
              // e.target.style.filter = "blur(0px)";
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
    <div className="onboarding-hostel-collection-screen">
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
          fontSize: "20px",
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
              // e.target.style.filter = "blur(2px)";
              e.target.style.transition = "all 0.1s ease";
            }}
            onTouchEnd={(e) => {
              e.target.style.backgroundColor = "#2CFF2F";
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
              // e.target.style.filter = "blur(0px)";
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

    // Onboarding screen 3
    <div className="onboarding-hostel-collection-screen">
      <button
        style={{ position: "fixed", top: "2vh", left: "4vw" }}
        onClick={() => {
          navigator.vibrate(50);
          setCurrentScreen(1);
        }}
      >
        Back
      </button>
      <h1
        style={{
          fontSize: "40px",
          alignSelf: "flex-start",
          textAlign: "left",
        }}
      >
        Welcome to <br />
        Wash.io
      </h1>
      <p
        style={{
          fontSize: "20px",
          color: "gray",
          alignSelf: "flex-start",
        }}
      >
        Type in your room number
      </p>
      <div className="onboarding-name-collection-input-container">
        <input
          value={`${
            hostels.find((h) => h.hostelName === hostel)?.abbreviation || ""
          }-`}
          readOnly
          style={{ width: "50px", marginRight: "5px" }}
          className="onboarding-name-collection-input"
        />
        <input
          placeholder="Your room number"
          onChange={(e) => setRoom(e.target.value)}
          className="onboarding-name-collection-input"
          type="number"
          required
        />
      </div>
      {room && (
        <button
          style={{ position: "relative", top: "5vh" }}
          onClick={() => {
            navigator.vibrate(50);
            handleSubmit();
            setCurrentScreen(3);
          }}
        >
          Complete
        </button>
      )}
      <p style={{ position: "fixed", bottom: "5vh", color: "gray" }}>
        No socks were harmed in the making of this app
      </p>
    </div>,

    // Home screen
    <div>
      <button
        onClick={() => {
          navigator.vibrate(50);
          window.location.reload();
        }}
      >
        Go to Home
      </button>
    </div>,
  ];

  async function handleSubmit() {
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
      fetchUserData(); // Fetch user data after insertion
      fetchHostelData(); // Fetch hostel data after insertion
      // Add a delay before navigating to the next screen
      setTimeout(() => {
        setCurrentScreen(3); // Navigate to the next screen after successful insertion
      }, 2000); // 2-second delay
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
