"use client";
import { PriceFormat } from "@/Utils/PriceFormat";
import { ProductCartType } from "../product/[id]/ProductDetails";
import Link from "next/link";
import { CutString } from "@/Utils/stringCut";
import Image from "next/image";
import Button from "../components/Button";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hook/useCart";

const ItemContent = ({ product }: { product: ProductCartType }) => {
  const { handleRemoverProductFromCart , handleQuantityIncrease , handleQuantityDecrease } = useCart();
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 flex justify-self-start gap-2 md:gap-4">
        <Link href={`/product/${product.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={product.selectedImage.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex justify-between flex-col">
          <Link href={`/product/${product.id}`}>
            <div>
              {CutString(product.name)}
              <div>{product.selectedImage.color}</div>
            </div>
          </Link>
          <div className="w-[70px]">
            <button
              className="underline text-slate-700"
              onClick={() => handleRemoverProductFromCart(product)}
            >
              remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{PriceFormat(product.price)}</div>
      <div className="justify-self-center font-semibold">
        <SetQuantity
          cartCounter={true}
          cartProduct={product}
          handleQuantityDecrease={() => handleQuantityDecrease(product)}
          handleQuantityIncrease={() => handleQuantityIncrease(product)}
        />
      </div>
      <div className="justify-self-end">
        {PriceFormat(product.price * product.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
