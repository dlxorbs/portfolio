import React, { useEffect, useState } from "react";
import "./Page.css";
import CardList from "../Component/Card/CardList";
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
        console.log(Datas);
      });
  }, []);

  return (
    <div className="pageContainer">
      <CardList data={data}></CardList>
    </div>
  );
}
