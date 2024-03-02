"use client";

import { Order, Products, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { PriceFormat } from "@/Utils/PriceFormat";
import { NumberFormat } from "@/Utils/formatNumber";

type SummaryProps = {
  users: User[];
  products: Products[];
  orders: Order[];
};
type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};
const Summary = ({ users, products, orders }: SummaryProps) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total sale",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    paidOrder: {
      label: "Total paid Orders",
      digit: 0,
    },
    unpaidOrder: {
      label: "Total unpaid Orders",
      digit: 0,
    },
    totalOrder: {
      label: "Total Orders",
      digit: 0,
    },
  });
  useEffect(() => {
    setSummaryData((prev: any) => {
      let prevData = { ...prev };
      const totalSale = orders.reduce((acc, item) => {
        if (item.status === "completed") {
          return acc + item.amount;
        } else {
          return acc;
        }
      }, 0);
      const paidOrder = orders.filter(
        (orders) => orders.status === "completed"
      );
      const unPaidOrder = orders.filter(
        (orders) => orders.status === "pending"
      );
      prevData.sale.digit = totalSale;
      prevData.paidOrder.digit = paidOrder.length;
      prevData.unpaidOrder.digit = unPaidOrder.length;
      prevData.totalOrder.digit = orders.length;
      prevData.products.digit = products.length;
      prevData.users.digit = users.length;
      return prevData;
    });
  }, [products, users, orders]);
  const summaryKeys = Object.keys(summaryData);
  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="Status" center />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div
                key={key}
                className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
              >
                  <div className=" font-extrabold text-2xl">
                  {summaryData[key].label === "Total sale" ? (
                    <>{PriceFormat(summaryData[key].digit/100)}</>
                  ) : (
                    <>{NumberFormat(summaryData[key].digit)}</>
                  )}
                  </div>
                <div className="mb-2 ">
                  {summaryData[key].label}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Summary;
