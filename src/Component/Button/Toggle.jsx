// Toggle.jsx
import React from "react";
import "./Doenload.css";

const Toggle = ({ checked, onChange }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider round"></span>
    </label>
  );
};

export default Toggle;