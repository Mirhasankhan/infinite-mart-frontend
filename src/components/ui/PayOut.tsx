// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import "./CheckOutForm.css";
// import { useAppSelector } from "../../redux/hooks";
// import { useCurrentUser } from "../../redux/features/auth/authSlice";
// import { TProduct } from "../../types/product.type";
// import { toast } from "sonner";
// import { usePurchaseProductMutation } from "../../redux/features/purchase/purchase.api";

// interface PayOutProps {
//   selectedProduct: TProduct[];
//   totalCost: number;
//   userAddress: {
//     phone: string;
//     city: string;
//     province: string;
//     street: string;
//   };
// }

// const PayOut: React.FC<PayOutProps> = ({
//   selectedProduct,
//   totalCost,
//   userAddress,
// }) => {
//   const [purchaseProduct] = usePurchaseProductMutation();
//   const { email, name } = useAppSelector(useCurrentUser);
//   const stripe = useStripe();
//   const elements = useElements();
//   const [cardError, setCardError] = useState<string>("");
//   const [clientSecret, setClientSecret] = useState<string>("");
//   const [processing, setProcessing] = useState<boolean>(false);
//   const [tId, setTId] = useState<string>("");

//   useEffect(() => {
//     fetch(
//       "https://infinite-mart-server.vercel.app/api/v1/purchase/create-payment-intent",
//       {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify({ price: totalCost + 50 }),
//       }
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setClientSecret(data.clientSecret);
//       });
//   }, [totalCost]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }
//     const card = elements.getElement(CardElement);
//     if (card === null) {
//       return;
//     }
//     const { error } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });
//     if (error) {
//       setCardError(error.message as string);
//     } else {
//       setCardError("");
//     }
//     setProcessing(true);

//     const { paymentIntent, error: payError } = await stripe.confirmCardPayment(
//       clientSecret,
//       {
//         payment_method: {
//           card: card,
//           billing_details: {
//             email: email?.toString() || "No Email",
//             name: name || "No Name",
//           },
//         },
//       }
//     );

//     if (payError) {
//       console.log(payError);
//       setProcessing(false);
//       return;
//     }
//     if (paymentIntent?.status === "succeeded") {
//       setTId(paymentIntent.id);
//       toast.success("transaction completed");
//       const updatedProducts = selectedProduct?.map((product: TProduct) => {
//         return {
//           ...product,
//           cartId: product._id,
//           address: userAddress,
//           date: new Date(),
//         };
//       });
//       const payment = {
//         products: updatedProducts,
//       };
//       purchaseProduct(payment);
//     }
//     setProcessing(false);
//   };

//   return (
//     <div>
//       <form className="w-full" onSubmit={handleSubmit}>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#424770",
//                 "::placeholder": {
//                   color: "#aab7c4",
//                 },
//               },
//               invalid: {
//                 color: "#9e2146",
//               },
//             },
//           }}
//         />
//         <button
//           disabled={
//             !stripe || !clientSecret || processing || selectedProduct.length < 1
//           }
//           className="btn btn-success mt-4 w-full"
//           type="submit"
//         >
//           Place Order
//         </button>
//       </form>
//       {cardError && <p className="text-red-600 pt-6">{cardError}</p>}
//       {tId && <p>Transaction completed</p>}
//     </div>
//   );
// };

// export default PayOut;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import "./CheckOutForm.css";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { TProduct } from "../../types/product.type";
import { toast } from "sonner";
import { usePurchaseProductMutation } from "../../redux/features/purchase/purchase.api";
import { Link } from "react-router-dom";
import {
  IoCheckmarkCircle,
  IoAlertCircleOutline,
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { RiVisaLine, RiMastercardLine } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa6";

interface PayOutProps {
  selectedProduct: any;
  totalCost: number;
  userAddress: {
    phone: string;
    city: string;
    province: string;
    street: string;
  };
}

const PayOut: React.FC<PayOutProps> = ({
  selectedProduct,
  totalCost,
  userAddress,
}) => {
  const [purchaseProduct] = usePurchaseProductMutation();
  const { email, name } = useAppSelector(useCurrentUser);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [tId, setTId] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");
  const [stripeError, setStripeError] = useState<string>("");

  useEffect(() => {
    if (!stripe) {
      setStripeError(
        "Card payments are temporarily unavailable. Please refresh or contact support.",
      );
      return;
    }

    setStripeError("");

    if (totalCost >= 0) {
      fetch(
        "https://infinite-mart-server.vercel.app/api/v1/purchase/create-payment-intent",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ price: totalCost + 50 }),
        },
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        })
        .catch((err) => {
          console.error("Failed to create payment intent", err);
        });
    }
  }, [stripe, totalCost]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Address validation
    if (
      !userAddress.phone ||
      !userAddress.city ||
      !userAddress.province ||
      !userAddress.street
    ) {
      setAddressError(
        "Please provide your full delivery address in your profile before placing the order.",
      );
      return;
    } else {
      setAddressError("");
    }

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message as string);
    } else {
      setCardError("");
    }
    setProcessing(true);

    const { paymentIntent, error: payError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: email?.toString() || "No Email",
            name: name || "No Name",
          },
        },
      },
    );

    if (payError) {
      setCardError(payError.message || "Payment authorization failed");
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setTId(paymentIntent.id);
      toast.success("Payment completed successfully!");
      const updatedProducts = selectedProduct?.map((product: TProduct) => {
        return {
          ...product,
          cartId: product._id,
          address: userAddress,
          date: new Date(),
        };
      });
      const payment = {
        products: updatedProducts,
      };
      purchaseProduct(payment);
    }
    setProcessing(false);
  };

  if (tId) {
    return (
      <div className="p-6 text-center bg-emerald-50/70 border border-emerald-200 rounded-2xl animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs">
          <IoCheckmarkCircle className="text-4xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          Payment Successful!
        </h3>
        <p className="text-xs text-gray-600 mb-3">
          Your order has been placed and is being prepared for dispatch.
        </p>
        <div className="bg-white p-3 rounded-xl border border-emerald-100 mb-5">
          <span className="text-[11px] text-gray-400 font-medium block uppercase tracking-wider">
            Transaction Reference
          </span>
          <span className="text-xs font-mono font-bold text-gray-800 break-all select-all">
            {tId}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-primary hover:bg-[#724158] text-white font-semibold text-xs transition-all shadow-sm"
          >
            Back to Home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-xs transition-all"
          >
            Explore More Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <FaCreditCard className="text-primary text-base" />
          <span className="text-xs sm:text-sm font-bold text-gray-800">
            Credit or Debit Card
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <RiVisaLine className="text-2xl text-blue-800" />
          <RiMastercardLine className="text-2xl text-orange-600" />
        </div>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        {stripeError ? (
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            <IoAlertCircleOutline className="text-base shrink-0 mt-0.5" />
            <span>{stripeError}</span>
          </div>
        ) : (
          <div className="relative">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "15px",
                    color: "#1e293b",
                    fontFamily: "inherit",
                    "::placeholder": {
                      color: "#94a3b8",
                    },
                  },
                  invalid: {
                    color: "#e11d48",
                  },
                },
              }}
            />
          </div>
        )}

        {/* Address Validation Warning */}
        {addressError && (
          <div className="flex items-start gap-2 p-3 mt-2 bg-rose-50 border border-rose-200/80 rounded-xl text-xs text-rose-700">
            <IoAlertCircleOutline className="text-base shrink-0 mt-0.5" />
            <div className="flex-1">
              <span>{addressError}</span>
              <Link
                to="/user/manage-profile"
                className="block mt-1 font-bold underline text-rose-800 hover:text-rose-900"
              >
                Update Billing Address Now →
              </Link>
            </div>
          </div>
        )}

        {/* Card Error Banner */}
        {cardError && (
          <div className="flex items-center gap-2 p-3 mt-2 bg-rose-50 border border-rose-200/80 rounded-xl text-xs text-rose-700">
            <IoAlertCircleOutline className="text-base shrink-0" />
            <span>{cardError}</span>
          </div>
        )}

        {/* Submit Payment Button */}
        <button
          disabled={
            !stripe ||
            !!stripeError ||
            !clientSecret ||
            processing ||
            !selectedProduct ||
            selectedProduct.length < 1
          }
          className="w-full mt-4 py-3 px-4 rounded-xl bg-primary hover:bg-[#724158] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none"
          type="submit"
        >
          {processing ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <IoLockClosedOutline className="text-base" />
              <span>Pay ${(totalCost + 50).toFixed(2)}</span>
            </>
          )}
        </button>

        {/* Security badges */}
        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-gray-400">
          <IoShieldCheckmarkOutline className="text-emerald-600 text-sm" />
          <span>Encrypted with 256-bit SSL via Stripe</span>
        </div>
      </form>
    </div>
  );
};

export default PayOut;
