import React from "react";
import "./debits.css";
import NEW from "../NEW";
import Modal from "./modal";
import { useState } from "react";
import Table from "./Table";

const DB = () => {
  const [modalopen, setmodalopen] = useState(false);
  const [btnname , setbtnname] = useState("Open")
  const handleclose = () => {
    setmodalopen(!modalopen);
    setbtnname(modalopen ? "Open" : "Close");
  };
  const [FormData, setFormData] = useState({
    Name: "",
    description: " ",
    date: "",
  });
  const [rows, setrows] = useState(
    []);

  const handlerAddrows = (newrow) => {
    setrows([...rows, newrow]);
  };
  const handlerDelete = (targetIndex) => {
    const Updaterow = rows.filter((_, index) => index !== targetIndex);
    setrows(Updaterow);
  };

  return (
    <div className="debits-container">
      <NEW />
      <button className="btn1" onClick={() => setmodalopen(true)}>
        {btnname}
      </button>
      <div className="Itable">
        <Table rows={rows} setrow={setrows} deleteRow={handlerDelete} />
      </div>
      {modalopen && (
        <Modal
          onclose={handleclose}
          onsubmit={handlerAddrows}
          FormData={FormData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default DB;
