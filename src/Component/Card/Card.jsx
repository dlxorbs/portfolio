import React, { useState } from "react";
import "./card.css";
import reactimg from "../../Img/react.svg";
import jsimg from "../../Img/JS.svg";
import firebaseimg from "../../Img/firebase.svg";
import Skills from "../Skills/Skills";

export default function Card(props) {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [angledegree, setAngledegree] = useState(180);
  const [isclicked, setClicked] = useState(false);
  function cardMoving(e) {
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = Math.round(((offsetX - centerX) / centerX) * -20);
    const deltaY = Math.round(((offsetY - centerY) / centerY) * 20);

    setRotationX(deltaY);
    setRotationY(deltaX);

    // 마우스 위치와 중앙점 계산하고 atan2이용해서 반댓값 계산
    const angle = Math.atan2(offsetY - centerY, offsetX - centerX);
    // 각도에서 90도 추가하여 완전 반대 위치로 잡을 수 있도록 제작
    setAngledegree((angle * 180) / Math.PI + 90);
  }

  return (
    <div
      className={`cardContainer ${isclicked ? "clicked" : ""}`}
      onClick={(e) => {
        setClicked(!isclicked);
      }}
      onMouseMove={(e) => {
        cardMoving(e);
      }}
      style={{
        transform: `${
          isclicked
            ? ""
            : `perspective(1920px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
        }`,
      }}
      onMouseLeave={() => {
        setRotationX(0);
        setRotationY(0);
        setAngledegree(180);
      }}
    >
      <div
        className={"overlay"}
        style={{
          background: `${
            isclicked
              ? ""
              : `linear-gradient(${angledegree}deg, rgba(255, 251, 238, 0.30) 20.94%, rgba(255, 255, 255, 0.00) 80.56%)`
          }`,
        }}
      ></div>
      <div className={`cardHover `}>
        <span className="cardtitle">{props.title || ""}</span>
        <span className="content">{props.content || ""}</span>
      </div>
      <div
        className={`cardImage `}
        style={{
          backgroundImage: `url(${isclicked ? "none" : props.thumbnail} )`,
          backgroundColor: `url(${isclicked ? "#333333" : `#ffffff`} )`,
        }}
      ></div>
      <div className={`cardBack  ${isclicked ? "imgclick" : ""}`}>
        <Skills></Skills>
      </div>
    </div>
  );
}
