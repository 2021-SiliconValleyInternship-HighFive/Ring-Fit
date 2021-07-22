import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import Loading from '../components/Loading';
import '../components/result.css'

function Result() {
  const [user, setUser] = useState({round: 10, size: 10});
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    const store = getObjectStore(DB_STORE_NAME, 'readwrite');
    let req;
    const obj = {
      ringround: user.round,
      ringsize: user.size
    };

    try {
      req = store.add(obj);
    } catch (e) { }

    req.onsuccess = function () {
      console.log("입력 되었습니다.");
    };
    req.onerror = function (err) {
      console.error(err);
    };
  }

  useEffect(() => {
    const fetchUser = async() => {
      try {
        setLoading(true);
        const url = "http://localhost:8000/api/result";
        const response =  await axios.get(url);
        setUser({round: response.data.cirumference, size: response.data.size});
      }catch(e) {
        console.log(e);
      };
      setLoading(false);
    }
    fetchUser();
  },[]);

  if (loading) return <Loading />;
  return (
    <div>
      <div className="result">

      <div style={{ fontFamily: 'ariblk',
      width: '100vw' ,
      textAlign:'center',
      marginTop: '35px',
      fontSize: '20px'}}>
        RING SIZE</div>
      
        <div class="center" >
        <span>
        round&nbsp;&nbsp;{user.round} 
        <p></p>
        size&nbsp;&nbsp;{user.size}
        </span>
        </div>
  
      </div>
<div style={{ textAlign:'center',}}>
        <Button onClick={onSubmit}
      style={{borderRadius: '10px', 
      borderColor:'Black',
      backgroundColor:'Black',
      fontFamily: 'ariblk',
      fontSize: '13px'}}>
      SAVE</Button>{' '}
      </div>
    </div>
  );
}

export default Result;


// 아래 해당 주석은 Result 페이지의 css 입히기 전 코드입니다.

// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function Result() {
//   const [user, setUser] = useState({round: 0, size: 0});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUser = async() => {
//       try {
//         setLoading(true);
//         const url = "http://localhost:5000/api/result";
//         const response =  await axios.get(url);
//         setUser({round: response.data.cirumference, size: response.data.size});
//       }catch(e) {
//         console.log(e);
//       };
//       setLoading(false);
//     }
//     fetchUser();
//   },[]);

//   if (loading) return <div>loading...</div>;
//   return (
//     <div>
//       <div>
//         <div>round {user.round}</div>
//         <div>size {user.size}</div>
//       </div>
//       <Link to="/">home(temp)</Link>
//     </div>
//   );
// }

// export default Result;




