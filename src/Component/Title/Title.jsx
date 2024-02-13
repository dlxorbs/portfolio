import React, { useState, useEffect } from "react";
import "./title.css";

export default function Title(props) {
  const [positionX, setpositionX] = useState(0);
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    const handleScroll = (e) => {
      // 현재 스크롤 위치 확인
      const scrollY = window.scrollY;
      // console.log(scrollY);
      if (scrollY > 300) {
        setpositionX(300);
        setOpacity(300);
        if (scrollY > 1400) {
          setOpacity(0);
        }
      } else {
        setpositionX(scrollY);
        setOpacity(scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="titleContainer">
      <div className="titleWrapper">
        <div className="nameWrapper">
          <h1
            id="toptitle"
            style={{
              opacity: `${opacity / 300}`,
              left: ` calc( ${positionX / 10}%)`,
            }}
          >
            Frontend Developer
          </h1>
          <h1
            id="bottitle"
            style={{
              opacity: `${opacity / 300}`,
              right: ` calc(0% + ${positionX / 9}%)`,
            }}
          >
            TAE GYUN LEE
          </h1>
        </div>

        <div className="historyWrapper">+ + +</div>
      </div>
    </div>
  );
}
