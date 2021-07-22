import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import tempPreview from "../images/uploadPreview.PNG";
import Button from "react-bootstrap/Button";

function Upload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(tempPreview);
  const history = useHistory();

  /* 이미지 크기 확인용 임시 스타일 */
  const imgStyle = {
    width: "80%",
    height: "80%",
    marginBottom: "60px",
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
        "file" // 저장 형식
      );
    });

  const onChange = async (event) => {
    try {
      const file = event.target.files[0];
      const img = await resizeFile(file); // resize image
      setImage(img); // update image
      setPreview(URL.createObjectURL(img));
    } catch (err) {
      console.log(err);
    }
  };

  const onClick = () => {
    if (image === null) return alert("no image");
    else {
      history.push({ pathname: "/measure", state: { image: image } });
    }
  };

  return (
    <div>
      <div className="header">UPLOAD</div>

      <input
        type="file"
        accept="image/*"
        id="upload-image"
        onChange={(e) => onChange(e)}
        style={{ display: "none" }}
      />

      <label
        style={{ textAlign: "center", width: "100vw", marginTop: "40px" }}
        htmlFor="upload-image"
      >
        <img className="uploadImage" src={preview} style={imgStyle} />
      </label>

      <div style={{ textAlign: "center", paddingBottom: "33px" }}>
        <div className="guideText">
          Take a picture with your finger clearly<br></br>visible on a
          background. And put a<br></br>coin on the left. Finally, select and
          upload a<br></br>photo that meets these criteria.
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          className="selectBtn"
          onClick={onClick}
          variant="outline-secondary"
          style={{
            borderRadius: "50%",
            borderWidth: "3px",
            borderColor: "black",
            color: "black",
            fontFamily: "ariblk",
            paddingRight: "20px",
            paddingLeft: "20px",
          }}
        >
          select
        </Button>
      </div>
    </div>
  );
}

export default Upload;
