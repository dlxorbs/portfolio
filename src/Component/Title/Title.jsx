import React, { useState, useEffect } from "react";
import "./title.css";

function History(props) {
  return (
    <div className="historylist">
      {props.showHistory && ( // titleRight가 true일 때만 History 렌더링
        <div
          className="box"
          style={{
            "--boxwidth": `calc(100% - ${props.width}px)`,
            opacity: props.historyop,
          }}
        ></div>
      )}
      <span className="year">{props.year}</span>
      <span>| {props.detail}</span>
    </div>
  );
}

export default function Title(props) {
  const [positionX, setPositionX] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [titleRight, setTitleRight] = useState(false);
  useEffect(() => {
    const handleScroll = (e) => {
      const section = document.querySelector(`.titleContainer`);
      const rect = section.getBoundingClientRect();
      const isTitletopOutWindow = rect.top < -200;
      const isTitletextStop = rect.top < -500;
      const isTitletextRight = rect.top < -1000;
      const isTitlebottomHalfWindow = rect.bottom < window.innerHeight / 2;

      if (isTitletopOutWindow) {
        setPositionX(Math.abs(rect.top));
        setOpacity(Math.abs(rect.top));

        if (isTitletextStop) {
          setPositionX(500);
          setOpacity(500);
          if (isTitletextRight) {
            setTitleRight(isTitletextRight);
          } else {
            setTitleRight(false);
          }
        }

        if (isTitlebottomHalfWindow) {
          setOpacity(0);
        }
      } else {
        setPositionX(0);
        setOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [width, setWidth] = useState(0);
  const [historyop, setHistoryop] = useState(1);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const intervalId = setInterval(() => {
        setWidth((prevWidth) => {
          const newWidth = prevWidth + 12;
          if (newWidth <= 800) {
            setHistoryop(1); // 너비가 증가할 때 opacity를 1로 설정
            return newWidth;
          } else {
            clearInterval(intervalId);
            setHistoryop(0); // 너비가 최대치에 도달하면 opacity를 0으로 설정
            return prevWidth;
          }
        });
      }, 100);

      return () => clearInterval(intervalId);
    });

    return () => clearTimeout(timerId);
  }, []);

  const historylist = props.data.map((item, index) => {
    return (
      <History
        key={item.id}
        year={item.year}
        detail={item.detail}
        showHistory={titleRight} // titleRight가 true일 때만 History 컴포넌트 렌더링
        width={width}
        historyop={historyop}
      />
    );
  });

  return (
    <div className="titleContainer">
      <div className="titleWrapper">
        <div className="nameWrapper">
          <h1
            id="toptitle"
            style={{
              opacity: `${opacity / 300}`,
              right: titleRight
                ? "calc(50% + 12px)"
                : ` calc( ${positionX / 10}%)`,
              transform: titleRight
                ? "translateY(-50%)"
                : "translate(50%, -50%)",
            }}
          >
            Frontend Developer
          </h1>
          <h1
            id="bottitle"
            style={{
              opacity: `${opacity / 300}`,
              right: titleRight
                ? "calc(50% + 12px)"
                : ` calc(100% - ${positionX / 10}%)`,
              transform: titleRight
                ? "translateY(-50%)"
                : "translate(50%, -50%)",
            }}
          >
            TAE GYUN LEE
          </h1>
        </div>
        <div className="historyWrapper">{historylist}</div>
      </div>
    </div>
  );
}
