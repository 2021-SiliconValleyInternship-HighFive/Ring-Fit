import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import "../css/user.css";
import { Link } from "react-router-dom";

function User() {
  const [users, setUsers] = useState([]);
  // const products = new Set();

  //  /* API function -- get product data */
  // const fetchProduct = async (round) => {
  //   try {
  //     const url = "http://localhost:8000/api/"+String(round); // url 수정 필요
  //     const product = await axios.get(url);
  //     products.add(product);
  //   } catch (e) {
  //     console.log("API ERROR: ", e);
  //   }
  // };
  
  /* userdata 삭제 */
  const onRemove = (id) => {
    const store = getObjectStore(DB_STORE_NAME, "readwrite");
    let req = store.delete(id); // indexedDB에서 삭제
    req.onsuccess = (e) => {
      setUsers(users.filter((user) => user.id !== id)); // 배열에서 삭제
    };
    req.onerror = (err) => {
      console.log("DATABASE ERROR: ", err);
    };
  };



  useEffect(() => {
    /* indexedDB에서 user data 불러오기 */
    const store = getObjectStore(DB_STORE_NAME, "readonly");
    let req = store.getAll();
    req.onsuccess = (e) => {
      setUsers(e.target.result);
    };
    req.onerror = (err) => {
      console.log("DATABASE ERROR: ", err);
    };
    // console.log("testing...");
    // products.add({round:10, test: "testing!"});
    // users.map((user)=>{
    //     if(!products.has(round === user.round)) {
    //         products.add({round:user.round, test: "testing!"}); // 테스팅 코드
    //         console.log(products); // 테스팅 코드
    //         /* API 호출 */
    //         // fetchProduct(user.round);
    //     }
    // })
  }, []);

  return (
    <div>
      <div className="headerUser">user </div>{" "}
      <Link to="/upload" style={{ textDecoration: "none" }} className="plus">
        +
      </Link>
      {users.map((user) => {
        return (
          <div className="wrapper" key={user.id}>
            <div className="user-maching">
              <Table responsive>
                <thead>
                  <tr>
                    {/* <th>id</th> */}
                    <th>LorR</th>
                    <th>finger</th>
                    <th>position</th>
                    <th>round</th>
                    <th>size</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* <td>key={user.id}</td> */}
                    <td>{user.LorR}</td>
                    <td>{user.finger}</td>
                    <td>{user.position}</td>
                    <td>{user.round}mm</td>
                    <td>{user.size}</td>
                  </tr>
                </tbody>
              </Table>
              <Button
                variant="light"
                style={{ marginBottom: "10px" }}
                onClick={() => {
                  onRemove(user.id);
                }}
              >
                DELETE
              </Button>

              {/* <p key={user.id}>{user.LorR} {user.finger} {user.position} round: {user.round}mm size: {user.size}</p>
    <button onClick={() => {onRemove(user.id)}}>DELETE</button> */}
            </div>
            <div className="user-maching">
            <div class="grid">
        <a href="https://www.catchfashion.com/view/1bca4097-252a-4511-a3c9-377b1976cc74"><div class="grid_item first" ></div></a>
        <div class="grid_item two"></div>
        <div class="grid_item third"></div>
        <div class="grid_item thir"></div>
</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default User;
