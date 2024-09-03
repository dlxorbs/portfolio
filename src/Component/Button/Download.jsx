import React from "react";
import "./Doenload.css";
const DownloadButton = (props) => {
  const handleDownload = (lang) => {
    // PDF 파일 URL
    let pdfUrl;
    console.log(props.lang);
    if (props.lang) {
      pdfUrl =
        "https://firebasestorage.googleapis.com/v0/b/portfolio-f47bc.appspot.com/o/Portfolio_Taegyun_EN.pdf?alt=media&token=36b08d6c-f4ce-4901-9760-7a931e297562";
    } else {
      pdfUrl =
        "https://firebasestorage.googleapis.com/v0/b/portfolio-f47bc.appspot.com/o/Portfolio_Taegyun_KR.pdf?alt=media&token=baeec26d-cec0-4c1f-998a-1175065edfb5";
    }

    // console.log(pdfUrl);
    window.open(pdfUrl, "_blank");
  };

  return (
    <button className="down" onClick={handleDownload}>
      See All Portfolio
    </button>
  );
};

export default DownloadButton;
