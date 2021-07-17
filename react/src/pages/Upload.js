import React from "react";
import { Link } from "react-router-dom";

function Upload() {

  return (
    <div>
       <input
        type="file"
        accept="image/*"
        id="upload-file"
      />

      {/*route link*/}
      <Link to="/measure">
        <button>select</button>
      </Link>
    </div>
  );
}

export default Upload;
