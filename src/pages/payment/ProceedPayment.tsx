import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useCartsQuery } from "../../redux/features/cart/cartManagement.api";
import { useAppSelector } from "../../redux/hooks";
import { TCart } from "../../types/cart.type";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PayOut from "../../components/ui/PayOut";
import { useActiveUserQuery } from "../../redux/features/auth/authApi";
import { Link } from "react-router-dom";
import {
  IoLocationOutline,
  IoPersonOutline,
  IoCallOutline,
  IoAlertCircleOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { HiArrowLeft } from "react-icons/hi";

const stripePublishableKey = import.meta.env.VITE_Stripe_Gateway_PK?.trim();
const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

const ProceedPayment = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data: cartData, isLoading: isCartLoading } = useCartsQuery(email);
  const { data: userData, isLoading: isUserLoading } =
    useActiveUserQuery(email);

  const cartItems: TCart[] = cartData?.data || [];
  const totalCost: number = cartItems.reduce<number>(
    (acc, product) => acc + +(product.totalCost || 0),
    0,
  );

  const username = userData?.data?.name || "Valued Customer";
  const phone = userData?.data?.phone || "";
  const province = userData?.data?.address?.province || "";
  const city = userData?.data?.address?.city || "";
  const street = userData?.data?.address?.street || "";

  const isAddressIncomplete = !phone || !province || !city || !street;

  const userAddress = {
    phone,
    province,
    city,
    street,
  };

  const deliveryCost = cartItems.length > 0 ? 50 : 0;
  const grandTotal = totalCost + deliveryCost;

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-50/60 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-primary transition-colors">
              Cart
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-semibold">
              Checkout & Payment
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                Complete Your Order
              </h1>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Please verify your delivery details and enter your payment
                information
              </p>
            </div>
            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-[#724158] transition-colors"
            >
              <HiArrowLeft className="text-sm" />
              <span>Return to Cart</span>
            </Link>
          </div>
        </div>

        {isCartLoading || isUserLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-96 animate-pulse" />
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-96 animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Delivery & Customer Information */}
            <div className="lg:col-span-7 space-y-6">
              {/* Delivery Address Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <IoLocationOutline className="text-lg" />
                    </span>
                    <h2 className="text-base font-bold text-gray-900">
                      Delivery Address
                    </h2>
                  </div>
                  <Link
                    to="/user/manage-profile"
                    className="text-xs font-bold text-primary hover:underline hover:text-[#724158] transition-colors"
                  >
                    Edit in Profile →
                  </Link>
                </div>

                {isAddressIncomplete && (
                  <div className="mb-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-amber-800 text-xs">
                    <IoAlertCircleOutline className="text-lg text-amber-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-semibold block mb-0.5">
                        Incomplete Delivery Address
                      </span>
                      <span>
                        Your shipping profile is missing contact or address
                        details. Please update your profile to ensure prompt
                        delivery.
                      </span>
                      <Link
                        to="/user/manage-profile"
                        className="inline-block mt-2 font-bold underline hover:text-amber-950"
                      >
                        Update Shipping Address →
                      </Link>
                    </div>
                  </div>
                )}

                <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2.5">
                    <IoPersonOutline className="text-base text-gray-400 shrink-0" />
                    <span className="font-semibold text-gray-800">
                      {username}
                    </span>
                    <span className="text-gray-400">
                      (
                      {typeof email === "string"
                        ? email
                        : (email as { email?: string })?.email || "User"}
                      )
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <IoCallOutline className="text-base text-gray-400 shrink-0" />
                    <span>
                      {phone || (
                        <span className="text-rose-500 italic">
                          No phone number provided
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <IoLocationOutline className="text-base text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      {street || city || province ? (
                        <p className="text-gray-800 leading-relaxed">
                          {[street, city, province].filter(Boolean).join(", ")}
                        </p>
                      ) : (
                        <p className="text-rose-500 italic">
                          No delivery address saved
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delivery Shipping Guarantee Card */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3 p-3 bg-gray-50/80 rounded-xl">
                  <CiDeliveryTruck className="text-2xl text-primary shrink-0" />
                  <div className="flex-1 text-xs">
                    <span className="font-bold text-gray-800 block">
                      Standard Tracked Shipping
                    </span>
                    <span className="text-gray-500">
                      Estimated delivery in 2-4 business days with live order
                      updates
                    </span>
                  </div>
                  <span className="text-xs font-bold text-gray-700 bg-white px-2 py-1 rounded-md border border-gray-200">
                    $50.00
                  </span>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900">
                    Items in this Order ({cartItems.length})
                  </h3>
                  <Link
                    to="/cart"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Modify
                  </Link>
                </div>

                <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map((cart: TCart) => (
                    <div
                      key={cart._id}
                      className="py-3 flex items-center gap-3"
                    >
                      <div className="relative shrink-0 w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden">
                        <img
                          src={cart.image.imageUrl}
                          alt={cart.productName}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0 right-0 bg-gray-900 text-white text-[9px] font-bold px-1 rounded-tl-md">
                          x{cart.cartQuantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-800 truncate">
                          {cart.productName}
                        </h4>
                        <span className="text-[11px] text-gray-400">
                          ${(+cart.price).toFixed(2)} each
                        </span>
                      </div>
                      <span className="text-xs font-bold text-gray-900 shrink-0">
                        ${(+cart.price * cart.cartQuantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Card Payment */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                <h2 className="text-base font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100">
                  Order Summary
                </h2>

                <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ${totalCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-gray-900">
                      ${deliveryCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-dashed border-gray-200">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-bold text-gray-900">
                        Total Payable
                      </span>
                      <span className="text-2xl font-extrabold text-primary">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stripe Card Payment Form */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <Elements stripe={stripePromise}>
                    <PayOut
                      userAddress={userAddress}
                      selectedProduct={cartItems}
                      totalCost={totalCost}
                    />
                  </Elements>
                </div>
              </div>

              {/* Safety Badges */}
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs text-emerald-900 flex items-center gap-3">
                <IoShieldCheckmarkOutline className="text-2xl text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold block">
                    100% Risk-Free Guarantee
                  </span>
                  <span className="text-emerald-700/90 text-[11px]">
                    If anything is not as expected, our support team is
                    available 24/7 for easy refunds.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProceedPayment;
