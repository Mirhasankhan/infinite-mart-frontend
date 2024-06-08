import { Button } from "antd";
import { useCartsQuery } from "../../redux/features/cart/cartManagement.api";
import { TCart } from "../../types/cart.type";
import { RiDeleteBin6Line } from "react-icons/ri";
import shopping from "../../assets/images/shopping.jpeg";
import { Link } from "react-router-dom";

interface CartProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal = ({ isOpen, setIsOpen }: CartProps) => {
  const { data: cartData } = useCartsQuery("buy2@gmail.com");
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
                        src={cart.image}
                        alt=""
                      />
                    </div>
                    <div className="col-span-2">
                      <h1>{cart.productName}</h1>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-3 border px-3 py-1 rounded-lg">
                          <button>-</button>
                          <h1>{1}</h1>
                          <button>+</button>
                        </div>
                        <p className="text-red-800 font-medium">{cart.price}</p>
                      </div>
                    </div>
                    <div className="col-span-1 text-right text-xl">
                      <button>
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
