import { PriceFormat } from "@/Utils/PriceFormat";
import { CutString } from "@/Utils/stringCut";
import { Paper, Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type dataProps = {
  data: any;
};

const ProductCard = ({ data }: dataProps) => {
  const productRating =
    data.reviews &&
    data.reviews.reduce((acc: any, item: any) => acc + item.rating, 0) /
      data.reviews.length;
  return (
    <div
      className="col-span-1 
    cursor-pointer border-[1.2px]
     border-slate-200 bg-slate-50
      rounded-sm p-2 transition
       hover:scale-105 text-center
        text-sm "
    >
      <div className="flex items-center gap-1 flex-col w-full">
        <div className="aspect-square overflow-hidden w-full relative">
        <Link href={`/product/${data.id}`}>
          <Image
            src={data.images[0].image}
            alt="hello"
            fill
            className="w-full h-full object-contain"
          />
        </Link>
        </div>
        <div className="mt-4">{CutString(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews && data.reviews.length} Reviews</div>
        <div className="font-semibold">{PriceFormat(data.price)}</div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
