import React, { useState, useEffect } from "react";
import "./Daily.css";
import NEW from "../NEW";
import DailyForm from "./DailyForm";
import axios from "axios";

const Daily = () => {
  const [rows, setrows] = useState([]);
  const [TotalAmount, setTotalAmount] = useState(0);
  const [popup, setpopup] = useState(false);
  const [btname, setbtname] = useState("Open");
const SalesReturn = async()=>{
  try{
    const Returnsales = await axios.get("http://localhost:8081/SalesWeight/SalesReturn")
     const Sales = Returnsales.data.map((Sales) =>({
     ProductName:Sales.ProductName,
     sellingPrice:Sales.sellingPrice,
     ProductNumber:Sales.ProductNumber
    }))
   setrows(Sales);
  }catch(err){
    console.error(err);
  }

};
useEffect(()=>{
  SalesReturn();
  const TimeInterval = setInterval(()=>{
    SalesReturn();
  }, 500);
  // Clear the request when the component is Unmount


  
  return () =>clearInterval(TimeInterval);
}, [])
  const handleTotalAmount = () => {
    const DailyTotal = rows.reduce(
      (acc, currentValue) => acc + Number(currentValue.sellingPrice) * Number(currentValue.ProductNumber),
      0
    );
    setTotalAmount(DailyTotal);
    axios.post("http://localhost:8081/SalesWeight/packaged",{DailyTotal})
    .then((res) => console.log({message:"Successuly sent data to thae backend",res}))
    .catch((err) => console.error({message:"Failed to sent data to the backend ", err}))
  };


  const HandlerShow = () => {
    setpopup(!popup);
    setbtname(popup ? "Open" : "Close");
  };
  const handleAddrows = (newrow) => {
    setrows([...rows, newrow]);
  };

  return (
    <div>
      <NEW />
      <div className="Daily-container">
        <h1>Daily - Bulk Sales</h1>
        <div className="Daily-calender">
          <p>Date Of Today</p>{" "}
          <span>
            {" "}
            <input type="Date" name="Date" />
          </span>
        </div>
        <div className="Daily-submission">
          <button type="submit" onClick={handleTotalAmount}>
            Sum Up
          </button>
          <p
            className="reflect-text"
            data-text={`Total Sales ${TotalAmount} .Sh`}
          >
            Total Sales {TotalAmount}.Sh
          </p>
        </div>
        <button className="DailyBtn" onClick={HandlerShow}>
          {btname}
        </button>
        <div className="Record-table">
          <table className="table2">
            <thead className="R-row">
              <tr>
                <th>S/N</th>
                <th>Product Name </th>
                <th>Amount Per Package</th>
                <th>No Of Products</th>
                <th>Total Per Each Product</th>
             
              </tr>
            </thead>
            <tbody className="bodyprop">
              {rows.map((row, index) => {
                return (
                  <tr key={index} >
                    <td style={{backgroundColor:" #ecf0f1"}}>{index + 1}</td>
                    <td style={{backgroundColor:" #d5d8dc " , borderRadius:"none", borderCollapse:"collapse" }}>{row.ProductName}</td>
                    <td style={{backgroundColor:"#ecf0f1  " , borderRadius:"none" }}>{row.sellingPrice}</td>
                    <td style={{backgroundColor:" #d5d8dc " , borderRadius:"none"}}>{row.ProductNumber}</td>
                    <td style={{backgroundColor:"#ecf0f1  " , borderRadius:"none" }}>{row.sellingPrice * row.ProductNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {popup && <DailyForm onsubmit={handleAddrows} />}
        </div>
      </div>
    </div>
  );
};

export default Daily;
