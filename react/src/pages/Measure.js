import React from "react";
import { Link, useLocation } from "react-router-dom";

function Measure() {
  const location = useLocation();
  const imgUrl = location.state.imgUrl;

  /* 이미지 크기 확인용 임시 스타일 */
  const imgStyle = {
    width: "90%",
    height: "90%",
  };

  return (
    <div>
      <img src={imgUrl} style={imgStyle} />

      <footer>
        <Link to="/upload">취소</Link>
        <Link to="/result">확인</Link>
      </footer>
    </div>
  );
}

export default Measure;
