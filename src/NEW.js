import React, { useState } from "react";
import "./css/new.css";
import { NavLink } from "react-router-dom";
import Image from "./image";
import { RiDashboardFill } from "react-icons/ri";
import { GiBeachBag } from "react-icons/gi";
import { ImUserMinus } from "react-icons/im";
import { PiChartLineUpBold } from "react-icons/pi";

import { RiCustomerServiceLine } from "react-icons/ri";
import { LuLogIn } from "react-icons/lu";

const NEW = () => {
  const [Isopen, setIsopen] = useState(false);
  const [isAcross, setAcross] = useState(false);

  const handleBurger = () => {
    setIsopen(!Isopen);
    setAcross(!isAcross);
  };

  return (
    <div className="nav-body">
      <nav className="navigation" onClick={handleBurger}>
        <div className={`burger ${isAcross ? "across" : ""}`}>
          <div className="L1"></div>
          <div className="L2"></div>
          <div className="L3"></div>
        </div>
        <Image />
        <ul className={`nav-links ${Isopen ? "open" : ""}`}>
          <li>
            <NavLink
              to="/Dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span style={{ display: "flex", flexDirection: "row", padding: "2px" }}>
                {" "}
                <RiDashboardFill />
                Dashboard
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Register"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span style={{ display: "flex", flexDirection: "row" }}>
                <GiBeachBag /> Register
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span style={{ display: "flex", flexDirection: "row" }}><LuLogIn/>Login</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Debits"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span style={{ display: "flex", flexDirection: "row" }}>
                <ImUserMinus />
                Debits
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span style={{ display: "flex", flexDirection: "row" }}>
                {" "}
                <RiCustomerServiceLine />
                Services
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profit"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span style={{ display: "flex", flexDirection: "row" }}>
                <PiChartLineUpBold />
                Performance
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NEW;
