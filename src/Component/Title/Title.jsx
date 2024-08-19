import React, { useState, useEffect } from "react";
import "./title.css";

function History(props) {
  return (
    <>
      {
        // titleRight가 true일 때만 History 렌더링
        <div className="historylist">
          <div
            className="box"
            style={{
              "--boxwidth": `calc(100% - ${props.width}px + 12px)`,
              opacity: props.historyop,
            }}
          ></div>

          <span className="year">{props.year}</span>
          <span className={`details ${props.spans || "unblur"}`}>
            {props.detail}
          </span>
        </div>
      }
    </>
  );
}

export default function Title(props) {
  const [positionX, setPositionX] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [titleRight, setTitleRight] = useState(false);
  const [width, setWidth] = useState(0);
  const [historyop, setHistoryop] = useState(1);
  const [historyWrapperOpacity, setHistoryWrapperOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(`.titleContainer`);
      const historysection = document.querySelector(`.historyWrapper`);

      const rect = section.getBoundingClientRect();
      const historyrect = historysection.getBoundingClientRect();

      const isHistorymidHalfWindow =
        historyrect.top < window.innerHeight / 2 &&
        historyrect.bottom > window.innerHeight / 2;

      const isTitletopOutWindow = rect.top < -200;
      const isTitletextStop = rect.top < -500;
      const isTitletextRight = rect.top < -1000;

      const isTitletextStopmobile = rect.top < -500;
      const isTitletextRightmobile = rect.top < -800;

      const isTitlebottomHalfWindow = rect.bottom < window.innerHeight / 2;

      if (isTitletopOutWindow) {
        setPositionX(Math.abs(rect.top));
        setOpacity(Math.abs(rect.top));

        if (isTitletextStop) {
          setPositionX(500);
          setOpacity(500);

          if (window.innerWidth <= 800) {
            if (isTitletextRightmobile) {
              setOpacity(0);
              setHistoryWrapperOpacity(1);
            } else {
              setTitleRight(false);
              setHistoryWrapperOpacity(0);
            }
          } else {
            if (isTitletextRight) {
              setTitleRight(isTitletextRight);
              setHistoryWrapperOpacity(1);
            } else {
              setTitleRight(false);
              setHistoryWrapperOpacity(0);
            }
          }
        }

        if (isTitlebottomHalfWindow) {
          setOpacity(0);
          setHistoryWrapperOpacity(0);
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

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setWidth(0);
      setHistoryop(0);
    } else {
      const historylistElements = document.querySelectorAll(".historylist");

      const historysection = document.querySelector(`.historyWrapper`);
      const historyrect = historysection.getBoundingClientRect();
      const isHistorymidHalfWindow =
        historyrect.top < window.innerHeight / 2 &&
        historyrect.bottom > window.innerHeight / 2;

      const timerId = setTimeout(() => {
        const intervalId = setInterval(() => {
          if (isHistorymidHalfWindow) {
            setWidth((prevWidth) => {
              const newWidth = prevWidth + 12;
              if (newWidth <= 600) {
                setHistoryop(1); // 너비가 증가할 때 opacity를 1로 설정
                return newWidth;
              } else {
                clearInterval(intervalId);
                setHistoryop(0); // 너비가 최대치에 도달하면 opacity를 0으로 설정
                return prevWidth;
              }
            });
          } else {
          }
        }, 100);

        return () => clearInterval(intervalId);
      });

      return () => clearTimeout(timerId);
    }
  }, [titleRight]);

  const historylist = props.data.map((item, index) => {
    return (
      <History
        key={item.id}
        year={item.year}
        detail={item.detail}
        width={width}
        historyop={historyop}
        spans={props.spans}
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
        <div
          className="historyWrapper"
          style={{ opacity: historyWrapperOpacity }}
        >
          {historylist}
        </div>
      </div>
    </div>
  );
}
