import "./App.css";
import SignIn from "./components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.jsx";
import { useState, useEffect } from "react";
import HomePage from "./components/HomePage.jsx";
import SplashScreen from "./components/SplashScreen.jsx";

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  if (!initializing) {
    return <SplashScreen />;
  }
  return (
    <>
      {user ? (
        <div>
          <HomePage />
        </div>
      ) : (
        <div>
          Please sign in
          <SignIn />
        </div>
      )}
    </>
  );
}

export default App;
