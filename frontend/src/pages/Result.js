import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Result() {
  const [user, setUser] = useState({round: 0, size: 0});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async() => {
      try {
        setLoading(true);
        const url = "http://localhost:5000/api/result";
        const response =  await axios.get(url);
        setUser({round: response.data.cirumference, size: response.data.size});
      }catch(e) {
        console.log(e);
      };
      setLoading(false);
    }
    fetchUser();
  },[]);

  if (loading) return <div>loading...</div>;
  return (
    <div>
      <div>
        <div>round {user.round}</div>
        <div>size {user.size}</div>
      </div>
      <Link to="/">home(temp)</Link>
    </div>
  );
}

export default Result;
