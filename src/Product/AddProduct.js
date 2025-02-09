import React, { useState } from "react";
import axios from "axios";
import "../css/AddProduct.css";

const AddProduct = ({ submit }) => {
  const [Formstate, setFormstate] = useState({
    Pname: "",
    sellingPrice: "",
    BoughtPrice: "",
    stock: "",
    ValueInKg:"",
    WEIGHT:"",
    AmountInPackage:""
  });
  const [error, seterror] = useState({});
  const Validateform = () => {
    let tempErorr = {};
    if (isNaN(Formstate.sellingPrice)) {
      tempErorr.sellingPrice = "Please Enter required value";
    } else if (!Formstate.sellingPrice.trim()){
      tempErorr.sellingPrice = 'Selling price is empty'
    }
   if(isNaN(Formstate.WEIGHT)){
    tempErorr.WEIGHT = "Please valid Data"
   }
    if(isNaN(Formstate.BoughtPrice)){
      tempErorr.BoughtPrice = 'Please Enter required value'
    }else if(!Formstate.BoughtPrice.trim()){
      tempErorr.BoughtPrice = 'BoughtPrice is Empty'
    }
    if(!Formstate.Pname.trim()){
      tempErorr.Pname = 'Product name is Empty'
    }
    if(isNaN(Formstate.AmountInPackage)){
      tempErorr.AmountInPackage = "Please Enter Valid Data"
    }
    
    if(isNaN(Formstate.stock)){
      tempErorr.stock = 'Please Enter Valid Data'
    }else if(!Formstate.stock.trim()){
      tempErorr.stock = "stock field is Empty"
    }
    if(isNaN (Formstate.ValueInKg)){
      tempErorr.ValueInKg = "Please in Correct Value"
    }
    seterror(tempErorr);
    return Object.keys(tempErorr).length === 0;
  };
  const handleForm = (e) => {
    setFormstate((prevFormstate) => ({
      ...prevFormstate,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Validateform()) {
    axios.post("http://localhost:8081/RegProduct/service" , Formstate)
    .then((res) =>{ console.log ("Data sent Successfuly",res)})
    .catch((error)=>{console.error("Failed to sent Data :", error)})
      submit(Formstate);
    
    }
    setFormstate({

      Pname: "",
      sellingPrice: "",
      BoughtPrice: "",
      stock: "",
      ValueInKg: "",
      WEIGHT:"",
      AmountInPackage:""
    });
  };
  return (
    <div className="Pform-container">
      <h2 className="title-form">Add-Product</h2>
      <form className="form-Product" onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="Pname" className="label-prop">
            ProductName
          </label>
          <input
            type="text"
            id = "Pname"
            name="Pname"
            value={Formstate.Pname}
            onChange={handleForm}
          />
           {error.Pname && <p style={{color: 'red'}}>{error.Pname}</p>}
         </div>

          <div>
          <label htmlFor="sellingPrice" className="label-prop">
            SellingPrice
          </label>
          <input
            type="text"
            id="sellingPrice"
            name="sellingPrice"
            value={Formstate.sellingPrice}
            onChange={handleForm}
          />
            {error.sellingPrice && <p style={{color:"red"}}> {error.sellingPrice}</p>}
          </div>  
     
         <div>
          <label htmlFor="BoughtPrice" className="label-prop">
            BoughtPrice
          </label>
          <input
            type="text"
            id="BoughtPrice"
            name="BoughtPrice"
            value={Formstate.BoughtPrice}
            onChange={handleForm}
          />
           {error.BoughtPrice && <p style={{color: 'red'}}>{error.BoughtPrice}</p>}
         </div>

        
         <div>
          <label htmlFor="stock" className="label-prop">
            Stock
          </label>
          <input
            type="text"
            id="stock"
            name="stock"
            value={Formstate.stock}
            onChange={handleForm}
          />
           {error.stock && <p style={{color: 'red'}}>{error.stock}</p>}
         </div>

         <div>
          <label htmlFor="ValueInKg" className="label-prop">
            Value In Kg.
          </label>
          <input
            type="text"
            id="ValueInKg"
            name="ValueInKg"
            value={Formstate.ValueInKg}
            onChange={handleForm}
          />
           {error.ValueInKg && <p style={{color: 'red'}}>{error.ValueInKg}</p>}
         </div>
         <div>
         <label htmlFor="AmountInPackage" className="label-prop">
            Value In Package
          </label>
          <input
            type="text"
            id="AmountInPackage"
            name="AmountInPackage"
            value={Formstate.AmountInPackage}
            onChange={handleForm}
          />
           {error.AmountInPackage && <p style={{color: 'red'}}>{error.AmountInPackage}</p>}
         </div>

         <div>
          <label htmlFor="PackageWeight" className="label-prop">
            Package Weight
          </label>
          <input
            type="text"
            id="PackageWeight"
            name="WEIGHT"
            value={Formstate.WEIGHT}
            onChange={handleForm}
          />
           {error.WEIGHT && <p style={{color: 'red'}}>{error.WEIGHT}</p>}
         </div>
         <div>
          
        <button type=" submit" className="Addproductbtn">Submit</button>
        </div>
      </form>
    
    </div>
  );
};

export default AddProduct;
