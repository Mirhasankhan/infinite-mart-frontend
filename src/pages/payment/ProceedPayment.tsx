import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useCartsQuery } from "../../redux/features/cart/cartManagement.api";
import { useAppSelector } from "../../redux/hooks";
import { TCart } from "../../types/cart.type";
import { TProduct } from "../../types/product.type";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PayOut from "../../components/ui/PayOut";

const striprePromise = loadStripe(import.meta.env.VITE_Stripe_Gateway_PK);

const ProceedPayment = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data: cartData } = useCartsQuery(email);

  const totalCost = cartData?.data.reduce(
    (acc: number, product: TProduct) => acc + product.totalCost,
    0
  );

  return (
    <div className="px-6 md:px-14 my-24">
      <h1 className="text-2xl font-semibold pb-8">Billing Details</h1>
      <div className="grid grid-cols-2">
        <div>user information</div>
        <div className="bg-gray-200 p-4 rounded-md">
          <div className="flex justify-between text-xl font-medium">
            <h1>Product</h1>
            <h1>Subtotal</h1>
          </div>
          {cartData?.data?.map((cart: TCart) => (
            <div
              key={cart._id}
              className="grid grid-cols-5 border-b border-gray-400 py-3"
            >
              <div className="mb-4 col-span-2">
                <div className="flex gap-4 items-center">
                  <img
                    className="h-12 w-12  border"
                    src={cart.image.imageUrl}
                    alt=""
                  />
                  <h1>{cart.productName}</h1>
                </div>
              </div>
              <div className="col-span-3 flex items-center justify-between">
                <h1 className="text-red-800 font-medium">${cart.price}</h1>
                <div className="flex items-center gap-3 border rounded-lg">
                  <h1 className="px-8">qty: {cart.cartQuantity}</h1>
                </div>
                <h1 className="text-red-800 font-medium">
                  ${+cart.price * cart.cartQuantity}
                </h1>
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <h1>Subtotal :</h1>
            <h1 className="text-red-800 font-medium"> ${totalCost}</h1>
          </div>
          <div className="flex justify-between">
            <h1>Delivery Cost :</h1>
            <h1 className="text-red-800 font-medium"> ${50}</h1>
          </div>
          <div className="flex justify-between pb-6">
            <h1>Total Cost :</h1>
            <h1 className="text-red-800 font-medium">${50 + totalCost}</h1>
          </div>

          <Elements stripe={striprePromise}>
            <PayOut
              selectedProduct={cartData?.data}
              totalCost={totalCost}
            ></PayOut>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default ProceedPayment;
