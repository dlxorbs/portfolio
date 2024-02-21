import React, { useEffect, useState } from "react";
import "./Page.css";
import CardList from "../Component/Card/CardList";
import Title from "../Component/Title/Title";
import DesignerPage from "../Component/Introduction/Introduction";
import { db, storage } from "../firebase";
import $ from "jquery";
import Section from "../Component/Section/Section";
import SkillCardList from "../Component/Card/SkillCardList";

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

  // db에서 불러오기 skill
  const [skilldata, setskillData] = useState([]);
  useEffect(function () {
    let Datas = [];
    db.collection("skilllist")
      .get()
      .then(function (qs) {
        qs.forEach((doc) => {
          Datas.push(doc.data());
        });
        setskillData(Datas);
      });
  }, []);

  // db에서 불러오기 history
  const [historydata, sethistoryData] = useState([]);
  useEffect(function () {
    let Datas = [];
    db.collection("history")
      .get()
      .then(function (qs) {
        qs.forEach((doc) => {
          Datas.push(doc.data());
        });
        sethistoryData(Datas);
      });
  }, []);

  return (
    <div className="pageWrapper">
      <Title data={historydata}></Title>
      <div className="pageContainer">
        <Section
          className={"skills"}
          title={"Skills"}
          children={<SkillCardList data={skilldata}></SkillCardList>}
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
