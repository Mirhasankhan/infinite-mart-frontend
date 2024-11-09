import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../assets/images/slide-1.jpg";
import slide2 from "../../assets/images/slide-2.jpg";
import slide3 from "../../assets/images/slide-4.jpg";

const BannerSlide = () => {
  const settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="px-2 md:px-14 overflow-hidden">
      <div className="slider-container mt-4">
        <Slider {...settings}>
          <div>
            <img
              src={slide1}
              className="w-full h-auto object-cover"
              alt="Slide 1"
            />
          </div>
          <div>
            <img
              src={slide2}
              className="w-full h-auto object-cover"
              alt="Slide 2"
            />
          </div>
          <div>
            <img
              src={slide3}
              className="w-full h-auto object-cover"
              alt="Slide 3"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default BannerSlide;
