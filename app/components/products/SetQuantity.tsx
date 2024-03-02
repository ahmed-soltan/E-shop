"use client"
import { ProductCartType } from "@/app/product/[id]/ProductDetails"

type SetQuantityProps = {
    cartCounter?: boolean,
    cartProduct:ProductCartType,
    handleQuantityIncrease: ()=>void
    handleQuantityDecrease: ()=>void
}

const btnStyle = "border-slate-200 border-[1.2px] rounded px-2"

const SetQuantity = ({
    cartCounter,
    cartProduct,
    handleQuantityIncrease,
    handleQuantityDecrease,
}:SetQuantityProps) => {
  return (
    <div className="flex gap-8 items-center">
        {cartCounter ? null : <div className="font-semibold">
                  QUANTITY : 
            </div>}

            <div className="flex gap-4 items-center">
                <button onClick={handleQuantityDecrease} className={btnStyle}>-</button>
                <div>{cartProduct.quantity}</div>
                <button onClick={handleQuantityIncrease} className={btnStyle}>+</button>
            </div>
    </div>
  )
}

export default SetQuantity