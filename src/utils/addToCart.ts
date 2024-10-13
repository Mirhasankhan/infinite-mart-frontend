import { toast } from "sonner";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import {
  useAddToCartMutation,
  useCartsQuery,
} from "../redux/features/cart/cartManagement.api";
import { useAppSelector } from "../redux/hooks";
import { TProduct } from "../types/product.type";

const useAddProductToCart = () => {
  const { email, role } = useAppSelector(useCurrentUser);
  const [addToCart] = useAddToCartMutation();
  const { data: cartData, isLoading } = useCartsQuery(email);

  const handleAddToCart = async (product: TProduct) => {
    if (!email || role == true) {
      toast.error("You need to login as an user to add products to the cart");
      return;
    }

    if (isLoading) {
      toast.error("Cart data is loading. Please try again.");
      return;
    }

    if (
      cartData &&
      cartData.data.some(
        (item: { productId: string }) => item.productId === product._id
      )
    ) {
      toast.error("Product is already in the cart");
      return;
    }

    const { _id, ...rest } = product;
    const cartItem = {
      ...rest,
      userEmail: email,
      productId: _id,
      cartQuantity: 1,
      totalCost: product.price,
    };

    try {
      await addToCart(cartItem).unwrap();
      toast.success("Product added to cart successfully");
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error("Add to cart error: ", error);
    }
  };

  return { handleAddToCart };
};

export default useAddProductToCart;
