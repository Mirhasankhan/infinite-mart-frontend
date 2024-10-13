import WhyUs from "../Home/WhyUs";
import achievent from "../../assets/images/achivement.png";
import { useEffect } from "react";
import john from "../../assets/images/john.png";
import bob from "../../assets/images/bob.png";
import { FaQuoteLeft } from "react-icons/fa";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="px-3 md:px-14 mt-12">
        <h1 className="text-xl font-bold pb-4">OUR STORY</h1>
        <p>
          At Infinite Mart, our journey began with a simple idea: to create a
          seamless online shopping experience for everyone. Founded in 2010 by a
          group of passionate entrepreneurs, we set out to revolutionize the
          e-commerce industry with a focus on customer satisfaction, quality
          products, and innovative technology.
        </p>
        <p className="mt-3">
          From our humble beginnings in a small garage, we have grown into a
          leading e-commerce platform, serving millions of customers around the
          country. Our commitment to excellence has driven us to continuously
          improve and expand our offerings, ensuring that we provide the best
          products and services to our valued customers.
        </p>
        <h1 className="text-xl font-bold pt-6">Why Choose Us</h1>
        <WhyUs></WhyUs>
        <h1 className="text-xl font-bold pt-6 text-center">Happy Clients</h1>

        <div
          style={{ clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0 75%)" }}
          className="grid grid-cols-2 gap-6 my-6 p-24 bg-gray-100"
        >
          <div>
            <div className="flex gap-3 items-center">
              <img src={john} alt="" />
              <h1 className="font-semibold">John Smith</h1>
            </div>
            <div className="flex gap-3 mt-3">
              <FaQuoteLeft className="text-blue-400 text-4xl"></FaQuoteLeft>
              <p>
                Shopping at Infinite Mart has been a fantastic experience. The
                website is easy to navigate, the product selection is amazing,
                and my orders always arrive on time. Their customer service team
                is incredibly helpful and responsive.
              </p>
            </div>
          </div>
          <div>
            <div className="flex gap-3 items-center">
              <img src={bob} alt="" />
              <h1 className="font-semibold">Bob Smith</h1>
            </div>
            <div className="flex gap-3 mt-3">
              <FaQuoteLeft className="text-blue-400 text-4xl"></FaQuoteLeft>
              <p>
                I've been a loyal customer of Infinite Mart. for years, and they
                never disappoint. The quality of their products is top-notch,
                and their prices are unbeatable. I recently had an issue with a
                product, and their support team resolved it quickly and
                professionally
              </p>
            </div>
          </div>
        </div>
      </div>
      <img className="w-full" src={achievent} alt="" />
    </div>
  );
};

export default About;
