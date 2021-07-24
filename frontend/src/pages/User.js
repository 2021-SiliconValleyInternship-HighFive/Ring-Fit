import React, { useState, useEffect} from 'react';
import Table from "react-bootstrap/Table"
import { Button } from "react-bootstrap";

function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        /* indexedDB에서 user data 불러오기 */
        const store = getObjectStore(DB_STORE_NAME, "readonly");
        let req = store.getAll();
        req.onsuccess=(e)=>{
            setUsers(e.target.result);
        }
        req.onerror = (err) => {
            console.log("DATABASE ERROR: ",err);
        }
    },[])

    /* userdata 삭제 */
    const onRemove = (id) => {
        const store = getObjectStore(DB_STORE_NAME, "readwrite");
        let req = store.delete(id);
        req.onsuccess=(e)=>{
            setUsers(users.filter(user => user.id !== id));
        }
        req.onerror = (err) => {
            console.log("DATABASE ERROR: ",err);
        }
    } 

    return(
        
        <div>
            <div className="headerUser"
            >user</div>            
            {users.map((user) => {
                return(
                    <div>


<Table striped bordered hover variant="dark">
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
<Button style={{marginBottom: '10px'}} variant="secondary"
onClick={() => {onRemove(user.id)}}>DELETE</Button>

    {/* <p key={user.id}>{user.LorR} {user.finger} {user.position} round: {user.round}mm size: {user.size}</p>
    <button onClick={() => {onRemove(user.id)}}>DELETE</button> */}
    </div>
    );
    })}
    </div>
    );
};


export default User;