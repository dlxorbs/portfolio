import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <div className="headerContainer">
      <div className="header">
        <div className="title">Portfolio</div>

        <div className="rightContainer">
          <div className="about nav">About</div>
          <div className="works nav">Works</div>
        </div>
      </div>
    </div>
  );
}
