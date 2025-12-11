import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const loc = useLocation();
  return (
    <nav className="navbar">
      <div className="brand">Könyvtár</div>
      <Link className={loc.pathname === "/" ? "active" : ""} to="/">Könyvek</Link>
      <Link className={loc.pathname === "/uj-konyv" ? "active" : ""} to="/uj-konyv">Új könyv</Link>
    </nav>
  );
}
