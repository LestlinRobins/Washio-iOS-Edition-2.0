import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import DateSelector from "./DateSelector";
import Lottie from "react-lottie";
import animationData from "../assets/loading.json";

const BookingPage = ({ floorNo, hostelData, userData }) => {
  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);

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
        .eq("floorNo", floorNo)
        .eq("date", selectedDateString);

      if (error) {
        console.error("Error fetching slots:", error);
        return;
      }

      setSlots(data || []);
      setIsLoading(false);
    };

    fetchSlots();
  }, [selectedDate, hostelData.hostelName, floorNo]);

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
      <DateSelector
        onDateSelect={(date) => {
          setSelectedDate(date);
        }}
      />
      <p>Slots for {selectedDate.toLocaleDateString()}</p>
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
        <p>No slots have been booked for this date.</p>
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
                <span className="slotStatus">
                  {findStatus(slot) === 0 && (
                    <p style={{ color: "gray", fontSize: "24px" }}>●</p>
                  )}
                  {findStatus(slot) === 1 && (
                    <p style={{ color: "green", fontSize: "24px" }}>●</p>
                  )}
                  {findStatus(slot) === 2 && (
                    <p style={{ color: "orange", fontSize: "24px" }}>●</p>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingPage;
