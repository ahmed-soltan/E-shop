"use client";
import { useCart } from "@/hook/useCart";
import { Elements } from "@stripe/react-stripe-js";
import {
  StripeAddressElement,
  StripeElement,
  StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  console.log("clientSecret: ", clientSecret);
  console.log("paymentIntent", paymentIntent);
  const router = useRouter();
  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(false);
      
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_intent_id: paymentIntent || null,
          items: cartProducts,
        }),
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 401) {
          return router.push("/login");
        }
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (!data || !data.paymentIntent || !data.paymentIntent.client_secret) {
          throw new Error("Invalid response data");
        }
        setClientSecret(data.paymentIntent.client_secret);
        handleSetPaymentIntent(data.paymentIntent.id);
        setLoading(false);
        console.log(data.error)
      })
      .catch((err) => {
        setError(true);
        console.error("Error fetching data:", err);
        toast.error("Something went wrong while fetching data");
      });
    }
  }, []);
  
  

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };
  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);
  return (
    <div>
      {" "}
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm handleSetPaymentSuccess={handleSetPaymentSuccess}  clientSecret={clientSecret}/>
        </Elements>
      )}
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-rose-500">something went wrong...</div>}
      {paymentSuccess && <div className="flex items-center flex-col">
            <div className="text-center text-teal-500 my-5">
                Payment Success
            </div>
            <div className="max-w-[220px] w-full">
                <Button label="View Your Order" onClick={()=>router.push('/orders')}/>
            </div>
        </div>}
    </div>
  );
};

export default CheckoutClient;
