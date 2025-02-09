import React, { useState } from "react";
import NEW from "../NEW";
import "./performance.css";
import LineGraph from "../Chartdata/Line";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Profit = () => {
  
  const [Dropdown, setDropdown] = useState(false);
  const [Icon, setIcon] = useState(true);

  const dropdwnlink = () => {
    setDropdown(!Dropdown);
    setIcon(!Icon);
  };
  return (
    <div className="performance-background">
      <NEW />
      <div className="report-site">
        <div>
          <h3>Generate Report</h3>
        </div>
      </div>
      <div>
        <span>
          <div className="main-link">
            {Icon ? (
              <IoIosArrowForward
                style={{
                  fontSize: "30px",
                  filter: "drop-shadow(2px 2px 1px  red)",
                  fontWeight: "700",
                }}
              />
            ) : (
              <IoIosArrowDown
                style={{
                  fontSize: "30px",
                  color: "red",
                  filter: "drop-shadow(2px 2px 1px  black)",
                  fontWeight: "700",
                }}
              />
            )}
            <span onClick={dropdwnlink}>
              {" "}
              <Link>See More</Link>{" "}
            </span>
          </div>
          <div>
            <ul className={`dropdown-menu ${Dropdown ? "Show" : ""}`}>
              <li>
                <Link to="">Generate Report</Link>
              </li>
              <li>
                <Link to="">Performance over Month</Link>
              </li>
              <li>
                <Link to="">Performance over Year</Link>
              </li>
            </ul>
          </div>
        </span>
        <LineGraph />
      </div>
     
    </div>
  );
};

export default Profit;
