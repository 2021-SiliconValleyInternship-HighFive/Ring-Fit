import React, { Component } from "react";
import Slider from "react-slick";
import { Button } from "react-bootstrap";
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
        <div
          style={{
            textAlign: "center",
            fontFamily: "ariblk",
            marginTop: "45px",
            width: "100vw",
            fontSize: "20px",
          }}
        >
          RINGFIT GUIDE
        </div>

        <Slider {...settings}>
          <div>
            <img
              src={guideImg1}
              style={{
                display: "block",
                margin: "0px auto",
                paddingTop: "50px",
                paddingBottom: "15px",
                width: "300px",
                height: "470px",
              }}
            />
            <div
              style={{
                fontFamily: "ariblk",
                fontSize: "21.3px",
                paddingLeft: "50px",
              }}
            >
              1&nbsp;.
            </div>
            <br></br>
            <div style={{ textAlign: "center", paddingBottom: "33px" }}>
              <div
                style={{
                  fontFamily: "OpenSans-Regular",
                  textAlign: "center",
                  width: "100vw",
                  fontSize: "14px",
                }}
              >
                prepare a coin and clean background.<br></br>The coin must be
                100 won.
              </div>
            </div>
          </div>
          <div>
            <img
              src={guideImg2}
              style={{
                display: "block",
                margin: "0px auto",
                paddingTop: "50px",
                paddingBottom: "15px",
                width: "300px",
                height: "470px",
              }}
            />
            <div
              style={{
                fontFamily: "ariblk",
                fontSize: "21.3px",
                paddingLeft: "50px",
              }}
            >
              2&nbsp;.
            </div>
            <br></br>
            <div style={{ textAlign: "center", paddingBottom: "33px" }}>
              <div
                style={{
                  fontFamily: "OpenSans-Regular",
                  textAlign: "center",
                  width: "100vw",
                  fontSize: "14px",
                }}
              >
                Put a coin on the left side of your<br></br>finger and upload a
                picture.
              </div>
            </div>
          </div>
          <div>
            <img
              src={guideImg3}
              style={{
                display: "block",
                margin: "0px auto",
                paddingTop: "50px",
                paddingBottom: "15px",
                width: "300px",
                height: "470px",
              }}
            />
            <div
              style={{
                fontFamily: "ariblk",
                fontSize: "21.3px",
                paddingLeft: "50px",
              }}
            >
              3&nbsp;.
            </div>
            <br></br>
            <div style={{ textAlign: "center", paddingBottom: "33px" }}>
              <div
                style={{
                  fontFamily: "OpenSans-Regular",
                  textAlign: "center",
                  width: "100vw",
                  fontSize: "14px",
                }}
              >
                Move the <span style={{color:"red"}}>red line</span> <br></br>to the desired ring position.
              </div>
            </div>
          </div>
          <div>
            <img
              src={guideImg4}
              style={{
                display: "block",
                margin: "0px auto",
                paddingTop: "50px",
                paddingBottom: "15px",
                width: "300px",
                height: "470px",
              }}
            />
            <div
              style={{
                fontFamily: "ariblk",
                fontSize: "21.3px",
                paddingLeft: "50px",
              }}
            >
              4&nbsp;.
            </div>
            <br></br>
            <div style={{ textAlign: "center", paddingBottom: "33px" }}>
              <div
                style={{
                  fontFamily: "OpenSans-Regular",
                  textAlign: "center",
                  width: "100vw",
                  fontSize: "14px",
                }}
              >
               Then RINGFIT will tell your ring FIT size.
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
