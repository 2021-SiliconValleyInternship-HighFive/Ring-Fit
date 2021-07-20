import React, { useState, useRef } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Draggable from "react-draggable";
import Button from "react-bootstrap/Button";
import "../css/Measure.css";

function Measure() {
  const history = useHistory();
  const nodeRef = useRef(null);
  const location = useLocation();
  const image = location.state.image;
  const imgUrl = URL.createObjectURL(image);
  const size = window.innerWidth * 0.8;
  const [coord, setCoord] = useState({
    x: 0,
    y: 0,
  });

  /* get coord of image */
  const onDrag = (data) => {
    const x = size * 0.5 + data.lastX;
    const y = size * 0.5 + data.lastY;
    setCoord({ x: x, y: y });
  };

  /* 513 * 513 이미지 기준 좌표 계산 */
  let trans = (a) => parseInt((513 * a) / window.innerWidth);

  const handlePost = async () => {
    const x = trans(coord.x);
    const y = trans(coord.y);
    console.log("x: ", x, "y: ", y); // 확인용
    const url = "http://localhost:8000/api/data";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const data = new FormData();
    data.append("x", x);
    data.append("y", y);
    data.append("file", image);
    for (var pair of data.entries()) { // 확인용
      console.log(pair[0] + ", " + pair[1]);
    }
    await axios
      .post(url, data, config)
      .then((res) => {
        history.push("/result");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const boxStyle = {
    marginTop: "50px",
    width: String(size) + "px",
    height: String(size) + "px",
    position: "relative",
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px auto", //display 가운데 정렬
  };

  return (
    <div>
      {/* 좌표 확인 test용*/}
      <div
        className="header"
        style={{ fontFamily: "cookie", textAlign: "center", marginTop: "50px" }}
      >
        MOVE REDLINE
      </div>
      <h2>
        coord x: {coord.x} y: {coord.y}
      </h2>
      <div id="image" style={boxStyle}>
        <Draggable nodeRef={ nodeRef } bounds="parent" onDrag={(e, data) => onDrag(data)} >
          <span ref={nodeRef} className="drag"></span>
        </Draggable>
      </div>

      <div style={{ textAlign: "center" }}>
        <Button
          onClick={handlePost}
          variant="outline-secondary"
          style={{ marginTop: "50px" }}
        >
          OK
        </Button>
      </div>
    </div>
  );
}

export default Measure;
