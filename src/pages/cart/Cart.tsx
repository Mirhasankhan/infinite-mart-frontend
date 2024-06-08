import { RiDeleteBin6Line } from "react-icons/ri";
import { useCartsQuery } from "../../redux/features/cart/cartManagement.api";
import { TCart } from "../../types/cart.type";
import { Button } from "antd";

const Cart = () => {
  const { data: cartData } = useCartsQuery("buy2@gmail.com");
  return (
    <div className="grid grid-cols-4 gap-12 px-6 md:px-14 mt-12">
      <div className="col-span-3">
        <h1 className="text-2xl font-medium border-b pb-3">Cart</h1>
        {cartData?.data?.map((cart: TCart) => (
          <div key={cart._id} className="grid grid-cols-5 border-b py-3">
            <div className="mb-4 col-span-2">
              <div className="flex gap-4 items-center">
                <img className="h-12 w-12  border" src={cart.image} alt="" />
                <h1>{cart.productName}</h1>
              </div>
            </div>
            <div className="col-span-3 flex items-center justify-between">
              <h1 className="text-red-800 font-medium">{cart.price}</h1>
              <div className="flex items-center gap-3 border px-3 py-1 rounded-lg">
                <button>-</button>
                <h1>2</h1>
                <button>+</button>
              </div>
              <h1 className="text-red-800 font-medium">$90</h1>
              <div className="text-right text-xl">
                <button>
                  <RiDeleteBin6Line className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        ))}
        <Button className="bg-green-400 mt-6">Continue Shopping</Button>
      </div>
      <div className="col-span-1 h-80 mt-9">
        <div className="bg-gray-200 rounded-md max-h-80 p-3">
          <h1 className="text-xl pb-3 font-medium">Cart Totals</h1>
          <div className="flex justify-between">
            <h1>Subtotal</h1>
            <p className="text-red-800">$500</p>
          </div>
          <div className="flex justify-between py-2">
            <h1>Shipping Cost</h1>
            <p className="text-red-800">$50</p>
          </div>
          <div className="flex justify-between">
            <h1>TAX</h1>
            <p className="text-red-800">$50</p>
          </div>
          <div className="flex justify-between border-t mt-4 border-gray-500 py-5">
            <h1>Total</h1>
            <p className="text-red-800 text-xl font-medium">$600</p>
          </div>
        </div>
        <Button className="bg-green-400 w-full mt-4 font-medium text-white">
          Proceed To Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
