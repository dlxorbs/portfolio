import React from "react";
import "./Section.css";
export default function Right(props) {
  return (
    <div
      className="RightContianer"
      // style={{ display: `${props.text === "" ? "none" : "flex"}` }}
    >
      <div className="imgContainer">
        <img className={`image ${props.img}`} src={props.src} alt="" />
      </div>
      <div className={`textWrapper ${props.type}`}>
        <h4
          style={{
            "--width": props.width + "px",
          }}
        >
          {props.head || "dlxorbs"}
        </h4>
        <p>{props.text}</p>
      </div>
    </div>
  );
}
