import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import {
  useDeleteWishlistMutation,
  useWatchListQuery,
} from "../../../../redux/features/watchList/watchList.api";
import { useAppSelector } from "../../../../redux/hooks";
import { TProduct } from "../../../../types/product.type";
import { MdDeleteOutline } from "react-icons/md";
import useAddProductToCart from "../../../../utils/addToCart";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiArrowRight } from "react-icons/fi";

const MyWatchList = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data } = useWatchListQuery(email);
  const { handleAddToCart } = useAddProductToCart();
  const [deleteWishlist] = useDeleteWishlistMutation();

  const handleDeleteWishlist = (id: string) => {
    deleteWishlist(id);
  };

  const itemCount = data?.data?.length ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
            style={{ background: "linear-gradient(135deg, #874f6a 0%, #c27ba0 100%)" }}
          >
            <FiHeart className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-xs text-gray-400">
              {itemCount} {itemCount === 1 ? "item" : "items"} saved
            </p>
          </div>
        </div>
        {itemCount > 0 && (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
            {itemCount} saved
          </span>
        )}
      </div>

      {/* Content */}
      {itemCount > 0 ? (
        <div className="space-y-3">
          {data.data.map((list: TProduct) => (
            <div
              key={list._id}
              className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Product Image */}
              <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={list.image.imageUrl}
                  alt={list.productName}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Link
                  to={`/products/${list._id}`}
                  state={{ product: list }}
                  className="block"
                >
                  <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {list.productName}
                  </h3>
                </Link>
                <p className="text-xs text-gray-400 mt-0.5">
                  Sold by{" "}
                  <span className="text-gray-600 font-medium">{list.seller}</span>
                </p>
                <p
                  className="text-lg font-extrabold mt-1 tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #874f6a 0%, #c27ba0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ${list.price}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                <button
                  onClick={() => {
                    handleAddToCart(list);
                    handleDeleteWishlist(list._id);
                  }}
                  title="Move to Cart"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all duration-200 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #874f6a 0%, #a8688c 100%)",
                    boxShadow: "0 3px 12px rgba(135,79,106,0.25)",
                  }}
                >
                  <FiShoppingCart className="text-sm" />
                  <span className="hidden sm:inline">Move to Cart</span>
                </button>
                <button
                  onClick={() => handleDeleteWishlist(list._id)}
                  title="Remove from wishlist"
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 active:scale-95"
                >
                  <MdDeleteOutline className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <FiHeart className="text-4xl text-gray-300" />
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-md"
              style={{ background: "linear-gradient(135deg, #874f6a 0%, #c27ba0 100%)" }}
            >
              <span className="text-white text-sm font-bold">0</span>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Your wishlist is empty</h2>
            <p className="text-sm text-gray-400 mt-1">
              Save items you love and come back to them later.
            </p>
          </div>
          <Link to="/">
            <button
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 active:scale-95 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #874f6a 0%, #a8688c 100%)",
                boxShadow: "0 4px 16px rgba(135,79,106,0.3)",
              }}
            >
              Browse Products
              <FiArrowRight className="text-sm" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyWatchList;
