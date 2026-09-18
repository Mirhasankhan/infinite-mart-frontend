import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { GiCelebrationFire } from "react-icons/gi";
import { Link } from "react-router-dom";
import useAddProductToCart from "../../utils/addToCart";
import useAddProductToWishlist from "../../utils/useAddToWishlist";
import { TProduct } from "../../types/product.type";
import {
  MdOutlineLocalShipping,
  MdOutlineVerifiedUser,
} from "react-icons/md";
import { GrCodepen } from "react-icons/gr";
import { TbTruckReturn } from "react-icons/tb";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

const Details = ({ product }: { product: TProduct }) => {
  const { handleAddToCart } = useAddProductToCart();
  const { handleAddToWishlist } = useAddProductToWishlist();
  const { price, productName, sold, seller, reviews, quantity, category } =
    product;

  const avgRating =
    reviews && reviews.length > 0
      ? reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) /
        reviews.length
      : 4;

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Breadcrumb / Category */}
      <div className="flex items-center gap-2">
        <Link
          to={`/products?category=${category}`}
          className="text-xs font-semibold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors"
        >
          {category}
        </Link>
        <span className="text-gray-300 text-xs">›</span>
        <span className="text-xs text-gray-400 truncate">{productName}</span>
      </div>

      {/* Product Name */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
        {productName}
      </h1>

      {/* Rating & Sold */}
      <div className="flex items-center gap-3 flex-wrap">
        <Rating style={{ maxWidth: 90 }} value={Math.round(avgRating)} readOnly />
        <span className="text-sm font-semibold text-gray-700">
          {avgRating.toFixed(1)}
        </span>
        <span className="text-gray-300">|</span>
        <span className="text-sm text-gray-500">
          {reviews?.length ?? 0} reviews
        </span>
        {sold > 0 && (
          <>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1 text-sm font-semibold text-primary">
              <GiCelebrationFire className="text-base" />
              {sold} sold
            </span>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-gray-200 via-primary/20 to-transparent" />

      {/* Price Block */}
      <div className="flex items-end gap-4">
        <p
          className="text-4xl font-extrabold tracking-tight"
          style={{
            background: "linear-gradient(135deg, #874f6a 0%, #c27ba0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ${price}.00
        </p>
        <div className="mb-1 flex flex-col">
          <span className="text-xs text-gray-400">Sold by</span>
          <span className="text-sm font-semibold text-gray-700">{seller}</span>
        </div>
      </div>

      {/* Quantity Badge */}
      <div className="inline-flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border ${
            quantity > 10
              ? "bg-green-50 text-green-700 border-green-200"
              : quantity > 0
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {quantity > 0 ? `${quantity} in stock` : "Out of Stock"}
        </span>
        {quantity > 0 && quantity <= 10 && (
          <span className="text-xs text-amber-600 font-medium">
            Only a few left!
          </span>
        )}
      </div>

      {/* Info Cards */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50/70 divide-y divide-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <MdOutlineLocalShipping className="text-primary text-lg" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700">Estimated Delivery</p>
            <p className="text-xs text-gray-500">3–5 business days</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <GrCodepen className="text-primary text-base" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700">First Order Discount</p>
            <p className="text-xs text-gray-500">
              Use code{" "}
              <span className="font-bold text-primary">"WELCOME15"</span> for 15% off
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <TbTruckReturn className="text-primary text-lg" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700">Easy Returns</p>
            <p className="text-xs text-gray-500">Return within 7 days of delivery</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <MdOutlineVerifiedUser className="text-primary text-lg" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700">Secure Checkout</p>
            <p className="text-xs text-gray-500">SSL encrypted &amp; 100% safe payments</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={() => handleAddToCart(product)}
          disabled={quantity === 0}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm text-white shadow-lg transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #874f6a 0%, #a8688c 100%)",
            boxShadow: "0 4px 20px rgba(135, 79, 106, 0.3)",
          }}
        >
          <FiShoppingCart className="text-base" />
          Add to Cart
        </button>
        <button
          onClick={() => handleAddToWishlist(product)}
          className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition-all duration-200 active:scale-[0.97]"
        >
          <FiHeart className="text-base" />
          Wishlist
        </button>
      </div>
    </div>
  );
};

export default Details;
