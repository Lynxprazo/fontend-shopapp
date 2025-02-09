import React from "react";
import "./modal.css";

const Modal = ({ onclose, onsubmit, FormData, setFormData }) => {
  const handlerForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handlerSubmission = (e) => {
    e.preventDefault();
    onsubmit(FormData);
    setFormData({
      Name: "",
      description: "",
      date: "",
    });
  };

  return (
    <div className="modal-content">
      <form onSubmit={handlerSubmission}>
        <div className="close">
          <p  onClick={() => onclose()}>
            &times;
          </p>
        </div>
        <div className="headdb">
          {" "}
          <p>Insert the Debitor detail</p>
        </div>

        <div>
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            type="text"
            name="name"
            required
            onChange={handlerForm}
            value={FormData.name}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
        </div>
        <div>
          <textarea
            className="styled-textarea"
            name="description"
            required
            onChange={handlerForm}
            value={FormData.description}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
        </div>
        <div>
          <input
            type="Date"
            name="date"
            required
            onChange={handlerForm}
            value={FormData.date}
          />
        </div>
        <div className="modal-footer">
          <button className="btn2" type="submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
