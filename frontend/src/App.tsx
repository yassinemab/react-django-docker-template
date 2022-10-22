import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./style.scss";

import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login/`)
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
