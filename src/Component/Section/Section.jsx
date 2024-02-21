import React, { useEffect, useState } from "react";
import "./section.css";

export default function Section(props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      // 섹션이 화면에 보이는지 확인

      const section = document.querySelector(
        `.sectionContainer.${props.className}`
      );
      const rect = section.getBoundingClientRect();

      const isSectionTopVisible =
        rect.top + window.innerHeight / 2 <= window.innerHeight &&
        rect.bottom >= 0;

      const isSectionInWindow =
        rect.top + window.innerHeight / 2 >= 0 &&
        rect.top + window.innerHeight / 2 <= window.innerHeight &&
        rect.bottom >= 0;

      const isSectionOutWindowUpside =
        rect.top < 0 &&
        rect.bottom + window.innerHeight / 2 < window.innerHeight;
      const isSectionOutWindowDownside =
        rect.bottom > window.innerHeight &&
        rect.top + window.innerHeight / 2 > window.innerHeight;

      // const isSectionBottomVisible =
      //   rect.bottom < window.innerHeight / 2 && rect.top < 0;

      // console.log(isSectionBottomVisible);
      // 화면에 보이면 스타일 변경
      if (
        isSectionInWindow &&
        !isVisible &&
        !(isSectionOutWindowUpside || isSectionOutWindowDownside)
      ) {
        section.style.transform = "translateY(0px)";
        section.style.opacity = 1;
        setIsVisible(true);
      } else if (isSectionOutWindowDownside && isVisible) {
        setIsVisible(false);
        section.style.opacity = 0;
        section.style.transform = "translateY(24px)";
        
      } else if (isSectionOutWindowUpside && isVisible) {
        setIsVisible(false);
        section.style.opacity = 0;
        section.style.transform = "translateY(-24px)";
      }

      // if (isSectionBottomVisible && isVisible) {
      //   setIsVisible(false);
      //   section.style.opacity = 0;
      //   section.style.transform = "translateY(-24px)";
      // }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props.className, isVisible]);

  return (
    <div
      className={`sectionContainer ${props.className}`}
      style={{
        transition: "opacity 0.5s, transform 0.5s",
      }}
    >
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
}
