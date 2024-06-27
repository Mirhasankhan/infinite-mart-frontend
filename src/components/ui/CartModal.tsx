import { Button } from "antd";
import {
  useCartsQuery,
  useDeleteCartMutation,
} from "../../redux/features/cart/cartManagement.api";
import { TCart } from "../../types/cart.type";
import { RiDeleteBin6Line } from "react-icons/ri";
import shopping from "../../assets/images/shopping.jpeg";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import useUpdateCartQuantity from "../../utils/updateQuantity";

interface CartProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal = ({ isOpen, setIsOpen }: CartProps) => {
  const { email } = useAppSelector(useCurrentUser);
  const { data: cartData } = useCartsQuery(email);
  const { handleUpdateQuantity } = useUpdateCartQuantity();
  const [deleteCart] = useDeleteCartMutation();

  const handleDeleteCart = (id: string) => {
    deleteCart(id);
  };

  return (
    <div>
      {isOpen && (
        <div className="absolute top-[44px] border md:top-[110px] z-10 right-14 bg-white p-2 md:p-6 rounded-b-md min-w-[350px]">
          {cartData?.data?.length > 0 ? (
            <div>
              <div>
                {cartData?.data?.map((cart: TCart) => (
                  <div
                    className="grid grid-cols-4 items-center mb-4"
                    key={cart._id}
                  >
                    <div className="col-span-1">
                      <img
                        className="h-12 w-12 border"
                        src={cart.image.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="col-span-2">
                      <h1>
                        {cart.productName.length > 20
                          ? cart.productName.substring(0, 20) + "..."
                          : cart.productName}
                      </h1>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-3 border px-2 py-1 rounded-lg">
                          <button
                            onClick={() => handleUpdateQuantity(cart, false)}
                            className="bg-gray-400 rounded-full px-2"
                          >
                            -
                          </button>
                          <h1>{cart.cartQuantity}</h1>
                          <button
                            onClick={() => handleUpdateQuantity(cart, true)}
                            className="bg-orange-400 rounded-full px-2"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-red-800 font-medium">
                          ${cart.price}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-1 text-right text-xl">
                      <button onClick={() => handleDeleteCart(cart._id)}>
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <h1>Total</h1>
                  <p className="text-red-800 text-2xl">${500}</p>
                </div>
                <div className="flex justify-between">
                  <Link onClick={() => setIsOpen(false)} to="/checkout">
                    <Button className="bg-green-400">Checkout</Button>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} to="/cart">
                    <Button>View Cart</Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 items-center text-xl font-medium">
              <img className="h-16 w-16 rounded-lg" src={shopping} alt="" />
              <h1>Your cart is empty</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartModal;
