import "./App.css";
import SignIn from "./components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.jsx";
import { useState, useEffect } from "react";
import HomePage from "./components/HomePage.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import Onboarding from "./components/Onboarding.jsx";

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user] = useAuthState(auth);

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
    <>
      {user ? (
        <div>
          <Onboarding />
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
}

export default App;
