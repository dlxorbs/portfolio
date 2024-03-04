import React, { useState, useEffect } from "react";
import "./Modal.css";

export default function Modal(props) {
  const [modalheight, setModalHeight] = useState(0);
  const [heights, setHeights] = useState(false);
  const [close, setClose] = useState(false);
  useEffect(() => {
    // 모달이 열렸을 때 body의 스크롤을 막음
    document.body.style.overflow = "hidden";

    const modalImage = document.querySelector(".modalImg");
    if (modalImage.complete) {
      // 이미지가 로드되었는지 확인
      setModalHeight(modalImage.offsetHeight);
    } else {
      modalImage.onload = () => {
        setModalHeight(modalImage.offsetHeight);
      };
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [props.imgsrc]);

  useEffect(() => {
    if (window.innerWidth <= 800) {
      setClose(true);
    } else {
      setClose(false);
    }
  }, [window.innerWidth]);

  useEffect(() => {
    if (modalheight > window.innerHeight) {
      setHeights(true);
    } else {
      setHeights(false);
    }
  }, [modalheight]);

  return (
    <div className="ModalBackground">
      <div
        className="Modal_Wrapper"
        style={{ "--position": `${heights ? "absolute" : ""}` }}
      >
        <div className="contentWrapper">
          <img className="modalImg" src={props.imgsrc} alt="" />
        </div>
      </div>
      <div className="Modalfull" onClick={props.onClick}></div>
      {close ? (
        <div className="closebtn" onClick={props.onClick}>
          {" "}
          X{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
