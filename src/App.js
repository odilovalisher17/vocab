import React from "react";
import Homepage from "./Components/Homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddingWord from "./Components/AddingWord";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add" element={<AddingWord />} />
      </Routes>
    </Router>
  );
};

export default App;
