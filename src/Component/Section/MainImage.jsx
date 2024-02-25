import React from "react";
import "./Section.css";

export default function MainImg(props) {
  let content;
  let major;

  return (
    <div className="mainImage">
      <div className="imagecon">
        <div className="black"></div>
        <img className="smimg" src={props.src} alt="" />
      </div>
      <div className="maintextcon">
        <div className="maintext">
          <h1>{props.main}</h1>
          <span>{props.oneline}</span>
        </div>
      </div>
    </div>
  );
}
