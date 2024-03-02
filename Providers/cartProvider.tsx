"use client"

import { CartContextProvider } from "@/hook/useCart"

const CartProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <CartContextProvider>
        {children}
    </CartContextProvider>
  )
}

export default CartProvider