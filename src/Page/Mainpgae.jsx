import React, { useContext, useEffect, useState } from "react";
import "./Page.css";
import CardList from "../Component/Card/CardList";
import Title from "../Component/Title/Title";
import DesignerPage from "../Component/Introduction/Introduction";
import { db, storage } from "../firebase";
import $ from "jquery";
import Scroll from "../Component/Scroll/Scroll";
import Section from "../Component/Section/Section";
import SkillCardList from "../Component/Card/SkillCardList";
import DownloadButton from "../Component/Button/Download";
import { AppContext } from "../Context/AppContext";
export default function Mainpage() {
  // db에서 불러오기

  // 헤더 데이터 가져오기

  const { headerToggleData } = useContext(AppContext);

  useEffect(() => {
    if (headerToggleData) {
      console.log("Header Clicked with data: ", headerToggleData);
      // 클릭 데이터를 기반으로 로직 추가
    }
  }, [headerToggleData]);

  // db에서 불러오기 history
  const [historydata, sethistoryData] = useState([]);
  useEffect(
    function () {
      let Datas = [];
      if (headerToggleData) {
        db.collection("history")
          .get()
          .then(function (qs) {
            qs.forEach((doc) => {
              Datas.push(doc.data());
            });
            sethistoryData(Datas);
          });
      } else {
        db.collection("historyKR")
          .get()
          .then(function (qs) {
            qs.forEach((doc) => {
              Datas.push(doc.data());
            });
            sethistoryData(Datas);
          });
      }
    },
    [headerToggleData]
  );
  const [data, setData] = useState([]);
  useEffect(
    function () {
      let Datas = [];
      if (headerToggleData) {
        db.collection("post")
          .get()
          .then(function (qs) {
            qs.forEach((doc) => {
              Datas.push(doc.data());
            });
            setData(Datas);
            console.log(Datas);
          });
      } else {
        db.collection("postKR")
          .get()
          .then(function (qs) {
            qs.forEach((doc) => {
              Datas.push(doc.data());
            });
            setData(Datas);
            console.log(Datas);
          });
      }
    },
    [headerToggleData]
  );

  // db에서 불러오기 skill
  const [skilldata, setskillData] = useState([]);
  useEffect(
    function () {
      let Datas = [];
      if (headerToggleData) {
        db.collection("skilllist")
          .get()
          .then(function (qs) {
            qs.forEach((doc) => {
              Datas.push(doc.data());
            });
            setskillData(Datas);
          });
      } else {
        db.collection("skilllistKR")
          .get()
          .then(function (qs) {
            qs.forEach((doc) => {
              Datas.push(doc.data());
            });
            setskillData(Datas);
          });
      }
    },
    [headerToggleData]
  );

  return (
    <div className="pageWrapper">
      <Scroll />
      <Title data={historydata} spans={headerToggleData ? "blur" : ""}></Title>
      <div className="pageContainer">
        <Section
          className={"skills"}
          title={"Skills"}
          children={
            <SkillCardList
              data={skilldata}
              span={headerToggleData ? "blur" : "blur"}
            ></SkillCardList>
          }
        ></Section>
        <Section
          className={"works"}
          title={"Works"}
          children={
            <CardList
              data={data}
              // span={headerToggleData ? "blur" : "blur"}
            ></CardList>
          }
        ></Section>

        <DownloadButton lang={headerToggleData} />
      </div>
    </div>
  );
}
