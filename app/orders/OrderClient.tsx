"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PriceFormat } from "@/Utils/PriceFormat";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";

import { useRouter } from "next/navigation";

import moment from "moment";
type ordersProps = {
  orders: ExtendOrders[];
};
type ExtendOrders = Order & {
  user: User;
};
const OrdersClient = ({ orders }: ordersProps) => {
  const router = useRouter();
  let rows: any = [];
  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        status: order.status,
        amount: PriceFormat(order.amount / 100),
        date: moment(order.createdAt).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
        );
      },
    },
    {
      field: "status",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="">
            {params.row.status === "pending" ? (
              <Status
                text="Pending"
                bg="bg-slate-200"
                color="text-slate-700"
                icon={MdAccessTimeFilled}
              />
            ) : params.row.status === "compelete" ? (
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
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="">
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="Pending"
                bg="bg-slate-200"
                color="text-slate-700"
                icon={MdAccessTimeFilled}
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="Dispatched"
                bg="bg-purple-200"
                color="text-purple-700"
                icon={MdDeliveryDining}
              />
            ) : params.row.deliveryStatus === "delivered" ? (
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
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 100,

      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              onClick={() => router.push(`/order/${params.row.id}`)}
              icon={MdRemoveRedEye}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage orders" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default OrdersClient;
