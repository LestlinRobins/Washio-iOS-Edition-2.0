import { useState, useRef, useEffect } from "react";

const DateSelector = ({
  onDateSelect,
  initialDate = new Date(),
  numDays = 5,
}) => {
  // Generate dates starting from initialDate
  const generateDates = () => {
    const dates = [];
    const startDate = new Date(initialDate);

    for (let i = 0; i < numDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const scrollContainerRef = useRef(null);

  // Format date to display day of month
  const formatDay = (date) => {
    return date.getDate();
  };

  // Format date to display short weekday name
  const formatWeekday = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  // Format month name
  const formatMonth = (date) => {
    return date.toLocaleDateString("en-US", { month: "short" });
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  // Scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "20px",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  };

  const titleStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    margin: 0,
  };

  const scrollContainerWrapperStyle = {
    position: "relative",
    width: "100%",
  };

  const scrollBtnStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "white",
    border: "1px solid #e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const leftBtnStyle = {
    ...scrollBtnStyle,
    left: "0",
  };

  const rightBtnStyle = {
    ...scrollBtnStyle,
    right: "0",
  };

  const dateContainerStyle = {
    display: "flex",
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    padding: "8px 30px",
    boxSizing: "border-box",
  };

  // Hide scrollbar for Chrome, Safari and Opera
  const hideScrollbarStyle = {};

  const dateItemStyle = (date) => {
    const isSelected = selectedDate.toDateString() === date.toDateString();
    const isTodayDate = isToday(date);

    return {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "60px",
      height: "70px",
      margin: "0 4px",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: isSelected
        ? "rgb(0 ,227, 5)"
        : isTodayDate
        ? "rgb(10, 53, 11)"
        : "#121212",
      color: isSelected ? "white" : "white",
      transition: "background-color 0.2s ease",
      boxSizing: "border-box",
      border: isSelected ? "none" : isTodayDate ? "1px solid #006102" : "none",
    };
  };

  const weekdayStyle = {
    fontSize: "12px",
    marginBottom: "2px",
  };

  const dayStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "2px 0",
  };

  const monthStyle = {
    fontSize: "11px",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>Select Date</h3>
      </div>

      <div style={scrollContainerWrapperStyle}>
        {/* <button
          onClick={scrollLeft}
          style={leftBtnStyle}
          aria-label="Scroll left"
        >
          ‹
        </button> */}

        <div
          ref={scrollContainerRef}
          style={{ ...dateContainerStyle, ...hideScrollbarStyle }}
        >
          {dates.map((date, index) => (
            <div
              key={index}
              onClick={() => handleDateSelect(date)}
              style={dateItemStyle(date)}
            >
              <span style={weekdayStyle}>{formatWeekday(date)}</span>
              <span style={dayStyle}>{formatDay(date)}</span>
              <span style={monthStyle}>{formatMonth(date)}</span>
            </div>
          ))}
        </div>

        {/* <button
          onClick={scrollRight}
          style={rightBtnStyle}
          aria-label="Scroll right"
        >
          ›
        </button> */}
      </div>
    </div>
  );
};

export default DateSelector;
