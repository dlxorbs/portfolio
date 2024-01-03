import React from "react";
import styles from "./card.css";
import Card from "./Card";

export default function CardList(props) {
  const list = props.data.map(function (item) {
    return (
      <Card
        thumbnail={item.img}
        key={item.id}
        title={item.title}
        content={item.content}
        onClick={function () {
          console.log(item.id + "이동");
          //   nav("/post/" + item.id);
        }}
      ></Card>
    );
  });

  return <div className={"maincontainer"}>{list}</div>;
}
