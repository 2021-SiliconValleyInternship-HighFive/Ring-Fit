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
    initialSlide: 0
    };
    return (
    <div> 
    <Button 
    variant="light"
    style={{fontFamily: 'cookie',
    textAlign:'center',
    fontWeight: '900',
    width:'100vw',
    padding: '1.375rem 7.75rem',}} >
    RING-FIT GUIDE</Button>{' '}

        <Slider {...settings}>
        <div>
        <img src = "https://placeimg.com/300/300/1"
            style={{display: 'block',
            margin: '0px auto',
            paddingTop: '50px' ,
            paddingBottom: '50px'}}/>
            <h3 style={{fontFamily: 'cookie',
            textAlign:'center',}}>
                1. 동전과 손을 준비하세요!</h3>
        </div>
        <div>
        <img src = "https://placeimg.com/300/300/2"
            style={{display: 'block', 
            margin: '0px auto',
            paddingTop: '50px' ,
            paddingBottom: '50px'}}/>
            <h3 style={{fontFamily: 'cookie',
            textAlign:'center',}}>
                2. 동전을 왼쪽에, 손을 오른쪽에 두고 사진을 찍어주세요.</h3>
        </div>
        <div>
        <img src = "https://placeimg.com/300/300/3"
            style={{display: 'block',
            margin: '0px auto',
            paddingTop: '50px' ,
            paddingBottom: '50px'}}/>
            <h3 style={{fontFamily: 'cookie',
            textAlign:'center',}}>
                3. 길이 측정을 원하는 부위에 빨간 선을 놓으세요!</h3>
        </div>
        <div>
        <img src = "https://placeimg.com/300/300/4"
            style={{display: 'block',
            margin: '0px auto',
            paddingTop: '50px' ,
            paddingBottom: '50px'}}/>
            <h3 style={{fontFamily: 'cookie',
            textAlign:'center',}}>
                4. 측정 완료!</h3>
        </div>
        </Slider>
    </div>
    );
}
}
