import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Draggable from "react-draggable";

function Measure() {
  const location = useLocation();
  const imgUrl = location.state.imgUrl;
  const size = String(window.innerWidth * 0.9) + "px";
  const [coord, setCoord] = useState({
    x: 0,
    y: 0,
  }); /* coordinate of finger Image */
  const [position, setPosition] = useState({
    left: "50%",
    top: "50%",
  }); /* position of drag */

  /* get coord of image & set drag position */
  const touchHandler = (e) => {
    const bcr = document.getElementById("image").getBoundingClientRect();
    const x = e.targetTouches[0].pageX - bcr.x;
    const y = e.targetTouches[0].pageY - bcr.y;
    setCoord({ x: x, y: y });
    setPosition({
      left: e.targetTouches[0].pageX - 25,
      top: e.targetTouches[0].pageY - 10,
    });
  };

  /* 이미지 크기 확인용 임시 스타일 */
  const boxStyle = {
    width: size,
    height: size,
    position: "relative",
    backgroundImage: `url(${imgUrl})`  
  };

  const imgStyle = {
    width: size,
    height: size
  };

  const dragStyle = {
    position: "absolute",
    top: position.top,
    left: position.left,
  };

  return (
    <div>
      {console.log({ size })}
      {/* 좌표 확인 test용*/}
      <h2>
        coord x: {coord.x} y: {coord.y}
      </h2>
      <div style={boxStyle}>
      <Draggable bounds="parent" style={{position:"absolute"}}>
          <img src="https://placeimg.com/10/10/any" />
        </Draggable>
        
      </div>

      <img id="image" src={imgUrl} style={imgStyle} />

      <div>
        <div style={imgStyle}></div>
      </div>

      <div>
        {/* drag object (임시 이미지, 임시 크기) */}
        <img
          src="https://placeimg.com/50/20/any"
          style={dragStyle}
          onTouchStart={touchHandler}
          onTouchMove={touchHandler}
        />
      </div>
      <footer>
        <Link to="/upload">취소</Link>
        <Link to="/result">확인</Link>
      </footer>
    </div>
  );
}

export default Measure;
