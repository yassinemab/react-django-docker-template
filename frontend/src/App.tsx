import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./style.css";

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/user/`)
      .then((res) => {
        if (res.status === 200) {
          // Create a context for the user, so every component can access the
          // user if wanted.
        }
      });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
