import React from "react";
import { Link } from "react-router-dom";

function Measure() {
  return (
    <div>
      <footer>
        <Link to="/upload">취소</Link>
        <Link to="/result">확인</Link>
      </footer>
    </div>
  );
}

export default Measure;
