import React, { useContext, useEffect, useState, useRef } from "react";
import "./Page.css";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase.js";
import $ from "jquery";
import Left from "../Component/Section/Left";
import Main from "../Component/Section/Main";
import Right from "../Component/Section/Right";
import Center from "../Component/Section/Center";
import MainImg from "../Component/Section/MainImage.jsx";
import Modal from "../Component/Modal/ModalPage.jsx";
import Loading from "../Component/Load/Loading.jsx";
import { AppContext } from "../Context/AppContext";

export default function DetailPage() {
  const nav = useNavigate();
  const postId = useParams().id;
  const textarea = useRef();

  const { headerToggleData } = useContext(AppContext);

  const handleResizeHeight = () => {
    textarea.current.style.height = "auto"; //height 초기화
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };
  const [dummy, setDummy] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [data, setData] = useState("");
  // 이미지 적용시 파일들
  const [mainthumb, setMainthumb] = useState("");

  const [backthumb, setbackthumb] = useState("");
  const [researchthumb, setResearchthumb] = useState("");
  const [goalthumb, setGoalthumb] = useState("");
  const [functionthumb, setFunctionthumb] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedACard, setSelectedACard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (card, index) => {
    setModalOpen(true);
    setSelectedCard(card);
    console.log(index);
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setModalPosition({ top: scrollTop + 100, left: 0 });
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
    document.body.style.overflow = ""; // 스크롤 허용
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const [maintext, setMaintext] = useState("");
  const [onelinetext, setOnelinetext] = useState("");
  const [backtext, setBacktext] = useState("");
  const [restext, setRestext] = useState("");
  const [goaltext, setGoaltext] = useState("");
  const [link, setLink] = useState("");
  // const [func01text, setFunc01text] = useState("");
  // const [func02text, setFunc02text] = useState("");
  // const [func03text, setFunc03text] = useState("");

  const [video, setVideo] = useState("");

  //포스트의 데이터를 생성될때 받아옴
  useEffect(() => {
    let Datas = {};
    if (headerToggleData) {
      db.collection("post")
        .doc(postId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            Datas = doc.data();

            // 썸네잉ㄹ
            setMainthumb(Datas.main?.img || "symbol1920");
            setbackthumb(Datas.background?.img || "symbol");
            setResearchthumb(Datas.research?.img || "symbol");
            setGoalthumb(Datas.goals?.img || "symbol1200");

            setFunctionthumb(Datas?.func || "symbol");

            // 텍스트
            setMaintext(Datas.main?.works || "");
            setOnelinetext(Datas.main?.oneline || "");
            setBacktext(Datas.background?.content || "");
            setRestext(Datas.research?.content || "");
            setGoaltext(Datas.goals?.content || "");

            setData(Datas?.data);
            setVideo(Datas.video || "");
            setLink(Datas.weblink || "");
            setIsLoading(true);
          }
          setDummy(Datas);
        });
    } else {
      db.collection("postKR")
        .doc(postId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            Datas = doc.data();

            // 썸네잉ㄹ
            setMainthumb(Datas.main?.img || "symbol1920");
            setbackthumb(Datas.background?.img || "symbol");
            setResearchthumb(Datas.research?.img || "symbol");
            setGoalthumb(Datas.goals?.img || "symbol1200");

            setFunctionthumb(Datas?.func || "symbol");

            // 텍스트
            setMaintext(Datas.main?.works || "");
            setOnelinetext(Datas.main?.oneline || "");
            setBacktext(Datas.background?.content || "");
            setRestext(Datas.research?.content || "");
            setGoaltext(Datas.goals?.content || "");

            setData(Datas?.data);
            setVideo(Datas.video || "");
            setLink(Datas.weblink || "");
            setIsLoading(true);
          }
          setDummy(Datas);
        });
    }
  }, [headerToggleData]);

  return (
    <div className={`${"pageWrapper"}`}>
      <div className=" detail pageContainer">
        {/* <MainImg
          data={data}
          src={mainthumb}
          main={maintext}
          oneline={onelinetext}
        ></MainImg> */}
        <Main
          toggle={headerToggleData ? "blur" : "unblur"}
          width={550}
          head={"Overview"}
          text={backtext}
          src={backthumb}
          link={link}
        />
        <Right
          width={550}
          head={"Solution"}
          text={restext}
          src={researchthumb}
        />
        <Left
          width={550}
          onClick={() => openModal({ detailimg: goalthumb })} // 모달을 열기 위해 openModal 함수를 호출
          head={"Architecture"}
          text={goaltext}
          src={goalthumb}
        />
        <Center
          openModal={openModal}
          width={550}
          head={"Details"}
          data={functionthumb}
          link={link}
        />

        {selectedCard && isLoading && (
          <Modal
            onClick={closeModal}
            imgsrc={selectedCard.detailimg}
            // onImageLoad={handleImageLoad}
          />
        )}

        {!isLoading && <Loading />}
      </div>
    </div>
  );
}
