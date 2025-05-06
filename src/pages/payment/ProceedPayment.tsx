import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useCartsQuery } from "../../redux/features/cart/cartManagement.api";
import { useAppSelector } from "../../redux/hooks";
import { TCart } from "../../types/cart.type";
import { TProduct } from "../../types/product.type";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PayOut from "../../components/ui/PayOut";
import { useActiveUserQuery } from "../../redux/features/auth/authApi";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const striprePromise = loadStripe(import.meta.env.VITE_Stripe_Gateway_PK);

const ProceedPayment = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data: cartData } = useCartsQuery(email);
  const { data: userData } = useActiveUserQuery(email);
  const totalCost = cartData?.data.reduce(
    (acc: number, product: TProduct) => acc + product.totalCost,
    0
  );

  const username = userData?.data?.name || "";
  const phone = userData?.data?.phone || "";
  const province = userData?.data?.address?.province || "";
  const city = userData?.data?.address?.city || "";
  const street = userData?.data?.address?.street || "";

  const userAddress = {
    phone,
    province,
    city,
    street,
  };

  return (
    <div className="px-3 md:px-14 py-6 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white h-80 p-5 rounded-md">
          <h1 className="text-xl md:text-2xl font-medium py-4 underline text-primary">
            Billing Details
          </h1>
          <div>
            <h1>
              Deliver To: {username}, {email}
            </h1>
            <div>Contact Number: {phone}</div>
            <h1>
              <div>Province: {province}</div>
              <div>City/Town: {city}</div>
              <div>
                Street Address: {street}
                <Link className="text-blue-400 pl-1" to="/user/manage-profile">
                  Change billing details
                </Link>
              </div>
            </h1>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md">
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
                <h1 className="text-red-800 font-medium hidden md:block">
                  ${+cart.price * cart.cartQuantity}
                </h1>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-2">
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
              userAddress={userAddress}
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
