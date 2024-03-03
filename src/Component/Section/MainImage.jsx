import React, { useState, useEffect } from "react";
import "./Section.css";

export default function MainImg(props) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="mainImage"
      style={{
        "--img": `url(${props.src})`,
        backgroundPositionY: -offset * 0.5,
      }}
    >
      <div className="imagecon">
        <div className="black"></div>
        {/* <img className="smimg" src={props.src} alt="" /> */}
      </div>
    </div>
  );
}
