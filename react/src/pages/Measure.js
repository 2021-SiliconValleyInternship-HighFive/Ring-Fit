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
  });

  /* get coord of image */
  const onDrag = (e) => {
    const bcr = document.getElementById("image").getBoundingClientRect();
    const x = e.targetTouches[0].pageX - bcr.x;
    const y = e.targetTouches[0].pageY - bcr.y;
    setCoord({ x: x, y: y });
  };

  const boxStyle = {
    width: size,
    height: size,
    position: "relative",
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: "cover"
  };

  return (
    <div>
      {/* 좌표 확인 test용*/}
      <h2>
        coord x: {coord.x} y: {coord.y}
      </h2>
      <div id="image" style={boxStyle}>
        <Draggable
          bounds="parent"
          style={{ position: "absolute" }}
          onDrag={onDrag}
        >
          <img src="https://placeimg.com/10/10/any" /> 
        </Draggable>
      </div>

      <footer>
        <Link to="/upload">취소</Link>
        <Link to="/result">확인</Link>
      </footer>
    </div>
  );
}

export default Measure;
