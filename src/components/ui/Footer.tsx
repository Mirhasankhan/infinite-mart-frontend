import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { MdOutlineAttachEmail } from "react-icons/md";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { Input } from "antd";
import Button from "./Button";

const Footer = () => {
  return (
    <div className="md:grid grid-cols-5 px-3 md:px-14 py-8 border-t bg-black text-white">
      <div className="col-span-2">
        <div>
          <Link to="/" className="col-span-1 flex gap-1 items-center">
            <img className="h-12 w-12 rounded-full" src={logo} alt="" />
            <h1
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="font-semibold text-xl"
            >
              InfiniteMart
            </h1>
          </Link>
        </div>
        <p className="py-5">
          At Infinite Mart, our journey began with a simple idea: to create a
          seamless online shopping experience for everyone. We set out to
          revolutionize the e-commerce industry with a focus on customer
          satisfaction, quality products, and innovative technology.
        </p>
        <div className="flex gap-2 items-center">
          <MdOutlineAttachEmail></MdOutlineAttachEmail>
          <h1 className="text-primary">infinte@gmail.com</h1>
        </div>
        <div className="flex gap-2 py-2 items-center">
          <FaPhoneAlt></FaPhoneAlt>
          <h1 className="font-medium">+880-1839033505</h1>
        </div>
        <div className="flex gap-2 items-center">
          <IoHome></IoHome>
          <h1>Purana Paltan, Dhaka-1000</h1>
        </div>
        <div className="flex gap-6 pt-2 pb-8">
          <FaFacebook></FaFacebook>
          <FaInstagram></FaInstagram>
          <FaXTwitter></FaXTwitter>
          <FaLinkedin></FaLinkedin>
        </div>
      </div>
      <div className="col-span-1">
        <h1 className="font-semibold text-xl pb-5">ABOUT</h1>
        <div className="flex flex-col">
          <Link className="hover:text-primary" to="about-us">
            About Us
          </Link>
          <Link className="hover:text-primary" to="contact-us">
            Contact Us
          </Link>
          <Link className="hover:text-primary" to="/">
            Help Center
          </Link>
          <Link className="hover:text-primary" to="/">
            FAQ
          </Link>
        </div>
      </div>
      <div className="col-span-1">
        <h1 className="font-semibold text-xl pb-5">HELP & GUIDE</h1>
        <div className="flex flex-col">
          <Link className="hover:text-primary" to="/">
            Term Of Use
          </Link>
          <Link className="hover:text-primary" to="/">
            Privacy Policy
          </Link>
          <Link className="hover:text-primary" to="/">
            Shipping & Delivery
          </Link>
          <Link className="hover:text-primary" to="/">
            Return Policy
          </Link>
        </div>
      </div>
      <div className="col-span-1">
        <h1 className="font-semibold text-xl pb-5">NEWSLETTER</h1>
        <p>
          Don’t miss out thousands of great <br /> deals & promotions.
        </p>
        <Input
          className="my-3 py-2 border-2 border-gray-300 bg-gray-100"
          placeholder="Email Address"
          variant="filled"
        />
        <Button buttonName="Subscribe"></Button>
      </div>
      <p className="text-center col-span-5 mb-8 md:mb-1">
        © 2024 InfiniteMart. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
