import { TProduct } from "../../types/product.type";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
// import { Link } from "react-router-dom";
import { useAddToCartMutation } from "../../redux/features/cart/cartManagement.api";

const Card = ({ product }: { product: TProduct }) => {
  const { image, productName, price } = product;
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = (data: TProduct) => {
    const { _id, ...rest } = data;
    const cartData = {
      ...rest,
      sellerEmail: "seller@gmail.com",
      buyerEmail: "buy2@gmail.com",
    };
    addToCart(cartData);
  };

  return (
    <div className="relative border rounded-md hover:shadow-lg group">
      <img className="h-60 w-full" src={image} alt="" />
      <div className="px-3 py-3">
        <p>{price}</p>
        <Rating
          className="mt-auto"
          style={{ maxWidth: 80 }}
          // value={Math.round(testi.rating)}
          value={4}
          readOnly
        />
        <h1>{productName}</h1>
      </div>
      <div
        // data-aos="fade-left"

        className="absolute top-2 right-2 opacity-0 transform scale-0 group-hover:opacity-100 group-hover:scale-100  transition-transform duration-500"
      >
        <div className="bg-white p-2 text-xl  rounded-full mb-2 border hover:bg-orange-500 hover:text-white">
          <CiHeart className="font-medium" title="Add to wishlist"></CiHeart>
        </div>
        <div
          onClick={() => handleAddToCart(product)}
          className="bg-white cursor-pointer text-xl p-2 border rounded-full hover:bg-orange-500 hover:text-white"
        >
          <CiShoppingCart
            className="font-medium"
            title="Add to cart"
          ></CiShoppingCart>
        </div>
      </div>
    </div>
  );
};

export default Card;
