import React from "react";
import styles from "./card.css";
import Card from "./Card";

export default function CardList(props) {
  const list = props.data.map(function (item) {
    // console.log(item.id);
    return (
      <Card
        id={item.id}
        thumbnail={item.img}
        key={item.title}
        title={item.title}
        content={item.content}
        skilldata={item.skills}
        link={item.link}
        color={item.color || ""}
        type={item.type}
        participate={item.participate}
        span={props.span}
      ></Card>
    );
  });

  return <div className={"maincontainer"}>{list}</div>;
}
