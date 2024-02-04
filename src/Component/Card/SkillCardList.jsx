import React from "react";
import Skillcard from "./SkillCard";

export default function SkillCardList(props) {
  const list = props.data.map(function (item) {
    return (
      <Skillcard
        thumbnail={item.img}
        key={item.id}
        title={item.title}
        content={item.content}
      ></Skillcard>
    );
  });

  return <div className={"maincontainer skilloption"}>{list}</div>;
}
