import React from "react";
import "./skill.css";

export default function Skills(props) {
  return (
    <div
      className="skill"
      style={{ backgroundImage: `url(${props.skillIcon})` }}
    ></div>
  );
}
