import { TProduct } from "../../types/product.type";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import useAddProductToCart from "../../utils/addToCart";
import useAddProductToWishlist from "../../utils/useAddToWishlist";

const Card = ({ product }: { product: TProduct }) => {
  const { image, productName, price, sold, category, discountPercentage } =
    product;
  const { handleAddToCart } = useAddProductToCart();
  const { handleAddToWishlist } = useAddProductToWishlist();

  return (
    <div className="relative group shadow-[0px_4px_15px_rgba(255,69,58,0.15)]  rounded-md">
      <Link
        state={{ product: product }}
        to={`/products/${product._id}`}
        className="flex flex-col p-2 h-full hover:shadow-lg rounded-md"
      >
        <img
          className="h-40 md:h-[280px] w-full mb-3 rounded-t-md"
          src={image.imageUrl}
          alt=""
        />
        <h1 className="pl-3 py-2 font-semibold">
          {productName.length > 26
            ? productName.substring(0, 26) + "..."
            : productName}
        </h1>
        <div className="px-3 py-3 flex-grow flex flex-col justify-between">
          {/* {discountPercentage && (
            <p className="text-red-500 font-medium">
              ${+price - (+price / 100) * discountPercentage}
            </p>
          )} */}
          <div className="flex justify-between">
            <div className="flex gap-1 items-center text-gray-600">
              <p>${price}</p>
              {discountPercentage && (
                <p className="font-medium bg-red-600 p-0.5 text-white text-xs">
                  -{discountPercentage}%
                </p>
              )}
            </div>
            <h1 className="hidden md:block border rounded-lg px-2 py-1 text-sm hover:bg-[#3975c3]  hover:text-white">
              {category}
            </h1>
          </div>
          <div className="flex items-center mt-2 gap-1">
            <Rating style={{ maxWidth: 80 }} value={4} readOnly />
            <h1 className="text-sm">({sold ? sold : "0"})</h1>
          </div>
        </div>
      </Link>
      <div className="absolute top-3 right-3 opacity-0 transform scale-0 group-hover:opacity-100 group-hover:scale-100 transition-transform duration-500">
        <div
          onClick={() => handleAddToWishlist(product)}
          className="cursor-pointer bg-white p-2 text-xl rounded-full mb-2 border hover:bg-[#3975c3]  hover:text-white"
        >
          <CiHeart className="font-medium" title="Add to wishlist" />
        </div>
        <div
          onClick={() => handleAddToCart(product)}
          className="bg-white cursor-pointer text-xl p-2 border rounded-full hover:bg-[#3975c3]  hover:text-white"
        >
          <CiShoppingCart className="font-medium" title="Add to cart" />
        </div>
      </div>
    </div>
  );
};

export default Card;
