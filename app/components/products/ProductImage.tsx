import {
  ProductCartType,
  SelectedImageType,
} from "@/app/product/[id]/ProductDetails";
import Image from "next/image";

type ProductImage = {
  cartProduct: ProductCartType;
  product: any;
  handleColorSelect: (value: SelectedImageType) => void;
};
const ProductImage = ({
  cartProduct,
  product,
  handleColorSelect,
}: ProductImage) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] ">
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer h-full border max-h-[500px] min-h-[300px] sm:min-h-[400px] ">
        {product.images.map((image: SelectedImageType) => {
          return (
            <div
              className={`w-[80%] relative aspect-square rounded border-teal-300 ${
                cartProduct.selectedImage.color === image.color
                  ? "border-[1.5px]"
                  : "border-none"
              }`}
              onClick={() => handleColorSelect(image)}
              key={image.color}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
      <div className="col-span-5 aspect-square relative">
        <Image src={cartProduct.selectedImage.image} alt="image" fill className="object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"/>
      </div>
    </div>
  );
};

export default ProductImage;
