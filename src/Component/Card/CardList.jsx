import React from "react";
import styles from "./card.css";
import Card from "./Card";

export default function CardList(props) {
  const list = props.data.map(function (item) {
    return (
      <Card
        thumbnail={item.img}
        key={item.title}
        title={item.title}
        content={item.content}
        skilldata={item.skills}
        link={item.link}
      ></Card>
    );
  });

  return <div className={"maincontainer"}>{list}</div>;
}
