import React, { Component } from "react";
import Slider from "react-slick";
import { Button } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class LazyLoad extends Component {
render() {
    const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2
    };
    return (
    <div> 
    <Button 
    variant="info"
    style={{fontFamily: 'cookie',textAlign:'center',
    color: 'white', fontWeight: '900',padding: '1.375rem 7.75rem',backgroundColor:  'rgb(13, 202, 240)',
    borderColor:  'rgb(13, 202, 240)'}} >RING-FIT 사용법💍</Button>{' '}
        <Slider {...settings}>
        <div>
        <img src = "https://placeimg.com/300/300/1"
            width='375'
            height='500'
            style={{paddingRight: '50px',paddingLeft: '50px', paddingTop: '100px', paddingBottom: '100px',borderTopWidth: '0px'}}/>
            <h3 style={{fontFamily: 'cookie',textAlign:'center',color:'rgb(13, 202, 240)'}}>동전과 손을 준비하세요!</h3>
            
        </div>
        <div>
        <img src = "https://placeimg.com/300/300/2"
            width='375' 
            height='500'
            style={{paddingRight: '50px',paddingLeft: '50px', paddingTop: '100px', paddingBottom: '100px',borderTopWidth: '0px'}}/>
            <h3 style={{fontFamily: 'cookie',textAlign:'center',color:'rgb(13, 202, 240)'}}>동전을 왼쪽에, 손을 오른쪽에 두고 사진을 찍어주세요.</h3>
        </div>
        <div>
        <img src = "https://placeimg.com/300/300/3"
            width='375' 
            height='500'
            style={{paddingRight: '50px',paddingLeft: '50px', paddingTop: '100px', paddingBottom: '100px',borderTopWidth: '0px'}}/>
            <h3 style={{fontFamily: 'cookie',textAlign:'center',color:'rgb(13, 202, 240)'}}>길이 측정을 원하는 부위에 빨간 선을 놓으세요!</h3>
        </div>
        <div>
        <img src = "https://placeimg.com/300/300/4"
            width='375' 
            height='500'
            style={{paddingRight: '50px',paddingLeft: '50px', paddingTop: '100px', paddingBottom: '100px',borderTopWidth: '0px'}}/>
            <h3 style={{fontFamily: 'cookie',textAlign:'center',color:'rgb(13, 202, 240)'}}>측정 완료!</h3>
        </div>
        </Slider>
    </div>
    );
}
}
