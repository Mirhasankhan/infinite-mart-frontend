import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { useLocation } from "react-router-dom";
import "@smastrom/react-rating/style.css";
import ProductDescriptions from "./ProductDescriptions";
import useAddProductToCart from "../../utils/addToCart";

const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [transform, setTransform] = useState("scale(1)");
  const [origin, setOrigin] = useState("center center");
  const { handleAddToCart } = useAddProductToCart();
  const location = useLocation();
  const { product } = location.state;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setOrigin(`${x}% ${y}%`);
    setTransform("scale(2)");
  };

  const handleMouseLeave = () => {
    setTransform("scale(1)");
    setOrigin("center center");
  };

  const { price, productName, image, seller } = product;
  return (
    <div className="bg-gray-300 px-24 py-6 mt-6">
      <div className="bg-white p-4">
        <div className=" grid grid-cols-5 gap-6 rounded-md">
          <div className="col-span-2">
            <div
              className="h-64 md:h-[384px] rounded-md w-full overflow-hidden hover:cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                className="h-full w-full object-cover transition-transform duration-300"
                src={image.imageUrl}
                style={{ transform, transformOrigin: origin }}
              />
            </div>
          </div>
          <div className="col-span-3">
            <h1>{productName}</h1>
            <div className="flex items-center gap-2 border-b pb-4">
              <Rating
                className="mt-auto"
                style={{ maxWidth: 80 }}
                // value={Math.round(testi.rating)}
                value={4}
                readOnly
              />
              <p>(1 reviews)</p>
            </div>
            <div className="border-b py-4">
              <h1>Sold By: {seller}</h1>
              <p>Price: {price}</p>
            </div>
            {/* <div className="flex items-center gap-8 py-4 border-b">
              <p>Quantity: </p>
              <div className=" flex items-center gap-3 border px-3 py-1 rounded-lg">
                <button>-</button>
                <h1>1</h1>
                <button>+</button>
              </div>
            </div> */}
            <p className="py-4">Total Price: {price}</p>
            <div className="flex gap-6">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-400 px-3 py-2 rounded-md text-white"
              >
                Add To Cart
              </button>
              <button className="bg-orange-400 px-3 py-2 rounded-md text-white">
                Add To Wishlist
              </button>
            </div>
          </div>
        </div>
        <ProductDescriptions product={product}></ProductDescriptions>
      </div>
    </div>
  );
};

export default ProductDetails;
