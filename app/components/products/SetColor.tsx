import {
  ProductCartType,
  SelectedImageType,
} from "@/app/product/[id]/ProductDetails";
import React from "react";

type SetColorType = {
  images: SelectedImageType[];
  cart: ProductCartType;
  handleColorSelect: (value: SelectedImageType) => void;
};

const SetColor = ({ images, cart, handleColorSelect }: SetColorType) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">COLORS : </span>
        <div className="flex gap-1">
          {images.map((image) => {
            return (
              <div
              key={image.color}
              onClick={()=>handleColorSelect(image)}
                className={`w-7 h-7 rounded-full border-teal-500 flex items-center justify-center ${
                  cart.selectedImage.color === image.color
                    ? "border-[1.5px]"
                    : "border-none"
                }`}
              >
                <div style={{background:`${image.colorCode}`}} className="w-5 h-5 rounded-full border-slate-200 cursor-pointer"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
