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
            console.log("getAllError: ",err);
        }
    },[])
    return(
        <div>            
            {users.map((user) => {
                return(
                  <div key={user.id}>num: {user.id} round: {user.ringround} size: {user.ringsize}</div>  
                );
            })}
        </div>
    );
};

export default User;