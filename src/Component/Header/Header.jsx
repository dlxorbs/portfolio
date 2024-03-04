import React from "react";
import styles from "./Header.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import CloseIcon from "../../Img/close.png";
import MenuIcon from "../../Img/hamburger.png";
import { useEffect } from "react";
import Scroll from "../Scroll/Scroll";

function Nav(props) {
  const location = useLocation(); // 현재 위치 확인
  const isActive = location.pathname === props.to; // 현재 위치와 Nav의 경로가 일치하는지 확인

  // title을 배열로 분할하여 각 글자를 span으로 렌더링
  const titleSpans = props.title.split("").map((letter, index) => (
    <span className={styles.navspan} key={index}>
      {letter}
    </span>
  ));

  return (
    <div
      className={`${styles.nav} ${isActive ? styles.activeNav : ""}`}
      onClick={props.onClick}
    >
      {titleSpans}
    </div>
  );
}

function Header(props) {
  const nav = useNavigate();
  const location = useLocation();

  const [isNavOpen, setIsNavOpen] = useState(false);
  console.log(location);
  // Nav 클릭 시 스크롤 위치로 이동하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드러운 스크롤 적용
    });
  };

  const scrollToWork = () => {
    const scrolledTopLength = window.pageYOffset;
    const work = document.querySelector(".works");
    const workTop = scrolledTopLength + work.getBoundingClientRect().top;
    console.log(workTop);
    window.scrollTo({
      top: workTop - 200,
      behavior: "smooth", // 부드러운 스크롤 적용
    });
  };

  const scrollToskill = () => {
    const scrolledTopLength = window.pageYOffset;
    const skill = document.querySelector(".skills");
    const skillTop = scrolledTopLength + skill.getBoundingClientRect().top;

    window.scrollTo({
      top: skillTop - 200,
      behavior: "smooth", // 부드러운 스크롤 적용
    });
  };

  const handleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const NaviContainer = () => {
    return (
      <div
        className={`${styles.navigation} ${isNavOpen ? styles.mobileNav : ""}`}
      >
        <Nav
          title="ABOUT"
          onClick={() => {
            if (location.pathname === "/") {
              scrollToskill();
            } else {
              nav("/");
              setTimeout(() => {
                scrollToskill();
              }, 0);
            }
          }}
        />
        <Nav
          title="PROJECT"
          onClick={() => {
            if (location.pathname === "/") {
              scrollToWork();
            } else {
              nav("/");
              setTimeout(() => {
                scrollToWork();
              }, 0);
            }
          }}
        />
      </div>
    );
  };
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.navWrapper}>
          <div
            className={styles.logo}
            onClick={() => {
              nav("/");
              scrollToTop(); // 로고 클릭 시 스크롤 초기화
            }}
          >
            TAE GYUN's Portfolio
          </div>
          <NaviContainer />
          <div className={styles.menuIcon} onClick={handleClick}>
            {isNavOpen ? <img src={CloseIcon} /> : <img src={MenuIcon} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
