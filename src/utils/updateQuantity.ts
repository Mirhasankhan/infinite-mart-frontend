import { useUpdateQuantityMutation } from "../redux/features/cart/cartManagement.api";
import { TCart } from "../types/cart.type";

const useUpdateCartQuantity = () => {
  const [updateQuantity] = useUpdateQuantityMutation();

  const handleUpdateQuantity = (data: TCart, updateType: boolean) => {
    if (updateType) {
      updateQuantity({ cartId: data._id, newQuantity: data.cartQuantity + 1 });
    } else if (data.cartQuantity > 0) {
      updateQuantity({ cartId: data._id, newQuantity: data.cartQuantity - 1 });
    }
  };

  return { handleUpdateQuantity };
};

export default useUpdateCartQuantity;
