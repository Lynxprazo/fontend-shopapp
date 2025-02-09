import React,{useEffect, useState} from "react";
import NEW from "../NEW";
import "./package.css";
import PrepackageForm from "./PrepackageForm";
import axios from "axios";

const Prepackage = () => {
  const [PreTable, setPreTable] = useState([]);
  const[Isopen, setIsopen] =useState(false);
  const [TotalAmount , setTotalAmount] = useState (0);
  const[IsopenName, setIsopenName] = useState("Open it..");
const handleTotalAmount =(e) =>{
  e.preventDefault();
  const total = PreTable.reduce((acc,currentValue) => acc + Number(currentValue.TotalAmount), 0);
  setTotalAmount(total);
  axios.post("http://localhost:8081/SalesWeight/measured",{total})
  .then((res) => console.log({message:"Successfuly sent data to backend", res}))
  .catch((err) => console.error({message:"Failed to sent data to the backend ", err}))
}
const handlePreFormData = async() =>{
  const PreformData = await axios.get("http://localhost:8081/SalesWeight/getPreForm");
  const Mapping = PreformData.data.map((product) => ({
    No: product.id,
    ProductName:product.ProductName,
    ValueInKg : product.ValueInKg,
    AmountKg:product.AmountKg,
    TotalAmount : product.TotalAmount,
    SellingPrice: product.SellingPrice

  }));
  setPreTable(Mapping)
}


useEffect(() =>{
  handlePreFormData();
  const TimeInterval = setInterval(() =>{
    handlePreFormData()
  },500);
  return () =>clearInterval(TimeInterval);
},[])
  const handleOpen = () =>{
    setIsopen(!Isopen);
    setIsopenName(Isopen ? "Open it.." : "Close it..")
  } 
  const handleAddRows = (NewRows) =>{
    setPreTable([...PreTable,NewRows]);
  }
 
  return (
    <div className="Prepackage-Container">
      <div>
        <NEW />
      </div>
      <div className="prepackage-title">
        <p> Daily -Measured Product</p>
      </div>
      <div className="mainPrepackageCollect-container">
         <div className="inner-Prepackage">
             <button type="submit" onClick={handleTotalAmount}>Click Me</button>
             <p prepackage-text = {`Sales Of  Days Is...${TotalAmount} .sh`}>Sales Of  Days Is... {TotalAmount} .Sh</p>
         </div>
      </div>
      <div className="Prepackage-Button">
        <button type="submit" onClick={handleOpen}>{IsopenName}</button>
      </div>
      <div className="PrepackageTB-Container">
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Product Name</th>
              <th>Amount Per Kg.</th>
              <th>Calculate Kg</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {PreTable.map((items,index)=>{
              return(
                <tr key={index}>
                <td>{index + 1}</td>
                <td>{items.ProductName}</td>
                <td>{items.ValueInKg} sh per kg</td>
                <td>{items.AmountKg}.kg</td>
                <td>{items.TotalAmount}</td>
              </tr>
              )
             
            })}

          </tbody>
        </table>
        <div>{Isopen &&<PrepackageForm handleAddRows={handleAddRows}/>}</div>
        
      </div>
    </div>
  );
};

export default Prepackage;
