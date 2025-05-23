import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useLocation } from "react-router-dom";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function Booking() {
  const location = useLocation();
  const { floorNo, selectedDate, userData } = location.state || {};
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const bookSlot = async () => {
    setIsLoading(true);
    const startDateTime = dayjs(selectedDate)
      .hour(startTime.hour())
      .minute(startTime.minute())
      .second(0)
      .toDate();

    const endDateTime = dayjs(selectedDate)
      .hour(endTime.hour())
      .minute(endTime.minute())
      .second(0)
      .toDate();
    const { data, error } = await supabase.from("time_slots").insert([
      {
        created_at: new Date().toISOString(),
        user: userData.name,
        hostelName: userData.hostelName,
        roomNo: userData.roomNo,
        floorNo: floorNo,
        startTime: startDateTime,
        endTime: endDateTime,
        date: selectedDate,
      },
    ]);
    if (error) {
      console.error("Error booking slot:", error);
    } else {
      console.log("Slot booked successfully:", data);
      console.log(startDateTime, endDateTime);
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
          sx={{ backgroundColor: "white" }}
          ampm={false}
          value={startTime}
          minTime={
            selectedDate && dayjs(selectedDate).isSame(dayjs(), "day")
              ? dayjs().startOf("hour")
              : null
          }
          onChange={(newValue) => {
            setStartTime(newValue);
            setEndTime(newValue.add(1, "hour"));
          }}
          defaultValue={dayjs()}
        />
      </LocalizationProvider>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={dayjs.locale()}
      >
        <TimePicker
          sx={{ backgroundColor: "white" }}
          ampm={false}
          value={endTime}
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
