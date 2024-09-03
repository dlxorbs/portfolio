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

  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [onload, setOnload] = useState(true);
  useEffect(() => {
    setOnload(true);
  });
  useEffect(() => {
    setOpacity(0);
  }, [onload]);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(
        `.CenterContainer.${props.className}`
      );
      if (!section) return;

      const rect = section.getBoundingClientRect();

      const isSectionBottomVisible = rect.bottom <= window.innerHeight / 2;
      const isSectionTopVisible =
        rect.top <= window.innerHeight && rect.top > window.innerHeight / 2;

      const isSectionInWindow =
        rect.top <= (window.innerHeight * 3) / 4 && rect.bottom >= 0;

      const isSectionOutWindowUpside =
        rect.top < 0 &&
        rect.bottom + window.innerHeight / 2 < window.innerHeight;

      const isSectionOutWindowDownside =
        rect.bottom > window.innerHeight + 100 &&
        rect.top + window.innerHeight / 2 > window.innerHeight;

      console.log(isSectionOutWindowDownside);

      // 화면 너비가 800보다 작을때
      if (window.innerWidth <= 800) {
        if (isSectionTopVisible) {
          setOpacity(1);
          setIsVisible(true);
          if (isSectionBottomVisible) {
            setIsVisible(false);
            setOpacity(0);
          }
        }
      } else {
        // 그 이외일때
        if (isSectionInWindow && !isSectionOutWindowDownside) {
          setOpacity(1);
          setIsVisible(true);
        } else if (isSectionOutWindowDownside && isVisible) {
          setIsVisible(false);
          setOpacity(0);
        }
      }
    };

    console.log(opacity);

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible]);
  const link1open = () => {
    const url = props.link;
    window.open(url, "_blank");
  };

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
    <div
      className={`CenterContainer ${props.className}`}
      style={{
        opacity: opacity,
        transform: opacity ? "translateY(0px)" : "translateY(24px)",
        transition: "500ms",
      }}
    >
      <div className="textWrapper center">
        <h4>{props.head || "Function"}</h4>

        <span
          onClick={link1open}
          style={{ display: `${props.weblink === "" ? "none" : ""}` }}
        >
          {props.link === "" ? "" : "Visit Site"}
        </span>
      </div>
      <div className="imgWrapper">{list}</div>
    </div>
  );
}
