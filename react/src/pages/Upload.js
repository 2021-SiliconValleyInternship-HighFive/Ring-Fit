import React, { useState } from "react";
import { Link } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import tempPreview from "../images/tempPreview.png";

function Upload() {
  const [image, setImage] = useState(tempPreview);

  /* 이미지 크기 확인용 임시 스타일 */
  const imgStyle = {
    width: "80%",
    height: "80%",
    marginLeft: "36px"
  };

  /* resize image func: 513 * 513 크기로 base64형식 이미지 리턴 */
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
        },
        "base64" // 저장 형식
      );
    });

  const onChange = async (event) => {
    try {
      const file = event.target.files[0];
      const base64Img = await resizeFile(file); // resize image
      setImage(base64Img); // update image preview
      console.log(image); // test용
      console.log(image instanceof File); // teset용
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
        <img className="uploadImage" src={image} style={imgStyle} />
      </label>

      <br></br>

      {/*route link*/}
      <Link
        to={{
          pathname: "/measure",
          state: {
            imgUrl: image /* Measure.js에 이미지 전달 */,
          },
        }}
      >
        <button>select</button>
      </Link>
    </div>
  );
}

export default Upload;
