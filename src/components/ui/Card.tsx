import { TProduct } from "../../types/product.type";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAddToWatchListMutation } from "../../redux/features/watchList/watchList.api";
import useAddProductToCart from "../../utils/addToCart";

const Card = ({ product }: { product: TProduct }) => {
  const { email } = useAppSelector(useCurrentUser);
  const { image, productName, price } = product;
  const [addToWatchList] = useAddToWatchListMutation();
  const { handleAddToCart } = useAddProductToCart();

  const handleAddToWatchList = (data: TProduct) => {
    const { _id, ...rest } = data;
    const watchListData = {
      ...rest,
      buyerEmail: email,
    };
    addToWatchList(watchListData);
    console.log(_id);
  };

  return (
    <div className="relative group border">
      <Link
        state={{ product: product }}
        to="/products/dsf"
        className="flex flex-col h-full border hover:shadow-lg"
      >
        <img className="h-60 w-full" src={image.imageUrl} alt="" />
        <div className="px-3 py-3 flex-grow flex flex-col justify-between">
          <p>${price}</p>
          <Rating
            className="mt-auto"
            style={{ maxWidth: 80 }}
            // value={Math.round(testi.rating)}
            value={4}
            readOnly
          />
          <h1>{productName}</h1>
        </div>
      </Link>
      <div className="absolute top-2 right-2 opacity-0 transform scale-0 group-hover:opacity-100 group-hover:scale-100 transition-transform duration-500">
        <div
          onClick={() => handleAddToWatchList(product)}
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
