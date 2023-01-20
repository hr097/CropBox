import * as React from "react";
import "./assets/style/App.css";
import Meesho from "./screens/Meesho";
import Feedback from "./screens/Feedback";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Flipkart from "./screens/Flipkart";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Flipkart />}></Route>
        <Route path="/flipkart" element={<Flipkart />}></Route>
        <Route path="/meesho" element={<Meesho />}></Route>
        <Route path="/feedback" element={<Feedback />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
