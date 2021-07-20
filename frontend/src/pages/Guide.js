import React from 'react';
import { Link } from 'react-router-dom';
import Slide from "../components/Slide";
import Button from 'react-bootstrap/Button';

function Guide() {
    return(
        <div>
            <Slide/>
            <p></p>
            <p></p>
            <Link to="/upload" >
        <div style={{ textAlign:'center',
        }}>
        <div style={{ textAlign:'right',
        paddingBottom: '50px'
        }} >
        <Button  
        style={{borderRadius: '20px',
        backgroundColor:'white', 
        borderColor:'white' }}>
            <h style={{color: 'black',
        fontFamily: 'ariblk',
        fontSize: '14.0pt',
        fontStyle: 'normal',
        fontWeight: '400'}}> 
        <h style={{ 
        paddingBottom: '50px'}} ></h> start→</h></Button>{' '}
        </div>
        </div>
    </Link>
        </div>
    );
}

export default Guide;
