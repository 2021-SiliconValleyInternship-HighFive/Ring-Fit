import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="start-bg">
    <div className="title" >RING FIT</div>

    <Link to="/guide" style={{ textDecoration: "none" }}>
      
        <div className="titleText">start</div>
      
    </Link>


    <Link to="/user" style={{ textDecoration: "none" }}>

        <div className="titleText1" >user</div>

    </Link>
    
  
    </div>
    
  );
}

export default Home;
