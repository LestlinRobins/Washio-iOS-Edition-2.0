import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import DateSelector from "./DateSelector";

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

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
    }).format(date);
  };

  return (
    <div className="bookingContainer">
      <DateSelector
        onDateSelect={(date) => {
          setSelectedDate(date);
        }}
      />
      <h2>Floor {floorNo}</h2>
      <p>Slots for {selectedDate.toLocaleDateString()}</p>
      {isLoading && <p>Loading...</p>}
      {!isLoading && slots.length === 0 && (
        <p>No slots have been booked for this date.</p>
      )}
      {!isLoading && slots.length > 0 && (
        <div className="slotsHeader">
          <span className="slotTime">Date</span>
          <span>Start Time</span>
          <span>End Time</span>
          <span className="slotUser">User</span>
          <span>Room No</span>
        </div>
      )}
      {!isLoading && slots.length > 0 && (
        <div className="slotsContainer">
          {slots.map((slot) => (
            <div key={slot.id} className="slot">
              <span className="slotTime">
                {formatDate(new Date(slot.created_at))}
              </span>
              <span>
                {new Date(slot.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span>
                {new Date(slot.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="slotUser">{slot.user}</span>
              <span>{slot.roomNo}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingPage;
