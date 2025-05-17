import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function Booking({ floorNo, selectedDate, userData }) {
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const bookSlot = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("time_slots").insert([
      {
        created_at: new Date().toISOString(),
        user: userData.name,
        hostelName: userData.hostelName,
        roomNo: userData.roomNo,
        floorNo: floorNo,
        startTime: startTime ? startTime.toDate() : null,
        endTime: endTime ? endTime.toDate() : null,
        date: selectedDate,
      },
    ]);
    if (error) {
      console.error("Error booking slot:", error);
    } else {
      console.log("Slot booked successfully:", data);
      console.log(startTime.toDate(), endTime.toDate());
    }
    setIsLoading(false);
  };
  return (
    <div>
      <h2>Book a Slot</h2>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={dayjs.locale()}
      >
        <TimePicker
          ampm={false}
          value={startTime}
          onChange={(newValue) => {
            setStartTime(newValue);
            setEndTime(newValue);
          }}
          defaultValue={dayjs()}
        />
      </LocalizationProvider>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={dayjs.locale()}
      >
        <TimePicker
          ampm={false}
          value={endTime.add(1, "hour")}
          minTime={startTime}
          onChange={(newValue) => {
            setEndTime(newValue);
          }}
        />
      </LocalizationProvider>
      <button onClick={bookSlot}>Book Now</button>
    </div>
  );
}
export default Booking;
