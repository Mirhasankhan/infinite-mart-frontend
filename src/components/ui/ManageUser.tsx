import CartModal from "./CartModal";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CiCircleList, CiLogout } from "react-icons/ci";
import { MdDashboard, MdOutlineManageAccounts } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useState, useRef, useEffect } from "react";
import { useCartsQuery } from "../../redux/features/cart/cartManagement.api";
import { TCart } from "../../types/cart.type";

const ManageUser = () => {
  const { email, role, name } = useAppSelector(useCurrentUser);
  const { data: cartData } = useCartsQuery(email);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const currentRole = role === true ? "seller" : "user";
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const cartCount = cartData?.data?.length || 0;
  const totalCost = cartData?.data?.reduce(
    (acc: number, product: TCart) => acc + +product.totalCost,
    0
  );

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="flex items-center justify-end gap-3 lg:gap-5 col-span-2">
      {/* Account Section */}
      {email ? (
        <div ref={userDropdownRef} className="relative">
          {/* User Button Trigger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2.5 p-1.5 px-2.5 rounded-xl hover:bg-gray-100/90 active:scale-95 transition-all text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm uppercase ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all shadow-2xs">
              {name ? name.charAt(0) : <FaUser className="text-xs" />}
            </div>
            <div className="hidden xl:block">
              <span className="text-[11px] text-gray-500 font-medium block leading-none">
                Hello,
              </span>
              <span className="text-xs md:text-sm font-bold text-gray-800 block mt-0.5 truncate max-w-[100px]">
                {name || "User"}
              </span>
            </div>
            <IoChevronDown
              className={`text-xs text-gray-500 transition-transform duration-200 ${
                open ? "rotate-180 text-primary" : "group-hover:text-gray-800"
              }`}
            />
          </button>

          {/* User Dropdown Menu */}
          {open && (
            <div className="absolute right-0 top-full mt-2 z-50 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 animate-in fade-in zoom-in-95 duration-150">
              {/* User Info Header */}
              <div className="p-2.5 bg-gray-50/80 rounded-xl mb-1.5 border border-gray-100">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-gray-900 truncate">
                    {name || "Customer"}
                  </p>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                    {currentRole}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 truncate mt-0.5">
                  {typeof email === "string" ? email : (email as { email?: string })?.email || ""}
                </p>
              </div>

              {/* Menu Links */}
              <div className="space-y-0.5">
                <Link
                  to={`/${currentRole}/manage-profile`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs md:text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                >
                  <MdOutlineManageAccounts className="text-lg text-gray-500" />
                  <span>Manage Profile</span>
                </Link>

                <Link
                  to={`/${currentRole}/dashboard`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs md:text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                >
                  <MdDashboard className="text-lg text-gray-500" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/user/my-wishlist"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs md:text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                >
                  <CiCircleList className="text-lg text-gray-500" />
                  <span>My Wishlist</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="my-1.5 border-t border-gray-100" />

              {/* Logout Button */}
              <button
                type="button"
                onClick={() => {
                  dispatch(logOut());
                  setOpen(false);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 text-xs md:text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors w-full text-left cursor-pointer"
              >
                <CiLogout className="text-lg" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-xs lg:text-sm font-semibold">
          <Link
            to="/login"
            className="px-3 py-1.5 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
          >
            Login
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            to="/register"
            className="px-3.5 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-all"
          >
            Register
          </Link>
        </div>
      )}

      {/* Cart Widget */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-primary hover:bg-[#724158] text-white px-3.5 py-2 rounded-xl shadow-2xs hover:shadow-md transition-all duration-200 active:scale-95 group focus:outline-none"
      >
        <div className="relative flex items-center justify-center">
          <FaCartShopping className="text-lg md:text-xl group-hover:scale-105 transition-transform" />
          {cartCount > 0 && (
            <span className="absolute -top-2.5 -right-3 bg-amber-400 text-gray-950 font-bold text-[10px] h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          )}
        </div>
        <div className="text-left hidden sm:block">
          <span className="text-[10px] uppercase tracking-wider text-white/80 block font-semibold leading-none">
            Cart
          </span>
          <span className="text-xs font-bold text-white block mt-0.5 leading-none">
            ${totalCost ? (+totalCost).toFixed(2) : "0.00"}
          </span>
        </div>
      </button>

      {/* Cart Modal Slideout */}
      <CartModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

export default ManageUser;

