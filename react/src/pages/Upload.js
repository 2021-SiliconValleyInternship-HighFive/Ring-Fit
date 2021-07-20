import React, { useState } from "react";
import { Link } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import tempPreview from "../images/tempPreview.png";
import Button from 'react-bootstrap/Button';

function Upload() {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState(tempPreview);
  
  /* 이미지 크기 확인용 임시 스타일 */
  const imgStyle = {
    width: "80%",
    height: "80%",
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

  return (
    <div>
      <h1 style={{ fontFamily: 'cookie',
      width: '100vw' ,
      textAlign:'center',
      marginTop: '30px'}}>
        UPLOAD</h1>

      <input
        type="file"
        accept="image/*"
        id="upload-image"
        onChange={(e) => onChange(e)}
        style={{ display: "none" }}
      />

      <label style={{textAlign:'center',
      width: '100vw',
      marginTop: '75px'}} htmlFor="upload-image">
      <img className="uploadImage" src={preview} style={imgStyle} />
      </label>

      <h3 style={{ fontFamily: 'cookie',
      width: '100vw' ,
      textAlign:'center', 
      marginTop: '80px'}}>
        이미지를 클릭하여 업로드 하세요!</h3>
      <br></br>

      {/*route link*/}
      <Link
        to={{
          pathname: "/measure",
          state: {
            image: image /* Measure.js에 이미지 전달 */,
          },
        }}
      >
        <Button variant="outline-secondary"
        style={{ textAlign:'center',
        margin:'auto',
        display:'block' ,
        borderRadius: '20px' ,
        borderColor:'black',
        color:"black"}}
          >SELECT</Button>
      </Link>
    </div>
  );
}

export default Upload;
