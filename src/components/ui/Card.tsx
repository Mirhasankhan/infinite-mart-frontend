import { TProduct } from "../../types/product.type";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { FaBolt } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useAddProductToCart from "../../utils/addToCart";
import useAddProductToWishlist from "../../utils/useAddToWishlist";

const Card = ({ product }: { product: TProduct }) => {
  const { image, productName, price, sold, category, discountPercentage, flashSale } =
    product;
  const { handleAddToCart } = useAddProductToCart();
  const { handleAddToWishlist } = useAddProductToWishlist();

  const numPrice = parseFloat(price) || 0;
  const originalPrice =
    discountPercentage && discountPercentage > 0
      ? (numPrice / (1 - discountPercentage / 100)).toFixed(2)
      : null;

  const ratingValue =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) /
        product.reviews.length
      : 4.5;

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Top Media Area */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
        <Link
          state={{ product: product }}
          to={`/products/${product._id}`}
          className="block w-full h-full cursor-pointer"
        >
          <img
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
            src={image?.imageUrl}
            alt={productName}
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercentage && discountPercentage > 0 ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm tracking-tight">
              -{discountPercentage}%
            </span>
          ) : null}
          {flashSale && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500 text-white shadow-sm">
              <FaBolt className="text-[9px]" /> Flash
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10 opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 md:translate-x-2 md:group-hover:translate-x-0">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToWishlist(product);
            }}
            aria-label="Add to wishlist"
            title="Add to wishlist"
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-gray-700 hover:text-rose-500 hover:bg-white shadow-md border border-gray-100 transition-all active:scale-90"
          >
            <CiHeart className="text-xl stroke-[1]" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart(product);
            }}
            aria-label="Quick add to cart"
            title="Quick add to cart"
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-gray-700 hover:text-primary hover:bg-white shadow-md border border-gray-100 transition-all active:scale-90"
          >
            <CiShoppingCart className="text-xl stroke-[1]" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3 md:p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Category Tag */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary/80 truncate">
              {category || "Store"}
            </span>
            <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
              {sold ? `${sold} sold` : "New"}
            </span>
          </div>

          {/* Product Title */}
          <Link
            state={{ product: product }}
            to={`/products/${product._id}`}
            className="block"
          >
            <h3
              title={productName}
              className="text-xs md:text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem] leading-snug"
            >
              {productName}
            </h3>
          </Link>
        </div>

        {/* Rating and Price */}
        <div className="mt-2.5 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1.5 mb-2">
            <Rating
              style={{ maxWidth: 70 }}
              value={ratingValue}
              readOnly
            />
            <span className="text-xs font-semibold text-gray-600">
              {ratingValue.toFixed(1)}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-base md:text-lg font-bold text-gray-900 tracking-tight">
                ${price}
              </span>
              {originalPrice && (
                <span className="text-xs md:text-sm text-gray-400 line-through font-normal">
                  ${originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart(product);
            }}
            className="w-full mt-3 py-2 px-3 rounded-xl bg-gray-50 group-hover:bg-primary text-gray-700 group-hover:text-white font-medium text-xs md:text-sm flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] border border-gray-200/60 group-hover:border-primary shadow-2xs"
          >
            <CiShoppingCart className="text-lg stroke-[1]" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

