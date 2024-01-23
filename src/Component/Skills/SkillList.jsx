import React from "react";
import "./skill.css";
import Skills from "./Skills";

export default function Skilllist(props) {
  const list = props.data.map(function (icons) {
    return <Skills key={icons} skillIcon={icons} />;
  });

  return <div className="skilllist">{list}</div>;
}
