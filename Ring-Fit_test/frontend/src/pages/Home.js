import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';



function Home() {

return(
    <Link to ='/guide' style={{textDecoration: 'none'}} >
        <div style={{ backgroundColor:'skyblue' ,height:'100vh' ,cursor: 'pointer'}} 
    >

        <h1 style={{color:'white',
        textAlign:'center',
        fontSize: '2.4rem',
        fontFamily:'ariblk',
        paddingTop: '318px'

        }}>RING FIT</h1>

<div style={{ textAlign:'center',}}>
<Button style={{backgroundColor:'skyblue', 
borderColor:'skyblue',
fontFamily:'ariblk',
marginTop: '314px'}}>touch the screen</Button>
</div>
</div>
</Link>
)

}
<Link to ='/guide'></Link>
export default Home;


