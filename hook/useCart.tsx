import { CutString } from "@/Utils/stringCut";
import { ProductCartType } from "@/app/product/[id]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type CartContextProps = {
    cartQtyTotal: number;
    cartProducts: ProductCartType[] | null;
    handleAddToCartProduct: (product: ProductCartType) => void;
    handleRemoverProductFromCart: (product: ProductCartType) => void;
    handleQuantityIncrease: (product: ProductCartType) => void;
    handleQuantityDecrease: (product: ProductCartType) => void;
    ClearCart: () => void;
    cartAmountTotal:number
    paymentIntent:string|null;
    handleSetPaymentIntent:(value:string|null)=>void
};

export const cartContext = createContext<CartContextProps | null>(null);

export const CartContextProvider = (props: any) => {
    const [cartQtyTotal, setCartQtyTotal] = useState(0);
    const [cartAmountTotal, setCartAmountTotal] = useState(0);
    const [cartProducts, setCartProducts] = useState<ProductCartType[] | null>(null);
    const [paymentIntent , setPaymentIntent] = useState<string | null>(null)



    useEffect(() => {
        const cartItems: any = localStorage.getItem("cartItems");
        const cProduct: ProductCartType[] | null = JSON.parse(cartItems);
        const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");
        const paymentIntent: string | null =JSON.parse(eShopPaymentIntent);
        
        setCartProducts(cProduct);
        setCartQtyTotal(cProduct ? cProduct.length : 0);
        setPaymentIntent(paymentIntent);
    }, []);

    const handleAddToCartProduct = useCallback((product: ProductCartType) => {
        setCartProducts((prev: ProductCartType[] | null) => {
            const updateCart = prev ? [...prev, product] : [product];
            if(cartProducts){

                toast.success(`${CutString(product.name)} added to cart`);
                localStorage.setItem("cartItems", JSON.stringify(updateCart));
                setCartQtyTotal(updateCart.length);
            }
            return updateCart;
        });
    }, [cartProducts]);
    
    const handleRemoverProductFromCart = useCallback((product:ProductCartType) =>{
        setCartProducts((prev: ProductCartType[] | null) => {
            const updateCart = prev? prev.filter((item: ProductCartType) => item.id!== product.id) : prev;
            if(cartProducts){

                toast.success(`${CutString(product.name)} removed from cart`);
                setCartProducts(updateCart)
                localStorage.setItem("cartItems", JSON.stringify(updateCart));
                setCartQtyTotal(updateCart?.length || 0);
            }
            return updateCart;
        });
    },[cartProducts])
       
    const handleQuantityIncrease = useCallback((product:ProductCartType)=>{
        let updateCart;
    
        if(product.quantity === 99){
            return toast.error("Maximum quantity Reached");
        }
        if (cartProducts) {
            updateCart=[...cartProducts];
            const existProduct = cartProducts.findIndex(
              (item) => item.id === product.id
            );
            if (existProduct > -1) {
                updateCart[existProduct].quantity = updateCart[existProduct].quantity + 1;
            }
            setCartProducts(updateCart)
            localStorage.setItem("cartItems", JSON.stringify(updateCart));
          }

    },[cartProducts])

    const handleQuantityDecrease = useCallback((product:ProductCartType)=>{
        let updateCart;
    
        if(product.quantity === 1){
            return;
        }
        if (cartProducts) {
            updateCart=[...cartProducts];
            const existProduct = cartProducts.findIndex(
              (item) => item.id === product.id
            );
            if (existProduct > -1) {
                updateCart[existProduct].quantity = updateCart[existProduct].quantity - 1;
            }
            setCartProducts(updateCart)
            localStorage.setItem("cartItems", JSON.stringify(updateCart));
          }

    },[cartProducts])

    const ClearCart = useCallback(()=>{
        setCartQtyTotal(0);
        setCartProducts([]);
        localStorage.setItem("cartItems" , JSON.stringify(null));
    },[cartProducts])

    const handleSetPaymentIntent =useCallback((value:string|null)=>{
        setPaymentIntent(value);
        localStorage.setItem("eShopPaymentIntent", JSON.stringify(value));
    },[])

    useEffect(()=>{
        const CartTotal = () =>{
            if(cartProducts){
                const {total , qty} = cartProducts.reduce((acc , item)=>{
                    return {
                        total: acc.total +( item.price * item.quantity),
                        qty: acc.qty + item.quantity
                    }
                },{
                    total: 0,
                    qty: 0
                })
                setCartQtyTotal(qty)
                setCartAmountTotal(total)
            }
        }
        CartTotal()
    },[cartProducts])
    const value = useMemo(() => ({
        cartQtyTotal,
        cartAmountTotal,
        cartProducts,
        handleAddToCartProduct,
        handleRemoverProductFromCart,
        handleQuantityIncrease,
        handleQuantityDecrease,
        ClearCart,
        handleSetPaymentIntent,
        paymentIntent
    }), [cartQtyTotal , cartAmountTotal, cartProducts, handleAddToCartProduct , handleRemoverProductFromCart , handleQuantityIncrease , handleQuantityDecrease , ClearCart , handleSetPaymentIntent]);

    return <cartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
    const context = useContext(cartContext);
    if (!context) throw new Error("useCart must be used within a CartContextProvider");
    return context;
};
