import "./App.css";
import SignIn from "./components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.jsx";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import SplashScreen from "./components/SplashScreen.jsx";
import Onboarding from "./components/Onboarding.jsx";
import HomePage from "./components/HomePage.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const { data: userData, error } = await supabase
            .from("users")
            .select()
            .eq("emailID", user.email)
            .single();
          if (error) {
            // console.error("Error fetching user:", error);
          } else {
            setUsers([userData]);
          }
        } catch (error) {
          // console.error("Error fetching user:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  function isUserPresent() {
    return user && users.length > 0;
  }

  return (
    <>{user ? isUserPresent() ? <HomePage /> : <Onboarding /> : <SignIn />}</>
  );
}

export default App;
