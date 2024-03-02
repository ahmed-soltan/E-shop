import { PriceFormat } from "@/Utils/PriceFormat"
import { useCart } from "@/hook/useCart"
import { AddressElement, CardElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import {  redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Heading from "../components/Heading"
import Button from "../components/Button"

 
 type CheckOutProps={
     handleSetPaymentSuccess : (value:boolean)=>void,
     clientSecret:string,
 }
const CheckoutForm = ({
    handleSetPaymentSuccess,
    clientSecret,
}:CheckOutProps) => {
    const {cartAmountTotal , ClearCart , handleSetPaymentIntent} = useCart()
    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const formatPrice = PriceFormat(cartAmountTotal)

    useEffect(()=>{
        if(!stripe){
            return
        }
        if(!clientSecret){
            return
        }
        handleSetPaymentSuccess(false)
    },[
        stripe
    ])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(!stripe || !elements){
            return
        }
        setLoading(true)
         await stripe.confirmPayment({
            elements,
            redirect:"if_required"
          }).then((result)=>{
            if(!result?.error)
            {
                handleSetPaymentSuccess(true)
                handleSetPaymentIntent(null)
                ClearCart()
            }
            setLoading(false)
          })
      
    }

  return (
    <form onSubmit={handleSubmit} id="payment-form">
        <div className="mb-6">
            <Heading title="Enter Your Detials to Complete The Checkout"/>
        </div>

        <h2 className="mb-2 font-semibold">
            Address Information
        </h2>
        <AddressElement options={
            {mode:"shipping" , allowedCountries:['US', 'EG' , 'UK', 'KE']}
        }/>
        <h2 className="mt-4 mb-2 font-semibold">
            Payment Information
        </h2>

        <PaymentElement id="payment-element" options={{
            layout:"tabs"
        }}/>

        <div className="py-4 text-center text-slate-700 text-2xl font-bold">
            Total: {formatPrice}
        </div>

        <Button label={loading ? "Processing" : "Pay Now"} disabled={loading || !stripe || !elements} onClick={()=>{}}/>
    </form>
  )
}

export default CheckoutForm