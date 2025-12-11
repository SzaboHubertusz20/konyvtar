import React from "react";
import './styles.css'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Comp/Navbar"
import Konyvek from "./Comp/Konyvek";
import UjKonyv from "./Comp/Ujkonyv";


export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Konyvek />} />
          <Route path="/uj-konyv" element={<UjKonyv />} />
        </Routes>
      </div>
    </Router>
  );
}
