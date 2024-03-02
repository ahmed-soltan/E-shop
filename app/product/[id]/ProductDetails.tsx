"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hook/useCart";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

export type ProductCartType = {
  id: string;
  name: string;
  price: number;
  selectedImage: SelectedImageType;
  description: string;
  quantity: number;
  brand: string;
  category: string;
  inStock: boolean;
  added: boolean;
};

export type SelectedImageType = {
  Color: string;
  image: string;
  colorCode: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails = ({ product }: any) => {
  const [isInCart, setIsInCart] = useState(false);
  const {  handleAddToCartProduct, cartProducts } = useCart();
  const router = useRouter();
  useEffect(() => {
    if (cartProducts) {
      const existProduct = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existProduct > -1) {
        setIsInCart(true);
      }
    }
  }, [cartProducts]);

  const [CartProduct, setCartProduct] = useState<ProductCartType>({
    id: product.id,
    name: product.name,
    price: product.price,
    selectedImage: { ...product.images[0] },
    description: product.description,
    quantity: 1,
    brand: product.brand,
    category: product.category,
    inStock: product.inStock,
    added: false,
  });
  const handleColor = useCallback(
    (value: SelectedImageType) => {
      setCartProduct((prev) => {
        return {
          ...prev,
          selectedImage: value,
        };
      });
    },
    [CartProduct.selectedImage]
  );

  const productRating =
    product.reviews &&
    product.reviews.reduce((acc: any, item: any) => acc + item.rating, 0) /
      product.reviews.length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={CartProduct}
        product={product}
        handleColorSelect={handleColor}
      />
      <div className="gap-2 flex flex-col text-slate-500">
        <h2 className="text-slate-700 text-3xl font-medium">{product.name}</h2>
        <div className="gap-2 flex items-center">
          <Rating value={productRating} readOnly />
          <div>
            <span className="text-slate-700 font-medium">
              {product.reviews && product.reviews.length} Reviews
            </span>
          </div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY : </span>
          {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND : </span>
          {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Horizontal />
        {isInCart ? (
          <>
            <p className="flex mt-2 items-center gap-1">
              <MdCheckCircle size={24} className="text-teal-400" />
              <span>Product Added To the Cart</span>
            </p>
            <div className="max-w-[300px] mt-2">
              <Button
                onClick={() => router.push("/cart")}
                label={"View Cart"}
                outlined
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              images={product.images}
              cart={CartProduct}
              handleColorSelect={handleColor}
            />
            <Horizontal />
            <SetQuantity
              //   cartCounter={CartProduct.quantity}
              cartProduct={CartProduct}
              handleQuantityIncrease={() => {
                if (CartProduct.quantity === 99) {
                  return;
                }
                setCartProduct((prev) => {
                  return {
                    ...prev,
                    quantity: prev.quantity + 1,
                  };
                });
              }}
              handleQuantityDecrease={() => {
                if (CartProduct.quantity < 2) {
                  return;
                }
                setCartProduct((prev) => {
                  return {
                    ...prev,
                    quantity: prev.quantity - 1,
                  };
                });
              }}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                disabled={!CartProduct.inStock || CartProduct.quantity === 0 || isInCart}
                label={`ADD TO CART `}
                onClick={() => handleAddToCartProduct(CartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
