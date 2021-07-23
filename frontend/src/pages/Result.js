import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import NamePicker from "../components/NamePicker";
import "../css/result.css";
import { Button } from "react-bootstrap";


function Result() {
  const history = useHistory();

   //배열에 usestat를 통해 얻은 컴포넌트에서 값을 넣는다.
  const [user, setUser] = useState({
    //초기값
    round: 0,
    size: 0,
    LorR: "LEFT",
    finger: "Middle",
    position: "FIRST",
  });
  const [loading, setLoading] = useState(false);
  const [modalOn, setModalOn] = useState(false);


  //onsubmit이 event가 발생하면 데이터를 저장하게 동작시킨다. 
  const onSubmit = () => {
    const store = getObjectStore(DB_STORE_NAME, "readwrite");
    let req;
    const obj = user;

    //위의 데이터 저장처리에서 indexeddb가 비동기이기 때문에 trycatch로 동작확인.
    try {
      req = store.add(obj);
    } catch (e) {}

    req.onsuccess = function () {
      console.log("입력 되었습니다.");
    };

    req.onerror = function (err) {
      console.error(err);
    };
    // user 페이지 이동
    history.push("/user")
  };

  const onModalOn = () => {
    setModalOn(!modalOn);
  };

  const onChangeUser = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const url = "http://localhost:8000/api/result";
        const response = await axios.get(url);
        setUser({
          round: response.data.circumference,
          size: response.data.size,
        });
      } catch (e) {
        console.log("API Err: ", e);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const btnStyle = {
    borderRadius: "10px",
    borderColor: "Black",
    backgroundColor: "Black",
    fontFamily: "ariblk",
    fontSize: "13px",
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="result">
        <h2>{user.LorR} {user.finger} {user.position}</h2> {/* 테스트용 */}
        <div
          style={{
            fontFamily: "ariblk",
            width: "100vw",
            textAlign: "center",
            marginTop: "35px",
            fontSize: "20px",
          }}
        >
          RING SIZE
        </div>

        <div className="center">
          <span>
            round&nbsp;&nbsp;{user.round}
            <p></p>
            size&nbsp;&nbsp;{user.size}
          </span>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button className="saveBtn"
          onClick={onModalOn}
          style={btnStyle}
        >
          SAVE
        </Button>
      </div>



      {/* Modal */}
      <div className={modalOn ? "openModal modal" : "modal"}>
        {modalOn ? (
          <div>
            <button className="close" onClick={onModalOn}>
              X
            </button>
            
            <NamePicker onChangeUser={onChangeUser} />
            <Button className="saveBtn"
            onClick={onSubmit} style={btnStyle}>OK</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Result;
