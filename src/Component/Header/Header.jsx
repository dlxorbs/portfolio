import React from "react";
import styles from "./Header.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import CloseIcon from "../../Img/close.png";
import MenuIcon from "../../Img/hamburger.png";
import { useEffect } from "react";

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
  const [isNavOpen, setIsNavOpen] = useState(false);

  // 스크롤 초기화 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
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
          to="/About" // Nav에 경로(to) 추가
          onClick={() => {
            nav("/About");
            scrollToTop(); // Nav 클릭 시 스크롤 초기화
            window.location.reload();
          }}
        />
        <Nav
          title="PROJECT"
          to="/project" // Nav에 경로(to) 추가
          onClick={() => {
            nav("/project");
            scrollToTop(); // Nav 클릭 시 스크롤 초기화
            window.location.reload();
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
