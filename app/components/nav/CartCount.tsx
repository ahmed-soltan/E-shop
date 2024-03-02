"use client";

import { useCart } from "@/hook/useCart";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";
const CartCount = () => {
  const router = useRouter();
  const { cartQtyTotal } = useCart();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push("/cart")}
    >
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span className="absolute top-[-10px] right-[-10px] bg-slate-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">
        {cartQtyTotal}
      </span>
    </div>
  );
};

export default CartCount;
