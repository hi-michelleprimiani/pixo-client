import { useState } from "react";
import { ApplicationViews } from "./views/ApplicationViews";
import { BrowserRouter } from "react-router-dom";
//! Import NavBar !! import { NavBar } from "./components/nav/NavBar";
//! Invoke right about appviews on line 29

function App() {
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));

  const setToken = (newToken) => {
    localStorage.setItem("auth_token", newToken);
    setTokenState(newToken);
  };
  const setCurrentUserId = (newUserId) => {
    localStorage.setItem("user_id", newUserId);
    setUserId(newUserId);
  };

  return (
    <BrowserRouter>
      <ApplicationViews
        token={token}
        setToken={setToken}
        userId={userId}
        setCurrentUserId={setCurrentUserId}
      />
    </BrowserRouter>
  );
}

export default App;
