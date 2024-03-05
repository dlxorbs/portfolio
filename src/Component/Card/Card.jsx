import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";
import Skilllist from "../Skills/SkillList";
import github from "../../Img/github.svg";

export default function Card(props) {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [angledegree, setAngledegree] = useState(180);
  const [isclicked, setClicked] = useState(false);

  const nav = useNavigate();
  // 스크롤 초기화 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  function cardMoving(e) {
    if (window.innerWidth >= 800) {
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
    } else {
      setRotationX(0);
      setRotationY(0);
    }
  }

  const link1open = () => {
    const url = props.link;
    window.open(url, "_blank");
    console.log(url);
  };

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
              : `linear-gradient(${angledegree}deg, rgba(255, 251, 238, 0.30) 20%, rgba(255, 255, 255, 0.00) 80.56%)`
          }`,
        }}
      ></div>
      <div className={`cardHover `}>
        <span
          className="cardtitle"
          style={{
            opacity: isclicked ? "0" : "1",
            transition: isclicked ? "0s" : "0.5s",
            transitionDelay: isclicked ? "0s" : "0.3s",
            color: props.color === "white" ? "#ffffff" : "#000000",
          }}
        >
          {props.title || ""}
        </span>
        <span className="content">{props.content || ""}</span>
      </div>
      <div
        className={`cardImage `}
        style={{
          backgroundImage: `url(${props.thumbnail} )`,
          backgroundColor: `url(${isclicked ? "#333333" : `#ffffff`} )`,
          opacity: isclicked ? "0" : "1",
          transition: isclicked ? "0s" : "0.5s",
        }}
      ></div>
      <div className={`cardBack  ${isclicked ? "imgclick" : ""}`}>
        <div className="infoWrapper">
          <div className="skilltitle">SKILL</div>

          <Skilllist data={props.skilldata}></Skilllist>
          <div className="infoContainer">
            <div className="projecttype">Work type</div>
            <span className="type">{props.type}</span>
            <div className="projecttype">Participate</div>
            <span className="type"> {props.participate} </span>
          </div>
        </div>
        <div className="link github" onClick={link1open}>
          {" "}
          <img src={github} alt="" />
        </div>
        <div
          className="link visitsite"
          onClick={() => {
            nav("/" + props.id);
            scrollToTop();
          }}
        >
          show more
        </div>
      </div>
    </div>
  );
}
