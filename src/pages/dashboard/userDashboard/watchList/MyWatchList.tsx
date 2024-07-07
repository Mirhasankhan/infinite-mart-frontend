import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import {
  useDeleteWishlistMutation,
  useWatchListQuery,
} from "../../../../redux/features/watchList/watchList.api";
import { useAppSelector } from "../../../../redux/hooks";
import { TProduct } from "../../../../types/product.type";
import { MdDeleteOutline } from "react-icons/md";
import useAddProductToCart from "../../../../utils/addToCart";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Button } from "antd";
import { Link } from "react-router-dom";

const MyWatchList = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data } = useWatchListQuery(email);
  const { handleAddToCart } = useAddProductToCart();
  const [deleteWishlist] = useDeleteWishlistMutation();

  const handleDeleteWishlist = (id: string) => {
    deleteWishlist(id);
  };

  return (
    <div>
      <h1 className="text-xl font-medium">Wishlist</h1>
      <div>
        {data?.data.length > 0 ? (
          <div>
            {data?.data.map((list: TProduct) => (
              <div
                className="grid grid-cols-2 my-6 border-b rounded-md py-3 px-2 bg-white"
                key={list._id}
              >
                <div className="col-span-1 flex items-center gap-4 ">
                  <img
                    className="h-16 w-16 rounded-lg"
                    src={list.image.imageUrl}
                    alt=""
                  />
                  <div>
                    <h1 className="font-medium">{list.productName}</h1>
                    <p>Seller: {list.seller}</p>
                    <button
                      onClick={() => handleDeleteWishlist(list._id)}
                      className="text-red-600 text-2xl"
                    >
                      <MdDeleteOutline></MdDeleteOutline>
                    </button>
                  </div>
                </div>
                <div className="col-span-1 flex justify-between items-center">
                  <h1 className="text-red-500 text-xl">${list.price}</h1>
                  <button
                    onClick={() => {
                      handleAddToCart(list);
                      handleDeleteWishlist(list._id);
                    }}
                    className="bg-green-400 rounded-md font-medium px-3 py-2 text-white"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-4 mt-4 border-t-4 border-blue-600 md:flex justify-between">
            <div className="flex items-center gap-2">
              <MdCheckBoxOutlineBlank className="text-blue-300 text-xl"></MdCheckBoxOutlineBlank>
              <h1>No Product have been added in wishlist</h1>
            </div>
            <Link to={"/"}>
              <Button className="bg-green-400 text-white font-medium mt-2">
                Browse Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWatchList;
