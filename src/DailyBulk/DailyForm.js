import React, { useState, useEffect } from "react";
import "./DailyForm.css";
import Buttton from "../Components/buttton";
import axios from "axios";


const DailyForm = ({ onsubmit }) => {
  const [Error , setError] = useState({})
  const [Formstate, setFormstate] = useState({
    ProductNumber: "",
    sellingPrice: "",
    ProductName: "",
  });
  const [Dropdown, setDropdown] = useState([]);
  const handleFetchData = async () => {
    try {
      const ProductName = await axios.get(
        "http://localhost:8081/SalesWeight/getProductName"
      );
      console.log( "This are requested data from backend",ProductName);
      const SelectPname = ProductName.data.map((Product) => ({
        No: Product.No,
        Pname: Product.Pname,
        sellingPrice: Product.sellingPrice,
      }));
      setDropdown(SelectPname);
    } catch (error) {
      console.error("Failed to fetch data from the database", error);
    }
  };

  // Form Validation  Section 
  const handeleValidation = () =>{
    const ErrorMessage = {};
    if(!Formstate.ProductName){
      ErrorMessage.ProductName ="Please Select the Product Name ";
    }
    if(!Formstate.sellingPrice.trim()){
      ErrorMessage.sellingPrice = "Please Enter The Value of Product";
    }else if(isNaN(Formstate.sellingPrice)){
      ErrorMessage.sellingPrice = "Please Enter Valid Data";
    }
    if(!Formstate.ProductNumber){
      ErrorMessage.ProductNumber = "Please Enter The Number of Product";
    }else if (isNaN(Formstate.ProductNumber)){
      ErrorMessage.ProductNumber = "Please Enter Valid Data";
    }
     setError(ErrorMessage);
     return Object.keys(ErrorMessage).length === 0;
  }
  
  useEffect(() => {
    handleFetchData();
  }, []);
  
  const handlerForm = (e) => {
    const { name, value } = e.target;
    setFormstate({ ...Formstate, [name]: value });
  };

  const handleDropDown = (e) => {
    const SelectedPname = Dropdown.find(
      (productname) => productname.Pname === e.target.value
    );
    setFormstate({
      ...Formstate,
      sellingPrice: SelectedPname.sellingPrice,
      ProductName: SelectedPname.Pname,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(handeleValidation()){
     
      const newRow = {
        ProductNumber: Formstate.ProductNumber,
        sellingPrice: Formstate.sellingPrice,
        ProductName: Formstate.ProductName,
      };
      onsubmit(newRow);
      axios.post("http://localhost:8081/SalesWeight/SalesBulk", Formstate)
      .then(()=>{console.log("data submitted successfuly ")})
      .catch((err)=>{console.error("There is no data sent to the database", err)})
      setFormstate({
        ProductNumber: "",
        sellingPrice: "",
        ProductName: "",
      });

    }
   ;
  };
  return (
    <div className="FormDaily-container">
      <form className="FormDaily-body" autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="productname">
              Select Product-Name
            </label>
          </div>
          <select id="productname" name="Dropdown" onChange={handleDropDown}>
            <option value="">--Select Product--</option>
            {Dropdown.map((product) => (
              <option key={product.No} value={product.Pname}>
                {product.Pname}
              </option>
            ))}
          </select>
          <div>
          {Error.Dropdown && <p  className="Error">{Error.Dropdown}</p> }
          </div>
          
          <div>
            <div>
              <label htmlFor="Productname">Product Quantity</label>
            </div>

            <input
              onChange={handlerForm}
              type="text"
              id ="Productname"
              placeholder="Enter product quantity"
              name="ProductNumber"
              value={Formstate.ProductNumber}
            />
              <div>
          {Error.ProductNumber && <p  className="Error">{Error.ProductNumber}</p> }
          </div>
          </div>
          <div>
          <div>
            {" "}
            <label htmlFor="Amount">Amount</label>
          </div>

          <input
            onChange={handlerForm}
            type="text"
            id="Amount"
            name="sellingPrice"
            placeholder="Enter Amount of product"
            value={Formstate.sellingPrice}
          />
            <div>
          {Error.sellingPrice && <p  className="Error">{Error.sellingPrice}</p> }
          </div>
        </div>
          <div>
            {" "}
        
            <Buttton name="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default DailyForm;