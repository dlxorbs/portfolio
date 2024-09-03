import React, { useEffect, useState } from "react";

import "./Section.css";
export default function Right(props) {
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
        `.RightContainer.${props.className}`
      );
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isSectionBottomVisible = rect.bottom <= 100;

      const isSectionTopVisible =
        rect.top <= (window.innerHeight * 3) / 4 && rect.top > -200;
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
        if (isSectionTopVisible || !isSectionBottomVisible) {
          setOpacity(1);
          setIsVisible(true);
        }
        if (isSectionBottomVisible || !isSectionTopVisible) {
          setIsVisible(false);
          setOpacity(0);
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

  return (
    <div
      className={`RightContainer ${props.className}`}
      style={{
        opacity: opacity,
        transform: opacity ? "translateY(0px)" : "translateY(24px)",
      }}
    >
      <div className="imgContainer">
        <img className={`image ${props.img}`} src={props.src} alt="" />
      </div>
      <div className={`textWrapper ${props.type}`}>
        <h4
          style={{
            "--width": props.width + "px",
          }}
        >
          {props.head || "dlxorbs"}
        </h4>
        <p>{props.text}</p>
      </div>
    </div>
  );
}
