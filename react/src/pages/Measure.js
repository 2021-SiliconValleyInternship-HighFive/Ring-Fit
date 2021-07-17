import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Measure() {
  const location = useLocation();
  const imgUrl = location.state.imgUrl;

  const [coord, setCoord] = useState({ x: 0, y: 0 });

  /* 이미지 좌표 추출 */
  const onClick = (e) => {
    setCoord({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  /* 이미지 크기 확인용 임시 스타일 */
  const imgStyle = {
    width: "90%",
    height: "90%",
  };

  return (
    <div>
      <h1>x: {coord.x} y: {coord.y}</h1> {/* (좌표 확인용) temp*/}

      <img src={imgUrl} onClick={onClick} style={imgStyle} />

      <footer>
        <Link to="/upload">취소</Link>
        <Link to="/result">확인</Link>
      </footer>
    </div>
  );
}

export default Measure;
