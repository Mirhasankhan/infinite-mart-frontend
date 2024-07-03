import CartModal from "./CartModal";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CiCircleList, CiLogout } from "react-icons/ci";
import {
  MdDashboard,
  MdOutlineManageAccounts,
  MdRateReview,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import { useCartsQuery } from "../../redux/features/cart/cartManagement.api";
import { TCart } from "../../types/cart.type";

const ManageUser = () => {
  const { email, role } = useAppSelector(useCurrentUser);
  const { data: cartData } = useCartsQuery(email);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const currentRole = role == true ? "seller" : "user";

  const totalCost = cartData?.data.reduce(
    (acc: number, product: TCart) => acc + +product.totalCost,
    0
  );

  return (
    <div className="flex items-center justify-between col-span-2">
      {email ? (
        <div className="flex items-center gap-2 hover:bg-gray-300 p-1 rounded-md">
          <div>
            <FaUser className="text-green-400 text-xl"></FaUser>
          </div>
          <div className="cursor-pointer" onClick={() => setOpen(!open)}>
            <h1 className="text-sm">
              Hello, {email ? email.toString() : ""}
              <p>Manage Account</p>
            </h1>
          </div>
          {open && (
            <div
              onClick={() => setOpen(!open)}
              className="absolute top-[44px] border z-40 md:top-[100px] right-84 bg-white p-2 md:p-6 rounded-b-md min-w-[250px]"
            >
              <Link
                to={`/${currentRole}/manage-profile`}
                className="flex gap-2 items-center text-gray-700"
              >
                <MdOutlineManageAccounts className="text-2xl" />
                <h1 className="hover:underline hover:text-red-500">
                  Manage My Account
                </h1>
              </Link>
              <Link
                to={`/${currentRole}/dashboard`}
                className="flex gap-2 items-center text-gray-700 md:my-3 my-1"
              >
                <MdDashboard className="text-2xl" />
                <h1 className="hover:underline hover:text-red-500">
                  Dashboard
                </h1>
              </Link>
              <Link
                to={`/user/my-wishlist`}
                className="flex gap-2 items-center text-gray-700 md:my-3 my-1"
              >
                <CiCircleList className="text-2xl" />
                <h1 className="hover:underline hover:text-red-500">
                  My Wishlist
                </h1>
              </Link>

              <Link
                to={`/`}
                className="flex gap-2 items-center text-gray-700 md:my-3 my-1"
              >
                <MdRateReview className="text-2xl" />
                <h1 className="hover:underline hover:text-red-500">
                  My Reviews
                </h1>
              </Link>
              <div
                onClick={() => {
                  dispatch(logOut());
                  setIsOpen(false);
                }}
                className="flex gap-2 items-center text-gray-700 cursor-pointer"
              >
                <CiLogout className="text-2xl" />
                <button className="hover:text-red-400 hover:underline">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button>Login | </button>
          </Link>
          <Link to="register">
            <button className="pl-3">Register</button>
          </Link>
        </div>
      )}
      <div className="flex items-center gap-6 bg-green-600 px-3 relative rounded-md">
        <h1 className="bg-orange-200 rounded-full px-1 absolute top-1 right-16">
          {cartData?.data?.length}
        </h1>
        <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <FaCartShopping className="text-white text-2xl font-semibold"></FaCartShopping>
        </div>
        <div className="text-white">
          <h1>Cart</h1>
          <p>${totalCost}</p>
        </div>
      </div>
      <CartModal setIsOpen={setIsOpen} isOpen={isOpen}></CartModal>
    </div>
  );
};

export default ManageUser;
