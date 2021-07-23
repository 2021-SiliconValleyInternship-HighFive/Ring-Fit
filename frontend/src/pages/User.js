import React, { useState, useEffect} from 'react';

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
            {users.map((user) => {
                return(
                    <div>
                  <p key={user.id}>{user.LorR} {user.finger} {user.position} round: {user.round}mm size: {user.size}</p>
                  <button onClick={() => {onRemove(user.id)}}>DELETE</button>
                  </div>
                );
            })}
        </div>
    );
};


export default User;