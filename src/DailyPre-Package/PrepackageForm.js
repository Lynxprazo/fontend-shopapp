import React, { useState } from "react";
import "./PrepackageForm.css";
import axios from "axios";

const PrepackageForm = ({ handleAddRows }) => {
  const [PreForm, setPreForm] = useState({
    ProductName: "",
    Amount: "",
    ValueInKg: "",
    AmountKg: "",
  });
  const [DropData, setDropData] = useState([]);
  const [Error, setError] = useState("");
  const handlePreForm = (e) => {
    const { name, value } = e.target;
    setPreForm((PrevValue) => ({
      ...PrevValue,
      [name]: value,
    }));
    console.log(PreForm);
  };
  const handleFetchdata = async () => {
    try {
      const getData = await axios.get(
        "http://localhost:8081/SalesWeight/Prepackage"
      );
      const GetData = getData.data.map((product) => ({
        No: product.No,
        Pname: product.Pname,
        sellingPrice: product.sellingPrice,
        ValueInKg: product.ValueInKg,
      }));
      setDropData(GetData);
    } catch (error) {
      console.error(error);
    }
  };
  useState(() => {
    handleFetchdata();
  }, []);

  const handleSelect = (e) => {
    const TargetProduct = e.target.value;
    if (TargetProduct === "") {
      setPreForm({
        ProductName: "",
        Amount: "",
      });
    } else {
      const selectPname = DropData.find(
        (product) => product.Pname === TargetProduct
      );
      setPreForm({
        ...PreForm,
        ProductName: selectPname.Pname,
        Amount: selectPname.sellingPrice,
        ValueInKg: selectPname.ValueInKg,
      });
    }
  };
  const handleValidation = () => {
    const Validate = {};
    if (!PreForm.Amount) {
      Validate.Amount = "Please Enter the Amount of That Product";
    }
    if (!PreForm.ProductName) {
      Validate.ProductName = "Please Select Product";
    }
    if (!PreForm.ValueInKg) {
      Validate.ValueInKg = "Please Enter value per Kilogram";
    }
    setError(Validate);
    return Object.keys(Validate).length === 0;
  };
  const handleOnsubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const NewRows = {
        ProductName: PreForm.ProductName,
        Amount: PreForm.Amount,
      };
      handleAddRows(NewRows);
      axios.post("http://localhost:8081/SalesWeight/SendPreForm", PreForm)
      .then((res) => console.log("Successfuly Inserted "))
      .catch((error) => console.error(error))
      setPreForm({
        ProductName: "",
        Amount: "",
        ValueInKg:"",
        AmountKg:""
      });
    }
  };
  return (
    <div className="PrepackageForm-Container">
      <div>
        {(Error.ValueInKg || Error.Amount || Error.ProductName) && (
          <p className="ErrorPrepackage">
            {Error.Amount || Error.ProductName || Error.ValueInKg}
          </p>
        )}{" "}
      </div>
      <form onSubmit={handleOnsubmit}>
        <label htmlFor="ProductNameId">ProductName</label>
        <select id="ProductNameId" name="DropData" onChange={handleSelect}>
          <option value="">--Select Product--</option>
          {DropData.map((product) => (
            <option key={product.No} value={product.Pname}>
              {product.Pname}
            </option>
          ))}
        </select>

        <label htmlFor="AmountId">Amount Of Product</label>
        <input
          type="text"
          id="AmountId"
          name="Amount"
          onChange={handlePreForm}
          value={PreForm.Amount}
        />
        <label htmlFor="NumberKg">Kilogram-required</label>
        <input
          type="text"
          id="NumberKg"
          name="AmountKg"
          onChange={handlePreForm}
          value={PreForm.AmountKg}
        />

        <label htmlFor="KilogramId">Value Per Kilogram</label>
        <input
          type="text"
          id="KilogramId"
          name="ValueInKg"
          onChange={handlePreForm}
          value={PreForm.ValueInKg}
        />

        <div>
          <button type="submit">Send it...</button>
        </div>
      </form>
    </div>
  );
};

export default PrepackageForm;
