import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import news from '../images/news.png'
import news5 from '../images/news5.jpg'
import news2 from '../images/news2.png'
import news3 from '../images/news3.png'
import news6 from '../images/news6.jpg'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      slidesToShow: 1,
      fade: true,
      // slidesToScroll: 2,
    };
    return (
      <Slider {...settings} style={ styles.sliderDiv }>
        <div style={{}}>
          <img src='https://socialegg.s3.ap-south-1.amazonaws.com/news5.jpg' alt='Image could not be loaded' style={{ height: '800px', width: '100%', opacity: 0.3 }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <center><img src="https://socialegg.s3.ap-south-1.amazonaws.com/SocialEgg_Mark2.png" style={{height: 137, width: 100,paddingLeft: 10,}}></img><br /> <p style={{fontSize:85,display:'inline'}}>Social EGG</p><br />Information, Simplified.</center>
                        <p style={{ textAlign: 'center', color: 'white' }}>
                        <ArrowDownwardIcon style={{ color: 'white', fontSize: 30 }} />
                        </p>
          </div>
        </div>
        <div style={{}}>
          <img src='https://socialegg.s3.ap-south-1.amazonaws.com/news6.jpg' alt='Image could not be loaded' style={{ height: '800px', width: '100%', opacity: 0.3 }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                       <center> Stay in touch with your favourite topics, with the news sources you trust<br /><br />
                        Get periodic/real-time notifications comprising all the news articles mentioning the topics you care about<br/><br /></center>
                        <p style={{ textAlign: 'center', color: 'white' }}>
                        <ArrowDownwardIcon style={{ color: 'white', fontSize: 30 }} />
                        </p>
          </div>
        </div>
        
      </Slider>
    );
  }
}

const styles = {
    sliderDiv: {
        // height: '100vh',
        // objectFit: 'cover',
        position: 'relative',
        textAlign: 'justify'
    }
}

export default SimpleSlider;