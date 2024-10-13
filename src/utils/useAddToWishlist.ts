import { toast } from "sonner";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { TProduct } from "../types/product.type";
import {
  useAddToWatchListMutation,
  useWatchListQuery,
} from "../redux/features/watchList/watchList.api";

const useAddProductToWishlist = () => {
  const { email, role } = useAppSelector(useCurrentUser);
  const [addToWatchList] = useAddToWatchListMutation();

  const { data: wishlistData, isLoading } = useWatchListQuery(email);

  const handleAddToWishlist = async (product: TProduct) => {
    if (!email || role == true) {
      toast.error(
        "You need to login as an user to add products to the wishlist"
      );
      return;
    }

    if (isLoading) {
      toast.error("Cart data is loading. Please try again.");
      return;
    }

    if (
      wishlistData &&
      wishlistData.data.some(
        (item: { productId: string }) => item.productId === product._id
      )
    ) {
      toast.error("Product is already in the wishlist");
      return;
    }

    const { _id, ...rest } = product;
    const wishlistItem = {
      ...rest,
      userEmail: email,
      productId: _id,
      cartQuantity: 1,
      totalCost: product.price,
    };

    try {
      await addToWatchList(wishlistItem).unwrap();
      toast.success("Product added to wishlist successfully");
    } catch (error) {
      toast.error("Failed to add product to wishlist");
      console.error("Add to cart error: ", error);
    }
  };

  return { handleAddToWishlist };
};

export default useAddProductToWishlist;
