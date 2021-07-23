import axios from "axios";
import React, { useState, useRef } from "react";
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

  /* post function (api 연동) */
  const handlePost = async () => {
    const x = trans(coord.x);
    const y = trans(coord.y);
    const url = "http://localhost:8000/api/data";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const data = new FormData(); // formData 생성
    data.append("x", x);
    data.append("y", y);
    data.append("file", image);
    for (var pair of data.entries()) {
      // 확인용
      console.log(pair[0] + ", " + pair[1]);
    }
    await axios
      .post(url, data, config)
      .then((res) => {
        history.push("/result");
      })
      .catch((err) => {
        console.log(err);
        history.push("/result"); // 테스트용 - api 연동 실패해도 페이지 넘어가도록
      });
  };

  const boxStyle = {
    width: String(size) + "px",
    height: String(size) + "px",
    position: "relative",
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px auto", //display 가운데 정렬
    marginTop: "56px",
  };

  return (
    <div>
      <div className="header">RED LINE</div>

      <div id="image" style={boxStyle}>
        <Draggable
          nodeRef={nodeRef}
          bounds="parent"
          onDrag={(e, data) => onDrag(data)}
        >
          <span ref={nodeRef} className="drag"></span>
        </Draggable>
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ paddingTop: "60px" }}>
          <div className="guideText">
            Place a red line around the finger you want <br></br>to measure.
          </div>
        </div>
        <Button
          onClick={handlePost}
          style={{
            marginTop: "40px",
            backgroundColor: "black",
            borderColor: "black",
          }}
        >
          <div style={{ fontFamily: "ariblk", Color: "black" }}>OK</div>
        </Button>
      </div>
    </div>
  );
}

export default Measure;
