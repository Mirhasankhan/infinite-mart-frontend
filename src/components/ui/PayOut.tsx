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

interface PayOutProps {
  selectedProduct: TProduct[];
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

  useEffect(() => {
    fetch(
      "https://infinite-mart-server.vercel.app/api/v1/purchase/create-payment-intent",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ price: totalCost + 50 }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [totalCost]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Address validation
    if (
      !userAddress.phone ||
      !userAddress.city ||
      !userAddress.province ||
      !userAddress.street
    ) {
      setAddressError("Please provide your full billing address.");
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
      }
    );

    if (payError) {
      console.log(payError);
      setProcessing(false);
      return;
    }
    if (paymentIntent?.status === "succeeded") {
      setTId(paymentIntent.id);
      toast.success("Transaction completed");
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

  return (
    <div>
      <form className="w-full" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          disabled={
            !stripe || !clientSecret || processing || selectedProduct.length < 1
          }
          className="btn btn-success mt-4 w-full"
          type="submit"
        >
          Place Order
        </button>
      </form>
      {cardError && <p className="text-red-600 pt-6">{cardError}</p>}
      {addressError && <p className="text-red-600 pt-6">{addressError}</p>}
      {tId && <p>Transaction completed</p>}
    </div>
  );
};

export default PayOut;
