import React from "react";
import "./skill.css";
import Skills from "./Skills";

export default function Skilllist(props) {
  let className = "";

  if (props.data.length === 4) {
    // 데이터의 길이가 4인 경우 마지막 요소에 .leftskill 클래스 추가
    className = "leftskill";
  } else if (props.data.length >= 7) {
    // 데이터의 길이가 7 이상인 경우 마지막 요소에 .leftskill 클래스 추가
    className = "leftskill";
  }

  const list = props.data.map(function (icons, index) {
    // 마지막 요소에 클래스 추가
    const isLastItem = props.data.length === index + 1;
    const finalClassName = isLastItem ? className : "";

    return <Skills key={icons} skillIcon={icons} className={finalClassName} />;
  });

  return <div className="skilllist">{list}</div>;
}
