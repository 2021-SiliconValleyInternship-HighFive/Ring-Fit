import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Link to="/guide" style={{ textDecoration: "none" }}>
      <div className="start-bg">
        <div class="title">RING FIT</div>
        <div className="titleText">touch the screen</div>
      </div>
    </Link>
  );
}

export default Home;
