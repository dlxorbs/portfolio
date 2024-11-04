import React from "react";
import "./Doenload.css";
const DownloadButton = () => {
  const handleDownload = () => {
    // PDF 파일 URL
    const pdfUrl =
      "https://firebasestorage.googleapis.com/v0/b/portfolio-f47bc.appspot.com/o/Portfolio_TaeGyun_Lee.pdf?alt=media&token=5e807f1d-74ae-4374-a08c-7c5b5ce326dc";

    window.open(pdfUrl, "_blank");
  };

  return (
    <button className="down" onClick={handleDownload}>
      See All Portfolio
    </button>
  );
};

export default DownloadButton;
