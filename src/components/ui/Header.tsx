import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Input } from "antd";
import { CiSearch } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { IoHome } from "react-icons/io5";
import { TbCategory2 } from "react-icons/tb";
import { RiAccountBoxFill } from "react-icons/ri";
import { useState } from "react";
import { RiChatDeleteFill } from "react-icons/ri";
import ManageUser from "./ManageUser";
import SearchedProducts from "./SearchedProducts";

const Header = () => {
  const [search, setSearch] = useState(false);

  return (
    <header className="">
      <div className="hidden md:flex justify-between bg-gray-300 px-6 md:px-14 py-2">
        <div className="flex gap-6">
          <h1>Welcome to Infinite Mart</h1>
          <div className="flex items-center gap-1">
            <FaPhoneAlt className="text-green-500 text-xl"></FaPhoneAlt>
            <h1>Help Line: +92668754847</h1>
          </div>
        </div>
        <div className="flex gap-5">
          <Link to="track-order">Order Tracking</Link>
          <Link to="/user/my-wishlist">My Wishlist</Link>
          <Link to="/seller/register-seller">
            <button>Become Seller</button>
          </Link>
        </div>
      </div>
      <div className="hidden md:grid grid-cols-6 gap-6 px-6 md:px-14 mt-3">
        <Link to="/" className="col-span-1 flex items-center">
          <img className="h-12 w-12 rounded-full" src={logo} alt="" />
          <h1
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="font-semibold text-xl"
          >
            InfiniteMart
          </h1>
        </Link>
        <div className="flex col-span-3 relative">
          <div className="w-full h-full">
            {/* <Input
              className="w-full h-full"
              placeholder="Search for..."
              variant="filled"
            /> */}
            <SearchedProducts></SearchedProducts>
          </div>
          <div
            onClick={() => console.log("hello")}
            className="absolute right-3 top-3 border-l-2 pl-2 cursor-pointer"
          >
            <CiSearch className="text-2xl hover:text-green-400" />
          </div>
        </div>
        <ManageUser></ManageUser>
      </div>
      <div className="flex justify-between items-center mx-6 md:hidden">
        <div>
          <Link to="/" className="col-span-1 flex items-center">
            <img className="h-12 w-12 rounded-full" src={logo} alt="" />
            <h1
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="font-semibold text-xl"
            >
              InfiniteMart
            </h1>
          </Link>
        </div>
        <div onClick={() => setSearch(!search)} className="text-2xl">
          {search ? (
            <RiChatDeleteFill></RiChatDeleteFill>
          ) : (
            <CiSearch></CiSearch>
          )}
        </div>
      </div>
      {search && (
        <div className="flex md:hidden col-span-3 mx-6 relative">
          <Input placeholder="Search for..." variant="filled" />
          <div
            onClick={() => console.log("hello")}
            className="absolute right-2 top-[6px] border-l-2 pl-2 cursor-pointer"
          >
            <CiSearch className="text-xl hover:text-green-400" />
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white z-50 p-2 shadow-md flex justify-between px-6 md:hidden items-center text-center">
        <div className="flex flex-col items-center">
          <IoHome className="text-green-600 text-xl"></IoHome>
          <p className="text-sm">Home</p>
        </div>
        <div className="flex flex-col items-center">
          <FaCartShopping className="text-green-600 text-xl"></FaCartShopping>
          <p className="text-sm">Cart</p>
        </div>
        <div className="flex flex-col items-center">
          <TbCategory2 className="text-green-600 text-xl"></TbCategory2>
          <p className="text-sm">Categories</p>
        </div>
        <div className="flex flex-col items-center">
          <CiHeart className="text-green-600 text-xl"></CiHeart>
          <p className="text-sm">Wishlist</p>
        </div>
        <div className="flex flex-col items-center">
          <RiAccountBoxFill className="text-green-600 text-xl"></RiAccountBoxFill>
          <p className="text-sm">Account</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
