import React from "react";
import "./debits.css";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";

const Table = ({ rows, deleteRow }) => {
  return (
    <div>
      <table className="table">
        <thead className="head">
          <tr>
            <th>Name</th>
            <th className="width">Description</th>
            <th>Date</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody className="border">
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td>{row.date}</td>
                <td>
                  <span>
                    <BsFillTrashFill
                      onClick={() => deleteRow(index)}
                      className="RED"
                    />
                  </span>
                </td>
                <td>
                  <span>
                    <BsPencilFill className="Pencil" />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
