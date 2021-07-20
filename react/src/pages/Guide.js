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
            <Link to ='/upload'>
        <Button variant="light" size="lg"
        style={{fontFamily: 'cookie',
        width:'100vw',
        textAlign:'center',
        marginTop :'40px',
        paddingLeft: '109px',
        paddingRight: '108px',
        borderRightWidth: '2px'}}>
    사진 업로드 하기
</Button></Link>
        </div>
    );
}

export default Guide;
