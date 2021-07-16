import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return(
        <div>
            <h1>home(테스트용)</h1>
            <Link to ='/guide'>start</Link>
        </div>
    );
}

export default Home;