import React, { useState } from "react";
import Main from "./Product/Main";
import NEW from "./NEW";
import { NavLink } from "react-router-dom";
import "./css/service.css";
import { FaXbox } from "react-icons/fa6";
import { GoReport } from "react-icons/go";
import { TbLocationFilled } from "react-icons/tb";
import { FaBoxOpen } from "react-icons/fa";

import { FaMoneyBillTransfer } from "react-icons/fa6";

const Services = () => {
  const [Modalopen, setModalopen] = useState(false);
  const [btnName , setbtnName] = useState("Open");
  const handleopen = (e) => {
    e.preventDefault();
    setModalopen(!Modalopen);
    setbtnName(Modalopen ? "Open" : "Close");
  };

  return (
    <div className="Service-page">
      <div> <NEW /></div>
     

      <nav className="head-service">
        <div className="leSnake">
          {"WELCOME TO OUR SERVICE".split("").map((char, index) => (
            <h2 key={index}>
              <span style={{ animationDelay: `${index * 0.1}s` }}>{char}</span>
            </h2>
          ))}
        </div>
      </nav>
      <div>
        <div className="Container-MiniNav">
         
          <ul>
          </ul>
            <li><NavLink to= "/Daily">< FaXbox/>Pre-Package</NavLink></li>
            <li><NavLink to = "/Jumla"><FaBoxOpen />Measured Product</NavLink></li>
            <li><NavLink to = "/Profit">  < GoReport/>Report</NavLink></li>
            <li><NavLink to = "/Stock">  <  TbLocationFilled/>Stock Tracker</NavLink></li>
            <li><NavLink to = "/ProductSummary">  <  FaMoneyBillTransfer className="FaMoneny"/>Product Summary</NavLink></li>
        </div>
        <button type="submit" className="btnService" onClick={handleopen}>{btnName}</button>
      </div>
      {Modalopen && <Main/>}
    </div>
  );
};

export default Services;
