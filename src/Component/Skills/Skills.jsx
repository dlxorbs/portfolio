import React from "react";
import "./skill.css";
import reactimg from "../../Img/react.svg";
import jsimg from "../../Img/JS.svg";
import firebaseimg from "../../Img/firebase.svg";

export default function Skills(props) {
  const img =
    props.skillIcon === "react"
      ? reactimg
      : props.skillIcon === "js"
      ? jsimg
      : props.skillIcon === "firebase"
      ? firebaseimg
      : null;

  return (
    <div className="skill">
      <img src={img} alt="" />
    </div>
  );
}
