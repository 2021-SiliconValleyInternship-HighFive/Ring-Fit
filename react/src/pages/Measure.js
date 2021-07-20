import React, { useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Draggable from "react-draggable";

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
    const x = e.targetTouches[0].pageX - bcr.x;
    const y = e.targetTouches[0].pageY - bcr.y;
    setCoord({ x: x, y: y });
  };

  const handlePost = async () => {
    const url = "http://localhost:5000/api/data";
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
    width: size,
    height: size,
    position: "relative",
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: "cover",
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

      <button onClick={handlePost}>OK</button>
    </div>
  );
}

export default Measure;
