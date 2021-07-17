import React, { useState } from "react";
import { Link } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import tempPreview from "../images/tempPreview.png";

function Upload() {
  const [source, setSource] = useState(tempPreview); // image src

  /* 이미지 크기 확인용 임시 스타일 */
  const imgStyle = {
    width: "80%",
    height: "80%",
  };

  /*resize image 513 * 513 크기로 base64형식 이미지 리턴*/
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        513, // max width
        513, // max height
        "JPEG",
        513, // min width
        0, // min height
        (uri) => {
          resolve(uri);
          setSource(uri);
        },
        "base64" // 저장 형식
      );
    });

  const onChange = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        id="upload-file"
        onChange={(e) => onChange(e)}
        style={{ display: "none" }}
      />

      <label htmlFor="upload-file">
        <img className="uploadImage" src={source} style={imgStyle} />
      </label>

      <br></br>

      {/*route link*/}
      <Link
        to={{
          pathname: "/measure",
          state: {
            imgUrl: source, /* Measure.js에 이미지 src 전달 */
          },
        }}
      >
        <button>select</button>
      </Link>
    </div>
  );
}

export default Upload;
