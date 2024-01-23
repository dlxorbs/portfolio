import React, { useEffect, useState } from "react";
import "./Page.css";
import CardList from "../Component/Card/CardList";
import Title from "../Component/Title/Title";
import DesignerPage from "../Component/Introduction/Introduction";
import { db, storage } from "../firebase";

export default function Mainpage() {
  const [data, setData] = useState([]);
  useEffect(function () {
    let Datas = [];
    db.collection("post")
      .get()
      .then(function (qs) {
        qs.forEach((doc) => {
          Datas.push(doc.data());
        });
        setData(Datas);
      });
  }, []);

  return (
    <div className="pageWrapper">
      <Title></Title>
      <div className="pageContainer">
        <CardList data={data}></CardList>
      </div>
    </div>
  );
}
