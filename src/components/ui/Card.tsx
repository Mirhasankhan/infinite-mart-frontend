import { TProduct } from "../../types/product.type";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import useAddProductToCart from "../../utils/addToCart";
import useAddProductToWishlist from "../../utils/useAddToWishlist";

const Card = ({ product }: { product: TProduct }) => {
  const { image, productName, price, sold, category } = product;
  const { handleAddToCart } = useAddProductToCart();
  const { handleAddToWishlist } = useAddProductToWishlist();

  return (
    <div className="relative group border rounded-md">
      <Link
        state={{ product: product }}
        to={`/products/${product._id}`}
        className="flex flex-col h-full border hover:shadow-lg rounded-md"
      >
        <img className="h-60 w-full" src={image.imageUrl} alt="" />
        <div className="px-3 py-3 flex-grow flex flex-col justify-between">
          <div className="flex justify-between">
            <p className="text-red-500 font-medium">${price}</p>
            <h1 className="hidden md:block border rounded-lg p-0.5 text-sm hover:bg-green-400 hover:text-white">
              {category}
            </h1>
          </div>
          <div className="flex items-center my-1 gap-1">
            <Rating
              className="mt-auto"
              style={{ maxWidth: 80 }}
              value={4}
              readOnly
            />
            <h1 className="text-sm">({sold ? sold : "0"})</h1>
          </div>
          <h1>
            {productName.length > 20
              ? productName.substring(0, 20) + "..."
              : productName}
          </h1>
        </div>
      </Link>
      <div className="absolute top-2 right-2 opacity-0 transform scale-0 group-hover:opacity-100 group-hover:scale-100 transition-transform duration-500">
        <div
          onClick={() => handleAddToWishlist(product)}
          className="cursor-pointer bg-white p-2 text-xl rounded-full mb-2 border hover:bg-orange-500 hover:text-white"
        >
          <CiHeart className="font-medium" title="Add to wishlist" />
        </div>
        <div
          onClick={() => handleAddToCart(product)}
          className="bg-white cursor-pointer text-xl p-2 border rounded-full hover:bg-orange-500 hover:text-white"
        >
          <CiShoppingCart className="font-medium" title="Add to cart" />
        </div>
      </div>
    </div>
  );
};

export default Card;
