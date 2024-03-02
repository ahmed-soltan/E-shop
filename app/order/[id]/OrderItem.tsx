import { PriceFormat } from "@/Utils/PriceFormat";
import { ProductCartType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type Orderitem = {
  product: ProductCartType;
};
const OrderItem = ({ product }: Orderitem) => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5] border-slate-400 py-4 items-center">
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
      </div>
      <div className=" flex justify-self-center gap-2 md:gap-4">
        {PriceFormat(product.price)}
      </div>
      <div className=" flex justify-self-center gap-2 md:gap-4">
        {product.quantity}
      </div>
      <div className=" flex justify-self-end gap-2 md:gap-4 font-semibold">
        {PriceFormat(product.price * product.quantity)}
      </div>
    </div>
  );
};

export default OrderItem;
