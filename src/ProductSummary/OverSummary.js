import React, { useState, useEffect } from "react";
import "./Overallsummary.css";
import { Progress } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import axios from "axios";

const OverSummary = () => {
  const [show, setshow] = useState(false);
  const [PercentageList, setPercentageList] = useState([]);
  const handlepercentage = async () => {
    try {
      const response = await axios.get("http://localhost:8081/FetchProduct/progressCircle");
      const { PercentProdRemain } = response.data;
      const PercentageRemaining = Object.keys(PercentProdRemain).map((product) => ({
        ProductName: product,
        PerRemain: PercentProdRemain[product],
      }));
      setPercentageList(PercentageRemaining);
    } catch (error) {
      console.error("Error fetching percentage data:", error);
    }
  };
  
  const handleShowlist = (e) => {
    e.preventDefault();
    setshow((prevshow) => !prevshow);
  };
  useEffect(() => {
    handlepercentage();
    const TimeInterval = setInterval(() => {
      handlepercentage();
    }, 3000);
    return () => clearInterval(TimeInterval);
  },[]);
  const style = {
    width: 70,
    display: "inline-block",
    marginLeft:"12px"
  };
  return (
    <div className="main-containerovsum">
      <button onClick={handleShowlist}> Show More summary</button>
      <div>
        { show &&
          <div className="Hpercent-circle" >
            {PercentageList.map((product) => {
              return (
                <div key={product.ProductName} style={style}>
  <span>{product.ProductName}</span>
  <Progress.Circle
    gapDegree={0}
    strokeWidth={5}
    percent={product.PerRemain}
   
  />
</div>
              );
            })}
          </div>
        }
      </div>
    </div>
  );
};

export default OverSummary;
