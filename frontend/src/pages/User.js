import React, { useState, useEffect} from 'react';

function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const store = getObjectStore(DB_STORE_NAME, "readonly");
        let req = store.openCursor();
        req.onsuccess= (e) => {
            let cursor = e.target.result;
            if(cursor){
                console.log(cursor.value);
                cursor.continue();
            }
        }
        req.onerror = (err) => {
            console.error(err);
        }

    },[])
    return(
        <div>
            testing...
            
            {/*users.map((user) => {
                return(
                  <div key={user.id}>id: {user.id}</div>  
                );
            })*/}
        </div>
    );
};

export default User;