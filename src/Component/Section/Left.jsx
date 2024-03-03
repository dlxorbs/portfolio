import React from "react";
import "./Section.css";
export default function Left(props) {
  return (
    <div
      className="LeftContianer"
      // style={{ display: `${props.img === "" ? "none" : "flex"}` }}
    >
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

      <div className="imgContainer">
        {props.head === "Architecture" ? (
          <div className="over" onClick={props.onClick}>
            <span>Show {props.head} Image</span>
          </div>
        ) : (
          ""
        )}
        <img
          className={`image ${props.img}`}
          src={props.src}
          onClick={
            props.head === "Architecture" ? props.onClick : console.log("a")
          }
          alt=""
        />
      </div>
    </div>
  );
}
