"use client";

import { PriceFormat } from "@/Utils/PriceFormat";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

type OrderDetailsProps = {
  order: Order;
};
const OrderDetails = ({ order }: OrderDetailsProps) => {
  const router = useRouter();
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>
      <div>OrderID : {order.id}</div>
      <div>Order Date : {moment(order.createdAt).fromNow()}</div>
      <div>
        Total :{" "}
        <span className="font-bold">{PriceFormat(order.amount / 100)}</span>
      </div>
      <div className="flex items-center justify-start gap-2">
        Status :{"    "}
        {order.status === "pending" ? (
          <Status
            text="Pending"
            bg="bg-slate-200"
            color="text-slate-700"
            icon={MdAccessTimeFilled}
          />
        ) : order.status === "compelete" ? (
          <Status
            text="Dispatched"
            bg="bg-Purble-200"
            color="text-Purble-700"
            icon={MdDone}
          />
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex items-center justify-start gap-2">
        Deliverey Status :{" "}
        {order.deliveryStatus === "pending" ? (
          <Status
            text="Pending"
            bg="bg-slate-200"
            color="text-slate-700"
            icon={MdAccessTimeFilled}
          />
        ) : order.deliveryStatus === "dispatched" ? (
          <Status
            text="Dispatched"
            bg="bg-purple-200"
            color="text-purple-700"
            icon={MdDeliveryDining}
          />
        ) : order.deliveryStatus === "delivered" ? (
          <Status
            text="Delivered"
            bg="bg-green-200"
            color="text-green-700"
            icon={MdDeliveryDining}
          />
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Products Ordered</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCTS</div>
          <div className="justify-self-center">PRICE</div>
          <div className="justify-self-center">QTY</div>
          <div className="justify-self-end">TOTAL</div>
        </div>
        {order.products.map(product=>{
          return <>
            <OrderItem key={product.id} product={product}/>
           </>
        })}
      </div>
    </div>
  );
};

export default OrderDetails;
