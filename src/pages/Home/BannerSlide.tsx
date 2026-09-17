import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../assets/images/slide-1.jpg";
import slide2 from "../../assets/images/slide-2.jpg";
import slide3 from "../../assets/images/slide-4.jpg";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const BannerSlide = () => {
  const slides = [
    {
      image: slide1,
      tag: "Seasonal Mega Deals",
      title: "Elevate Your Lifestyle With Exclusive Finds",
      subtitle: "Discover curated premium collections at unbeatable prices.",
      link: "/products",
    },
    {
      image: slide2,
      tag: "Trending Tech & Gadgets",
      title: "Smart Living Starts With Next-Gen Tech",
      subtitle: "Shop top-tier electronics backed by genuine manufacturer warranty.",
      link: "/products",
    },
    {
      image: slide3,
      tag: "Fresh Arrivals",
      title: "Unmatched Quality Delivered to Your Door",
      subtitle: "Experience lightning-fast shipping & guaranteed authentic products.",
      link: "/products",
    },
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 4500,
    dots: true,
    fade: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="px-3 md:px-14 2xl:px-60 mt-4 md:mt-6">
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-gray-900">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="relative outline-none">
              <div className="relative h-[220px] sm:h-[320px] md:h-[400px] lg:h-[460px] w-full overflow-hidden">
                <img
                  src={slide.image}
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-1000"
                  alt={`Slide ${index + 1}`}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent flex items-center">
                  <div className="max-w-xl px-5 sm:px-10 md:px-16 text-white">
                    <span className="inline-block px-3 py-1 mb-2.5 rounded-full text-[11px] md:text-xs font-semibold tracking-wider uppercase bg-primary/90 text-white backdrop-blur-sm shadow-sm">
                      {slide.tag}
                    </span>
                    <h2 className="text-lg sm:text-2xl md:text-4xl font-extrabold leading-tight mb-2 md:mb-3 drop-shadow-sm line-clamp-2">
                      {slide.title}
                    </h2>
                    <p className="hidden sm:block text-xs md:text-sm text-gray-200 mb-4 line-clamp-2 max-w-md">
                      {slide.subtitle}
                    </p>
                    <Link
                      to={slide.link}
                      className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-primary hover:text-white px-4 py-2 md:px-6 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 group"
                    >
                      <span>Explore Collection</span>
                      <HiArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BannerSlide;

