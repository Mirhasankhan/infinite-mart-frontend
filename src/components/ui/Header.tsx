import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
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
import WhatsAppLink from "./WhatsApp";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const Header = () => {
  const [search, setSearch] = useState(false);
  const { role } = useAppSelector(useCurrentUser);
  const currentRole = role == true ? "seller" : "user";

  return (
    <header className="">
      <div className="hidden md:flex justify-between bg-gray-300 px-3 md:px-14 py-2">
        <div className="flex gap-6">
          <h1>Welcome to Infinite Mart</h1>
          <div className="flex items-center gap-1">
            <FaPhoneAlt className="text-green-500 text-xl"></FaPhoneAlt>
            <div>
              <WhatsAppLink
                phoneNumber={"+8801678506798"}
                text="Helpline: 01678506798"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <Link to="track-order">Order Tracking</Link>
          <Link to="/user/my-wishlist">My Wishlist</Link>
          <Link to="/register-seller">
            <button>Become Seller</button>
          </Link>
        </div>
      </div>
      <div className=" hidden md:grid grid-cols-6 gap-6 px-3 md:px-14 mt-3 mb-3">
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
      <div className="flex justify-between items-center px-3 border-b md:hidden">
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
        <div className=" md:hidden col-span-3 mx-3 relative">
          <SearchedProducts></SearchedProducts>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white z-50 p-2 shadow-md flex justify-between px-3 md:hidden items-center text-center">
        <Link to="/" className="flex flex-col items-center">
          <IoHome className="text-green-600 text-xl"></IoHome>
          <p className="text-sm">Home</p>
        </Link>
        <Link to="/cart" className="flex flex-col items-center">
          <FaCartShopping className="text-green-600 text-xl"></FaCartShopping>
          <p className="text-sm">Cart</p>
        </Link>
        <Link to="/categories" className="flex flex-col items-center">
          <TbCategory2 className="text-green-600 text-xl"></TbCategory2>
          <p className="text-sm">Categories</p>
        </Link>
        <Link to="/user/my-wishlist" className="flex flex-col items-center">
          <CiHeart className="text-green-600 text-xl"></CiHeart>
          <p className="text-sm">Wishlist</p>
        </Link>
        <Link
          to={currentRole ? `/${currentRole}/dashboard` : "/login"}
          className="flex flex-col items-center"
        >
          <RiAccountBoxFill className="text-green-600 text-xl"></RiAccountBoxFill>
          <p className="text-sm">Account</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
