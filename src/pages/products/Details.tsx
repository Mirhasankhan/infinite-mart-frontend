import { Rating } from "@smastrom/react-rating";
import { GiCelebrationFire } from "react-icons/gi";
import { Link } from "react-router-dom";
import useAddProductToCart from "../../utils/addToCart";
import useAddProductToWishlist from "../../utils/useAddToWishlist";
import { TProduct } from "../../types/product.type";
import { MdOutlineLocalShipping } from "react-icons/md";
import { GrCodepen } from "react-icons/gr";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";

const Details = ({ product }: { product: TProduct }) => {
  const { handleAddToCart } = useAddProductToCart();
  const { handleAddToWishlist } = useAddProductToWishlist();
  const { price, productName, sold, seller, reviews, quantity, category } =
    product;
  console.log(product);

  return (
    <div>
      <Link className="text-blue-600" to={`/products?category=${category}`}>
        {category}
      </Link>
      <h1 className="font-bold pt-2 text-xl">{productName}</h1>
      <div className="flex items-center gap-2 py-3">
        <Rating
          style={{ maxWidth: 80 }}
          // value={Math.round(testi.rating)}
          value={4}
          readOnly
        />
        <p>({reviews.length} reviews)</p>
        {sold > 0 && <GiCelebrationFire className="text-red-500" />}
        {sold > 0 && <h1 className="text-red-500">{sold} products sold</h1>}
      </div>
      <div className="py-4">
        <p className="text-4xl font-semibold pb-4">${price}.00</p>
        <h1>Sold By: {seller}</h1>
      </div>
      <div className="border p-3 rounded-md">
        <div className="flex items-center gap-2 py-2">
          <MdOutlineLocalShipping className="text-2xl" />
          <h1>
            Estimate delivery times:
            <span className="font-semibold"> 3-5 days</span>.
          </h1>
        </div>
        <div className="flex items-center gap-2 py-3 border-y border-dotted">
          <GrCodepen className="text-2xl" />
          <h1>
            Use code <span className="font-semibold">"WELCOME15"</span>. for
            discount 15% on your first order.
          </h1>
        </div>
        <div className="flex items-center gap-2 py-2">
          <AiOutlineDeliveredProcedure className="text-2xl" />
          <h1>
            Estimate delivery times:
            <span className="font-semibold"> 3-5 days</span>.
          </h1>
        </div>
      </div>
      <p className="py-4">Quantity: ({quantity} Available)</p>
      <div className="flex gap-6">
        <button
          onClick={() => handleAddToCart(product)}
          className="custom-button"
        >
          Add To Cart
        </button>
        <button
          onClick={() => handleAddToWishlist(product)}
          className="!bg-orange-400 custom-button"
        >
          Add To Wishlist
        </button>
      </div>
    </div>
  );
};

export default Details;
