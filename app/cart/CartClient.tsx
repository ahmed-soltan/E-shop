"use client";
import { useCart } from "@/hook/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { PriceFormat } from "@/Utils/PriceFormat";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

const CartClient = ({currentUser}:{currentUser:SafeUser}) => {
  const { cartProducts , ClearCart , cartAmountTotal , cartQtyTotal } = useCart();
  const router = useRouter()
  if (cartProducts?.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your Cart is Empty</div>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-3"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">product</div>
        <div className="justify-self-center">price</div>
        <div className="justify-self-center">quantity</div>
        <div className="justify-self-end">total</div>
      </div>
      <div>
        {cartProducts?.map((product) => {
          return (
            <ItemContent key={product.id} product={product}/>
          );
        })}
      </div>
      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button label="Clear Cart" onClick={() => ClearCart()} small outlined />
        </div>
        <div className="text-sm flex flex-col items-start gap-1">
          <div className="flex justify-between items-center w-full font-semibold text-base">
            <span>Sub Total</span>
            <span>{PriceFormat(cartAmountTotal)}</span>
          </div>
          <p className="text-slate-500">Taxes and Shipping Calculating in Checkout</p>
          <Button label={currentUser?"Checkout" :"Login To Checkout"} onClick={()=>{currentUser?router.push('/checkout'):router.push('/login')}}/>
          <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
