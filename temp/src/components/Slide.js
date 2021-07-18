import React, { Component } from "react";
import Slider from "react-slick";
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
        <h2> slide test </h2>
        <Slider {...settings}>
        <div>
        <img src="https://placeimg.com/300/300/1"/>
            <h3>test1</h3>
        </div>
        <div>
        <img src ="https://placeimg.com/300/300/1"/>
            <h3>test2</h3>
        </div>
        <div>
        <img src ="https://placeimg.com/300/300/1"/>
            <h3>test3</h3>
        </div>
        <div>
        <img src ="https://placeimg.com/300/300/1"/>
            <h3>test4</h3>
        </div>
        </Slider>
    </div>
    );
}
}
