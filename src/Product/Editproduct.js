import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import "../css/Editproduct.css";
import { BsFillTrashFill } from "react-icons/bs";
import AddProduct from "./AddProduct";
import { GiCash } from "react-icons/gi";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
const Editproduct = () => {
  const [search, setsearch] = useState("");
  const [message, setmessage] = useState("");
  const [ShowMessage, setShowMessage] = useState(false);
  const handlersearch = (e) => {
    setsearch(e.target.value);
  };

  const AddNewProduct = (newpro) => {
    setProductAvailable([...ProductAvailable, newpro]);
  };

  const [ProductAvailable, setProductAvailable] = useState([]);
  const [Totalsales, setTotalsales] = useState(0);
  const handlerCalculate = () => {
    const Total = ProductAvailable.reduce(
      (acc, currentValue) =>
        acc + currentValue.sellingPrice * currentValue.stock,
      0
    );
    setTotalsales(Total);
  };
  const handleDeleteQuery = async (Pname) => {
    console.log("Pname  is sent ", Pname);
    const Delete = await axios.post("http://localhost:8081/Edit/Register", {
      Pname: Pname.trim(),
    });
    setmessage(Delete.data.message);
    ProductFetch();
    handleMessage();
  };
  const ProductFetch = async () => {
    try {
      await Promise(resolve =>setTimeout(resolve,3000))
      const Respond = await axios.get(
        "http://localhost:8081/FetchProduct/service"
      );
      // const data = Array.isArray (Respond.data ) ? Respond.data : [];

      const FetchedData = Respond.data.map((items) => ({
        ID: items.No,
        Pname: items.Pname,
        sellingPrice: items.sellingPrice,
        BoughtPrice: items.BoughtPrice,
        ValueInKg:
          items.ValueInKg !== null ? items.ValueInKg : "This is not sold in ",
        stock: items.stock,
        WEIGHT:
          items.WEIGHT !== null ? items.WEIGHT : "Product is not measured in",
        Datecome: items.Datecome,
        AmountInPackage:
          items.AmountInPackage !== null
            ? items.AmountInPackage
            : "Product sold in Kg format",
      }));
      setProductAvailable(FetchedData);
      console.log(Respond.data);
    } catch (error) {
      return console.error("Failed to send data ", error);
    }
  };
  const handleMessage = (msg) => {
    setmessage(msg);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setmessage("");
    }, 5000);
  };
  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [message]);
  useEffect(() => {
    ProductFetch();

    const TimeInterval = setInterval(() => {
      ProductFetch();
    }, 300);

    return () => clearInterval(TimeInterval);
  }, []);

  return (
    <div>
      <form className="search-container">
        <span className="search-component">
          <input
            type="search"
            name="search"
            onChange={handlersearch}
            placeholder="Find product by name"
          />
        </span>
        <IoMdSearch />
      </form>
      {ShowMessage && <p>{message}</p>}
      <div className="total">
        <button type="submit" onClick={handlerCalculate} className="submit">
          Close Sales
        </button>
        <p>
          {Totalsales}.Sh <GiCash style={{ color: "#85BB65" }} />
        </p>
      </div>
      <div>{message && <p>{message}</p>}</div>
      <span className="Addproduct-container">
        <table>
          <thead>
            <tr className="trhead-container">
              <td>No.</td>
              <td>ProductName</td>
              <td>Selling price</td>
              <td>Bought price</td>
              <td>Stock Package</td>
              <td>Total</td>
              <td>Date Of Registered</td>
              <td>Delete</td>
              <td>Edit Product</td>
            </tr>
          </thead>
          <tbody className="tbody-product">
            {Array.isArray(ProductAvailable) &&
              ProductAvailable.filter((items) => {
                return search.toLowerCase() === ""
                  ? items
                  : items.Pname.toLowerCase().includes(search);
              }).map((items, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{items.Pname}</td>
                  <td>{items.sellingPrice}.Sh</td>
                  <td>{items.BoughtPrice}.Sh</td>
                  <td>{items.stock}.Bags</td>
                  <td>{items.stock * items.sellingPrice}.Sh</td>
                  <td>{items.Datecome}</td>
                  <td>
                    <BsFillTrashFill
                      className="BsFillTrashFill"
                      onClick={() => handleDeleteQuery(items.Pname)}
                      style={{ cursor: "pointer", color: "blue" }}
                    />
                  </td>
                  <td>
                    <FaUserEdit
                      style={{
                        fontSize: "23px",
                        cursor: "pointer",
                        color: "blue",
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </span>
      <AddProduct submit={AddNewProduct} />
    </div>
  );
};

export default Editproduct;
