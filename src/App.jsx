import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.jsx";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SplashScreen from "./components/SplashScreen.jsx";
import Onboarding from "./components/Onboarding.jsx";
import HomePage from "./components/HomePage.jsx";
import SignIn from "./components/SignIn";
import SettingsPage from "./components/SettingsPage.jsx";
import Booking from "./components/Booking.jsx";
import BookingPage from "./components/BookingPage.jsx";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import SplashScreenStatic from "./components/SplashScreenStatic.jsx";

function App() {
  const [user, loading] = useAuthState(auth);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [currentHostelData, setCurrentHostelData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [startSelected, setStartSelected] = useState(false);

  // Step 1: Watch for authentication changes
  useEffect(() => {
    // If auth is still loading, don't do anything yet
    if (loading) return;

    // If user is not logged in, we can stop loading
    if (!user) {
      setIsDataLoading(false);
      return;
    }

    // If user is logged in, fetch user data
    async function fetchUserData() {
      try {
        const { data: userData, error } = await supabase
          .from("users")
          .select()
          .eq("emailID", user.email)
          .single();

        if (error) {
          console.error("Error fetching user:", error);
          setIsDataLoading(false);
          return;
        }

        // User exists in database
        if (userData) {
          setCurrentUserData(userData);

          // Only fetch hostel data if user has a hostel
          if (userData.hostelName) {
            const { data: hostelData, error: hostelError } = await supabase
              .from("Hostels")
              .select()
              .eq("hostelName", userData.hostelName)
              .single();

            if (!hostelError && hostelData) {
              setCurrentHostelData(hostelData);
            }
          }
        }

        // Finish loading
        setIsDataLoading(false);
      } catch (error) {
        console.error("Error in data fetching:", error);
        setIsDataLoading(false);
      }
    }

    fetchUserData();
  }, [user, loading]);

  if (!startSelected) {
    return <WelcomeScreen setStartSelected={setStartSelected} />;
  }
  // Show splash screen while authentication is loading
  // or while we're fetching user/hostel data
  if (loading || (user && isDataLoading)) {
    return <SplashScreen />;
  }

  // User is not authenticated, show sign in
  if (!user) {
    return <SignIn />;
  }

  // User is authenticated but hasn't completed onboarding
  if (!currentUserData) {
    return <Onboarding />;
  }

  // User is authenticated and has completed onboarding
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <HomePage
              currentHostelData={currentHostelData}
              currentUserData={currentUserData}
            />
          }
        />
        <Route
          path="/BookingPage/:floorNo"
          element={
            <BookingPage
              userData={currentUserData}
              hostelData={currentHostelData}
            />
          }
        />
        <Route path="/Booking" element={<Booking />} />
        <Route
          path="/SettingsPage"
          element={<SettingsPage currentUserData={currentUserData} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
