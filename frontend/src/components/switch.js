import React from 'react';
import '../css/switch.css';
import '../css/bar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faHome,faUser,faShoppingCart,faBookOpen,faCamera} from "@fortawesome/free-solid-svg-icons";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import { BrowserRouter as Router, Link,Route } from "react-router-dom";


const Switchs = ({ isOn, handleToggle }) => {
  return (
    <>
    <input
      checked={isOn}
      onChange={handleToggle}
      className="react-switch-checkbox"
      id={`react-switch-new`}
      type="checkbox"
    />
   <label
  style={{ background: isOn && '#81d8d0' }}
  className="react-switch-label"
  htmlFor={`react-switch-new`}
>
      <span className={`react-switch-button`} />
    </label>


<nav class="menu" style={{ display: (isOn ? 'block' : 'none') }}>
   <input type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open" />
   <label class="menu-open-button" for="menu-open"> <FontAwesomeIcon icon={faCircle}  /></label>
   <Router>
   <Link to="/" class="menu-item blue"> <FontAwesomeIcon icon={faHome}  /> </Link>
   <Link to="/user"  class="menu-item green"> <FontAwesomeIcon icon={faUser}  /> </Link>
   <Link to="/user"  class="menu-item red"> <FontAwesomeIcon icon={faShoppingCart}  /></Link>
   <Link to="/guide" class="menu-item purple">  <FontAwesomeIcon icon={faBookOpen}  /></Link>
   <Link to="/upload" class="menu-item orange"> <FontAwesomeIcon icon={faCamera}  /></Link>
   <Link to="/result" class="menu-item lightblue"> <FontAwesomeIcon icon={faSearch} /> </Link> </Router>
   
</nav>
  </>
  );
};

export default Switchs;