import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Loading from "../components/Loading";
import "../components/result.css";
import PropTypes from 'prop-types';
import NamePicker from '../NamePicker';

function Result() {
  const [user, setUser] = useState({ round: 0, size: 0 });
  const [loading, setLoading] = useState(false);
  const [modalOn, setModalOn] = useState(false);

  const onSubmit = () => {
    const store = getObjectStore(DB_STORE_NAME, "readwrite");
    let req;
    const obj = {
      ringround: user.round,
      ringsize: user.size,
    };

    try {
      req = store.add(obj);
    } catch (e) {}

    req.onsuccess = function () {
      console.log("입력 되었습니다.");
    };
    req.onerror = function (err) {
      console.error(err);
    };
  };

  const onModalOn = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const url = "http://localhost:8000/api/result";
        const response = await axios.get(url);
        setUser({
          round: response.data.cirumference,
          size: response.data.size,
        });
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <div className="result">
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

        <div class="center">
          <span>
            round&nbsp;&nbsp;{user.round}
            <p></p>
            size&nbsp;&nbsp;{user.size}
          </span>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={onModalOn}
          style={{
            borderRadius: "10px",
            borderColor: "Black",
            backgroundColor: "Black",
            fontFamily: "ariblk",
            fontSize: "13px",
          }}
        >
          SAVE
        </Button>{" "}
      </div>

      {/* Modal */}
      <div className={modalOn ? "openModal modal" : "modal"}>
        {modalOn ? (
          <div>
            <button className="close" onClick={onModalOn}>
              X
            </button>
            <NamePicker />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Result;
