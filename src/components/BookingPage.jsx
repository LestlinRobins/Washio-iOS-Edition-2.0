import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import DateSelector from "./DateSelector";
import Lottie from "react-lottie";
import animationData from "../assets/loading.json";
import Booking from "./Booking";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Settings } from "react-feather";

const BookingPage = ({ hostelData, userData }) => {
  const navigate = useNavigate();
  const { floorNo } = useParams(); // Get floorNo from URL
  const floorNumber = floorNo || parseInt(useParams().floorNo, 10);
  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    // Generate next 5 dates
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    setAvailableDates(dates);
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      setIsLoading(true);
      // Format selectedDate as YYYY-MM-DD for date-only comparison
      const selectedDateString = selectedDate.toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("time_slots")
        .select("*")
        .eq("hostelName", hostelData.hostelName)
        .eq("floorNo", floorNumber)
        .eq("date", selectedDateString);

      if (error) {
        console.error("Error fetching slots:", error);
        return;
      }
      console.log("Fetched slots:", data);
      setSlots(data);
      setIsLoading(false);
    };

    fetchSlots();
  }, [selectedDate, hostelData.hostelName, floorNumber]);
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  const findStatus = (slot) => {
    const startTime = new Date(slot.startTime);
    const endTime = new Date(slot.endTime);
    const now = new Date();

    if (now < startTime) {
      return 2; // Upcoming
    } else if (now >= startTime && now <= endTime) {
      return 1; // Ongoing
    } else {
      return 0; // Completed
    }
  };
  return (
    <div className="bookingContainer">
      <div className="topBarBookingPage">
        <div className="appBGBooking"></div>
        <button
          className="backButton"
          onClick={() => {
            navigator.vibrate(50);
            navigate("/");
          }}
        >
          <ArrowLeft />
        </button>
        <p>Floor {floorNumber} Slot Booking</p>
      </div>
      <DateSelector
        onDateSelect={(date) => {
          setSelectedDate(date);
        }}
      />
      <p style={{ color: "white", zIndex: "1" }}>
        Slots for{" "}
        {selectedDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
        .
      </p>
      {isLoading && (
        <div>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            height={65}
            width={65}
          />
        </div>
      )}
      {!isLoading && slots.length === 0 && (
        <p style={{ color: "white", zIndex: "1" }}>
          No slots have been booked for this date.
        </p>
      )}
      {/* {!isLoading && slots.length > 0 && (
        <div className="slotsHeader">
          <span className="slotTime">Date</span>
          <span>Start Time</span>
          <span>End Time</span>
          <span className="slotUser">User</span>
          <span>Room No</span>
        </div>
      )} */}
      {!isLoading && slots.length > 0 && (
        <div className="slotsContainer">
          {slots.map((slot) => (
            <div key={slot.id} className="slot">
              <span className="slotUser">
                {slot.user}
                <span className="slotRoomNo">{slot.roomNo}</span>
              </span>
              <div className="slotDetails">
                <div className="slotTime">
                  <span style={{ width: "50px", textAlign: "right" }}>
                    {new Date(slot.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                  <span style={{ minWidth: "50px", textAlign: "right" }}>
                    {new Date(slot.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                </div>
                {isSameDay(selectedDate, new Date()) ? (
                  <span className="slotStatus">
                    {findStatus(slot) === 0 && (
                      <p style={{ color: "gray", fontSize: "24px" }}>●</p>
                    )}
                    {findStatus(slot) === 1 && (
                      <p style={{ color: "rgb(0, 227, 5)", fontSize: "24px" }}>
                        ●
                      </p>
                    )}
                    {findStatus(slot) === 2 && (
                      <p style={{ color: "orange", fontSize: "24px" }}>●</p>
                    )}
                  </span>
                ) : (
                  <span className="slotStatus">
                    <p style={{ color: "gray", fontSize: "24px" }}>●</p>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {!isLoading && !isBooking && (
        <Link to={"/Booking"}>
          <button onClick={() => setIsBooking(true)}>Book a Slot</button>
        </Link>
      )}
      {!isLoading && isBooking && (
        <div className="slotBookingContainer">
          <button
            className="backButtonBooking"
            onClick={() => {
              setIsBooking(false);
            }}
          >
            Back
          </button>
          <div>
            <Booking
              floorNo={floorNumber}
              selectedDate={selectedDate}
              userData={userData}
            />
          </div>
        </div>
      )}
      <div className="bottomBarBookingPage">
        <Link to="/">
          <div
            onClick={() => {
              navigator.vibrate(50);
            }}
            className="bottomBarIconHomePage"
          >
            <Home />
            <p
              style={{
                padding: "0px",
                margin: "0px",
                fontWeight: "800",
                marginTop: "-10px",
                alignSelf: "center",
                fontSize: "20px",
                marginBottom: "-10px",
              }}
            >
              —
            </p>
          </div>
        </Link>
        <Link to="/SettingsPage">
          <div
            onClick={() => {
              navigator.vibrate(50);
            }}
            className="bottomBarIconHomePage"
          >
            <Settings />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BookingPage;
