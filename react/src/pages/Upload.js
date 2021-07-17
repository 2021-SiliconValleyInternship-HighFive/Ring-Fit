import React from "react";
import { Link } from "react-router-dom";

function Upload() {
  return (
    <div>
      <Link to="/measure">
        <button>select</button>
      </Link>
    </div>
  );
}

export default Upload;
