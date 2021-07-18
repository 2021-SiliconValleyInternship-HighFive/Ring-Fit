import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Measure() {
  const location = useLocation();
  const imgUrl = location.state.imgUrl;

  const [coord, setCoord] = useState({ x: 0, y: 0 });

  /* 이미지 좌표 추출 */
  const touchHandler = (e) => {
    const bcr = e.getBoundingClientRect();
    const x = e.targetTouches[0].pageX - bcr.x;
    const y = e.targetTouches[0].pageY - bcr.y;
    console.log(e.targetTouches[0].pageX, "bcr: ", bcr.x);
    setCoord({ x: x, y: y });
  };

  /* offsetX,Y  확인용 테스트 함수 */
  const onClick = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    console.log("offsetX: ", x, " offsetY: ", y);
  };

  /* 이미지 크기 확인용 임시 스타일 */
  const imgStyle = {
    width: "90%",
    height: "90%",
  };


  return (
    <div>
      {/* 좌표 확인 test용*/}
      <h1>
        coord x: {coord.x} y: {coord.y}
      </h1>{" "}

      <img
        id="image"
        src={imgUrl}
        style={imgStyle}
        onClick={onClick}
        onTouchStart={touchHandler}
        onTouchMove={touchHandler}
      />
      
      <footer>
        <Link to="/upload">취소</Link>
        <Link to="/result">확인</Link>
      </footer>
    </div>
  );
}

export default Measure;
