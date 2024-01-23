import React, { useEffect, useState } from "react";

export default function Section(props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 섹션이 화면에 보이는지 확인
      const section = document.querySelector(
        `.sectionContainer.${props.className}`
      );
      const rect = section.getBoundingClientRect();
      const isSectionVisible =
        rect.top + window.innerHeight / 2 <= window.innerHeight &&
        rect.bottom >= 0;

      // 화면에 보이면 스타일 변경
      if (isSectionVisible && !isVisible) {
        // section.style.transform = "translateY(-24px)";
        section.style.opacity = 1;
        setIsVisible(true);
      }
      if (!isSectionVisible && isVisible) {
        section.style.opacity = 0;
        setIsVisible(false);
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props.className, isVisible]);

  return (
    <div
      className={`sectionContainer ${props.className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s, transform 0.5s",
      }}
    >
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
}
