import React from 'react';
import { Link } from 'react-router-dom';
import '../css/homeImg.css';


function Home() {

return(
    <Link to ='/guide' style={{textDecoration: 'none'}} >
        <div className="start-bg"
        style={{ backgroundColor:'skyblue' ,height:'100vh' ,cursor: 'pointer'}} 
    >

        <h1  class="center" style={{color:'white',
        textAlign:'center',
        fontSize: '2.4rem',
        fontFamily:'ariblk',
        paddingTop: '318px',
        marginTop: '0px',
        marginBottom: '0px',
        }}>RING FIT</h1>

<div style={{ textAlign:'center',marginTop: '314px'}}>
<h style={{
textAlign:'center',
fontFamily:'ariblk',
color:'white',
}}>touch the screen</h>
</div>
</div>
</Link>
)

}

export default Home;


