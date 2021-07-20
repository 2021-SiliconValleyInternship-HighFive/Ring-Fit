import React, { Component } from "react";
import Slider from "react-slick";
import { Button } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CrossImg from '../images/Cross.PNG';

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
    <div
    style={{
    textAlign:'center',
    fontFamily:'ariblk',
    marginTop: '45px',
    width: '100vw',
    fontSize: '20px'}} >
    RINGFIT GUIDE</div>

        <Slider {...settings}>
        <div>
        <img src={CrossImg}
            style={{display: 'block',
            margin: '0px auto',
            paddingTop: '50px' ,
            paddingBottom: '15px',
            width: '300px',
            height: '470px'}}/>
            <h style={{fontFamily:'ariblk',
        fontSize: "21.3px",
        paddingLeft: '50px'}}>1&nbsp;.</h>
        <br></br>
        <div style={{textAlign:'center',paddingBottom: '33px'}}>
            <h style={{fontFamily: 'OpenSans-Regular',
            textAlign:'center',
            width: '100vw',
            fontSize: "14px",
            }}>
                "Take a picture with your finger clearly<br></br>visible on a black background. And put a<br></br>coin on the left. Finally, select and upload a<br></br>photo that meets these criteria."</h>
                </div>
        </div>
        <div>
        <img src={CrossImg}
            style={{display: 'block',
            margin: '0px auto',
            paddingTop: '50px' ,
            paddingBottom: '15px',
            width: '300px',
            height: '470px'}}/>
            <h style={{fontFamily:'ariblk',
        fontSize: "21.3px",
        paddingLeft: '50px'}}>2&nbsp;.</h>
        <br></br>
        <div style={{textAlign:'center',paddingBottom: '33px'}}>
            <h style={{fontFamily: 'OpenSans-Regular',
            textAlign:'center',
            width: '100vw',
            fontSize: "14px",
            }}>
                "Take a picture with your finger clearly<br></br>visible on a black background. And put a<br></br>coin on the left. Finally, select and upload a<br></br>photo that meets these criteria."</h>
                </div>
        </div>
        <div>
        <img src={CrossImg}
            style={{display: 'block',
            margin: '0px auto',
            paddingTop: '50px' ,
            paddingBottom: '15px',
            width: '300px',
            height: '470px'}}/>
            <h style={{fontFamily:'ariblk',
        fontSize: "21.3px",
        paddingLeft: '50px'}}>3&nbsp;.</h>
        <br></br>
        <div style={{textAlign:'center',paddingBottom: '33px'}}>
            <h style={{fontFamily: 'OpenSans-Regular',
            textAlign:'center',
            width: '100vw',
            fontSize: "14px",
            }}>
                "Take a picture with your finger clearly<br></br>visible on a black background. And put a<br></br>coin on the left. Finally, select and upload a<br></br>photo that meets these criteria."</h>
                </div>
        </div>
        <div>
        <img src={CrossImg}
            style={{display: 'block',
            margin: '0px auto',
            paddingTop: '50px' ,
            paddingBottom: '15px',
            width: '300px',
            height: '470px'}}/>
            <h style={{fontFamily:'ariblk',
        fontSize: "21.3px",
        paddingLeft: '50px'}}>4&nbsp;.</h>
        <br></br>
        <div style={{textAlign:'center',paddingBottom: '33px'}}>
            <h style={{fontFamily: 'OpenSans-Regular',
            textAlign:'center',
            width: '100vw',
            fontSize: "14px",
            }}>
                "Take a picture with your finger clearly<br></br>visible on a black background. And put a<br></br>coin on the left. Finally, select and upload a<br></br>photo that meets these criteria."</h>
                </div>
        </div>
        </Slider>
    </div>
    );
}
}
