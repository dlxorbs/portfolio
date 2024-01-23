import React, { useState, useEffect } from "react";
import "./title.css";

export default function Title(props) {
  const [positionX, setpositionX] = useState(0);
  useEffect(() => {
    const handleScroll = (e) => {
      // 현재 스크롤 위치 확인
      const scrollY = window.scrollY;

      if (scrollY > 300) {
        setpositionX(300);
      } else {
        setpositionX(scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="titleContainer">
      <h1
        id="toptitle"
        style={{
          opacity: `${positionX / 300}`,
          // transform: `translate(calc(100 + ${positionX}%), 50vh)`,
        }}
      >
        Frontend Developer
      </h1>
      <h1
        id="bottitle"
        style={{
          opacity: `${positionX / 300}`,
          // transform: `translate(calc(-100% + ${positionX}%), 50vh)`,
        }}
      >
        TAE GYUN LEE
      </h1>
    </div>
  );
}
