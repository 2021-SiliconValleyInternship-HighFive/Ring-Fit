import React, { useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Draggable from "react-draggable";
import Button from "react-bootstrap/Button";
import "../css/Measure.css";

function Measure() {
  const history = useHistory();
  const location = useLocation();
  const image = location.state.image;
  const imgUrl = URL.createObjectURL(image);
  const size = String(window.innerWidth * 0.9) + "px";
  const [coord, setCoord] = useState({
    x: 0,
    y: 0,
  });

  /* get coord of image */
  const onDrag = (e) => {
    const bcr = document.getElementById("image").getBoundingClientRect();
    const x = parseInt(e.targetTouches[0].pageX - bcr.x);
    const y = parseInt(e.targetTouches[0].pageY - bcr.y);
    setCoord({ x: x, y: y });
  };

  const handlePost = async () => {
    const url = "http://localhost:8000/api/data";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const data = new FormData();
    data.append("x", coord.x);
    data.append("y", coord.y);
    data.append("file", image);
    for (var pair of data.entries()) {
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
    width: size,
    height: size,
    position: "relative",
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: "cover",
    display: "block", //display 가운데 정렬
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
        <Draggable bounds="parent" onDrag={onDrag}>
          <box className="drag"></box>
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
