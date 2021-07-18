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
<Button variant="primary" size="lg"
style={{textAlign:'center',marginTop :'40px',backgroundColor:'rgb(13, 202, 240)',paddingLeft: '109px',paddingRight: '108px',borderRightWidth: '2px'}}>
    사진 업로드 하기
</Button></Link>
        </div>
    );
}

export default Guide;
