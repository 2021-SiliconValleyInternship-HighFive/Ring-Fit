import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Measure() {
  const location = useLocation();
  const imgUrl = location.state.imgUrl;

  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ left: 100, top: 100 });

  /* 이미지 좌표 추출 */
  const touchHandler = (e) => {
    const bcr = document.getElementById("image").getBoundingClientRect();
    const x = e.targetTouches[0].pageX - bcr.x;
    const y = e.targetTouches[0].pageY - bcr.y;
    console.log(e.targetTouches[0].pageX,  "bcr: ", bcr.x);
    setCoord({ x: x, y: y });
    if(y>0) {
      console.log("y>0");
    }
    setPosition({
      left: e.targetTouches[0].pageX - 25,
      top: e.targetTouches[0].pageY - 10,
    });
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
    cursor: "pointer",
  };

  const dragStyle = {
    position: "absolute",
    top: position.top,
    left: position.left,
  };

  return (
    <div>
      {/* 좌표 확인 test용*/}
      <h1>
        coord x: {coord.x} y: {coord.y}
      </h1>{" "}
      <div
        onClick={onClick}
        onTouchStart={touchHandler}
        onTouchMove={touchHandler}
      >
      <img  src="https://placeimg.com/50/20/any" style={dragStyle} />
      </div>
      <img id="image" src={imgUrl} style={imgStyle} />

      <footer>
        <Link to="/upload">취소</Link>
        <Link to="/result">확인</Link>
      </footer>
    </div>
  );
}

export default Measure;
