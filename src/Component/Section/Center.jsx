import React from "react";
import "./Section.css";
export default function Center(props) {
  return (
    <div className="CenterContainer">
      <img className="image center" src={props.src} alt="" />
      <div className="textWrapper center">
        <h4>{props.head || "dlxorbs"}</h4>
        <textarea readyOnly className="text" value={props.text}></textarea>
      </div>
    </div>
  );
}
