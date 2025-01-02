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
  const [initializing, setInitializing] = useState(true);
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const { data: usersData, error } = await supabase.from("users").select();
    if (error) {
      console.error("Error fetching users:", error);
    } else {
      setUsers(usersData);
    }
  }
  function isUserPresent() {
    if (user && users.length > 0) {
      return users.some((u) => u.emailID === user.email);
    }
    return false;
  }
  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setInitializing(false);
      } else {
        const timer = setTimeout(() => {
          setInitializing(false);
        }, 1500);

        return () => clearTimeout(timer);
      }
    });

    return () => unsubscribe();
  }, []);

  if (initializing) {
    return <SplashScreen />;
  }
  return (
    <>{user ? isUserPresent() ? <HomePage /> : <Onboarding /> : <SignIn />}</>
  );
}

export default App;
