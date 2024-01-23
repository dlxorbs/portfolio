import React, { useEffect, useState } from "react";
import "./Page.css";
import CardList from "../Component/Card/CardList";
import Title from "../Component/Title/Title";
import DesignerPage from "../Component/Introduction/Introduction";
import { db, storage } from "../firebase";
import $ from "jquery";
import Section from "../Component/Section/Section";

export default function Mainpage() {
  // db에서 불러오기
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
        <Section
          className={"skills"}
          title={"Skills"}
          children={<CardList data={data}></CardList>}
        ></Section>
        <Section
          className={"works"}
          title={"Works"}
          children={<CardList data={data}></CardList>}
        ></Section>
      </div>
    </div>
  );
}
