import React, { useEffect, useState } from "react";
import "./Introduction.css";
import { useNavigate, useParams } from "react-router-dom";

export default function Introduction() {
  const nav = useNavigate();
  const postId = useParams().id;
  const [teamdata, setTeamData] = useState({});
  const [imagedata, setImageData] = useState({});
  const [image, setImage] = useState("");
  const [studentname, setStudentname] = useState("");
  const [major, setMajor] = useState("");
  const [email, setEmail] = useState("");
  const [prof, setProf] = useState("");
  const [comment, setComment] = useState("");

  return (
    <div className={"page_Wrapper"}>
      <div className={"imageContainer"}>
        <img src={image} alt="" />

        <div className="name">
          <div className={"university"}>
            <h5>{studentname || "이태균"}</h5>
          </div>

          <div className={"profile"}>
            <p>
              {major == "1" ? "미디어디자인공학전공" : "산업디자인공학전공"}
            </p>
            <p>{email}</p>
          </div>

          <span className={"comment"}> {comment}</span>
        </div>
      </div>
    </div>
  );
}
