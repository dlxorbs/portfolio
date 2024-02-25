import React from "react";
import "./Section.css";
export default function Left(props) {
  return (
    <div className="LeftContianer">
      <div className={`textWrapper ${props.type || ""}`}>
        <h4
          style={{
            "--width": props.width + "px",
          }}
        >
          {props.head || "dlxorbs"}
        </h4>
        <textarea readOnly className="text" value={props.text} onChange={props.onChange}></textarea>
      </div>

      <img className={`image ${props.img || ""}`} src={props.src} alt="" />
    </div>
  );
}
