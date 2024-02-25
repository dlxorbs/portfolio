import React, { useEffect, useState } from "react";
import "./Scroll.css";
export default function Scroll(props) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = (e) => {
      // 섹션이 화면에 보이는지 확인

      const section = document.querySelector(`#section5`);
      const rect = section.getBoundingClientRect();

      const isSectionInWindow =
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2;

      const isSectionhalfWindow = rect.bottom < window.innerHeight / 2;

      if (isSectionInWindow && !isVisible) {
        section.style.opacity = 1;
        setIsVisible(true);
      } else if (isSectionhalfWindow && isVisible) {
        section.style.opacity = 0;
        setIsVisible(false);
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible]);

  return (
    <div id="section5">
      <div class="container">
        <div class="scroll">
          <span></span>
        </div>

        <div class="scroll">
          <span></span>
        </div>

        <div class="scroll">
          <span></span>
        </div>
      </div>
    </div>
  );
}
