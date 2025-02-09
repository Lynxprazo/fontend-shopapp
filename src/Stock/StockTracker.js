import React, { useEffect, useState } from "react";
import NEW from "../NEW";
import "./Stock.css";
import Line from "../Chartdata/Line";
import { MdOutlineMyLocation } from "react-icons/md";
import axios from "axios";

const StockTracker = () => {
  const [trackProductStock, setTrackProductStock] = useState([]);
  const [error, setError] = useState(null);

  
  const handleStockTracker = async () => {
    try {
      const response = await axios.get("http://localhost:8081/ProductTrack/FirstTrack");
      const productTracking = response.data.StockAvailable.map((product) => ({
        ProductName: product.ProductName,
        ProductNumber: product.ProductNumber,
        StockWasAvailable: product.StockWasAvailable,
        StockRemain: product.StockRemain,
      }));
      setTrackProductStock(productTracking);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    }
  };

  useEffect(() => {
    handleStockTracker(); 
    const timeInterval = setInterval(() => {
      handleStockTracker();
    }, 3000);

    return () => clearInterval(timeInterval); 
  }, []);

  return (
    <div className="Stock-Container">
      <div><NEW /></div>
      <span className="Stock-Title">
        <h1>StockTracker <MdOutlineMyLocation style={{ color: "red" }} /> Management</h1>
      </span>
      <div className="Stock-Table">
        <table>
          <thead>
            <tr>
              <th>-Product Name-</th>
              <th>-Product Exported-</th>
              <th>-Product Imported-</th>
              <th>-Stock Remaining-</th>
            </tr>
          </thead>
          <tbody>
            {trackProductStock.map((item, index) => (
              <tr key={index}>
                <td>{item.ProductName}</td>
                <td>{item.ProductNumber}</td>
                <td>{item.StockWasAvailable}</td>
                <td>{item.StockRemain}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="Line-container">
        <Line />
      </div>
    </div>
  );
};

export default StockTracker;
