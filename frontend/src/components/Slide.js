import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import guideImg1 from "../images/guide1.jpg";
import guideImg2 from "../images/guide2.jpg";
import guideImg3 from "../images/guide3.jpg";
import guideImg4 from "../images/guide4.jpg";

export default class LazyLoad extends Component {
  render() {
    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img className="guideImg" src={guideImg1} />
            <div className="guideNum">1&nbsp;.</div>
            <div style={{ textAlign: "center", paddingBottom: "1em" }}>
              <div className="guideText">
                prepare a coin and clean background.<br></br>The coin must be
                100 won.
              </div>
            </div>
          </div>
          <div>
            <img className="guideImg" src={guideImg2} />
            <div className="guideNum">2&nbsp;.</div>
            <div style={{ textAlign: "center", paddingBottom: "1em" }}>
              <div className="guideText">
                Put a coin on the left side of your<br></br>finger and upload a
                picture.
              </div>
            </div>
          </div>
          <div>
            <img className="guideImg" src={guideImg3} />
            <div className="guideNum">3&nbsp;.</div>
            <div style={{ textAlign: "center", paddingBottom: "1em" }}>
              <div className="guideText">
                Move the <span style={{ color: "red" }}>red line</span>{" "}
                <br></br>to the desired ring position.
              </div>
            </div>
          </div>
          <div>
            <img className="guideImg" src={guideImg4} />
            <div className="guideNum">4&nbsp;.</div>
            <div style={{ textAlign: "center", paddingBottom: "1em" }}>
              <div className="guideText">
                Then RINGFIT will tell your ring FIT size.
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
