"use client";

import { Products } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PriceFormat } from "@/Utils/PriceFormat";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
type productsProps = {
  products: Products[];
};

const ManageProductsClient = ({ products }: productsProps) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  let rows: any = [];
  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: PriceFormat(product.price),
        image: product.images,
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
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
      field: "name",
      headerName: "Name",
      width: 220,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
    },
    {
      field: "inStock",
      headerName: "In Stock",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="">
            {params.row.inStock ? (
              <Status
                text="in stock"
                bg="bg-teal-200"
                color="text-teal-700"
                icon={MdDone}
              />
            ) : (
              <Status
                text="out of stock"
                bg="bg-rose-200"
                color="text-rose-700"
                icon={MdClose}
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,

      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              onClick={() =>
                handleToggleStock(params.row.id, params.row.inStock)
              }
              icon={MdCached}
            />

            <ActionBtn
              onClick={() => handleDelete(params.row.id, params.row.image)}
              icon={MdDelete}
            />
            <ActionBtn
              onClick={() => router.push(`product/${params.row.id}`)}
              icon={MdRemoveRedEye}
            />
          </div>
        );
      },
    },
  ];
  const handleToggleStock = useCallback((id: string, inStock: Boolean) => {
    axios
      .put("/api/product", {
        id: id,
        inStock: !inStock,
      })
      .then(() => {
        toast.success("Stock updated successfully");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Error updating");
        console.error(error);
      });
  }, []);
  const handleDelete = useCallback(async (id: string, images: any[]) => {
    toast("Deleteing Product, please Wait...");
    const handleDeleteProduct = async () => {
      try {
        for (const items of images) {
          if (items.image) {
            const imageRef = ref(storage, items.image);
            await deleteObject(imageRef);
            console.log("image Deleted successfully", items.image);
          }
        }
      } catch (error) {
        toast.error("Error deleting");
        console.error(error);
      }
    };

    await handleDeleteProduct();

    await axios
      .delete(`/api/product/${id}`)
      .then(() => {
        toast.success("Product deleted successfully");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Error deleting");
        console.error(error);
      });
  }, []);
  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Products" center />
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

export default ManageProductsClient;
