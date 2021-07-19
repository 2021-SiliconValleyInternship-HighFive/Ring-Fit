import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';


function Home() {
    
    return(
        [
            
            'Info',
            
        ].map((variant, idx) => (
            <Card
            bg={variant.toLowerCase()}
            key={idx}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: '100vw' ,height: '800px' }}
            className="mb-2"
            >
            
            <Card.Body>
                <Card.Title
                style={{fontSize: '3rem', marginTop: '15rem',textAlign:'center',fontFamily: 'cookie'}}>💍Ring-Fit💍</Card.Title>
                <Card.Text>
                <Link to ='/guide'><Button variant="outline-info"
                style={{ color: 'white', borderColor: 'rgb(13, 202, 240)',borderTopWidth: '298px',paddingRight: '100px',paddingLeft: '100px',borderLeftWidth: '38px',borderRightWidth: '34px',borderBottomWidth: '137px',fontFamily: 'cookie',textAlign:'center'}}>시작하기🖐️</Button>{' '}</Link>
                </Card.Text>
            </Card.Body>
            </Card>
        ))
        );
}


export default Home;



