import React, { useState, useEffect } from "react";
import "./Section.css";

const Img = function (props) {
  return (
    <div className="imgcon">
      <div className="over" onClick={props.onClick}>
        <span>{props.text}</span>
        <span>Show More</span>
      </div>
      <img src={props.src} alt="" />
    </div>
  );
};

export default function Center(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null);

  const list = props.data.map(function (item, index) {
    const handleCardClick = (item, index) => {
      props.openModal(item, index);
    };

    return (
      <Img
        src={item.img}
        text={item.text}
        onClick={() => {
          handleCardClick(item, index);
        }}
      />
    );
  });

  return (
    <div className="CenterContainer">
      <div className="textWrapper center">
        <h4>{props.head || "Function"}</h4>
      </div>
      <div className="imgWrapper">{list}</div>
    </div>
  );
}
