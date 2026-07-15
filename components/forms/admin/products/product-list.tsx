"use client";

import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";
import { CiTrash } from "react-icons/ci";
import { MdEditDocument } from "react-icons/md";
import AdminListCard from "../list-card";
import Table from "../table";
import ActionButtons from "@/components/common/ui/action-button";
import { getAllProducts } from "@/api/product.api";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import toast, { Toast } from "react-hot-toast";
import api from "@/api";

const ProductList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, } = useQuery({ queryFn: () => getAllProducts(), queryKey: ["products"]});

  const defaultData = [
    {
      name: "Product 1",
      description: "description product ",
      logo: {
        path: "/next.svg",
        public_id: "/next.svg",
      },
      created_at: "07-01-2026",
      updated_at: "07-01-2026",
    },
    {
      name: "Product 2",
      description: "description product ",
      logo: {
        path: "/next.svg",
        public_id: "/next.svg",
      },
      created_at: "07-01-2026",
      updated_at: "07-01-2026",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => (
        <strong>
          <i>{info.getValue()}</i>
        </strong>
      ),
      header: () => <span className="text-lg">Name</span>,
    }),

    columnHelper.accessor((row) => row.cover_image, {
      id: "cover_image",
      cell: (info) => <div className="h-16 w-16 rounded overflow-hidden shrink-0 mx-auto">
        <Image
        src={info.getValue() || "./public/images/next.svg"} 
        alt={info.row.original.name}
        width={100}
        height={100}
        className="object-contain h-full w-full"
        />
        </div>,
      header: () => <span>Image</span>,
    }),

    columnHelper.accessor((row) => row.price, {
      id: "price",
      cell: (info) => <b>Rs.{info.getValue()}</b>,
      header: () => <span>Price</span>,
    }),
    columnHelper.accessor((row) => row.stock, {
      id: "stcok",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>Stock</span>,
    }),

    columnHelper.accessor((row) => row, {
      id: "_",
      cell: (info) => (
        <ActionButtons
        editLink={`/admin/products/${info.row.original._id}`}
        onDelete={async() => {
          try {
            await api.delete(`/products/${info.row.original._id}`);
            queryClient.invalidateQueries({queryKey:["products"]})
            toast.success(`${info.row.original.name} deleted`)
          } catch {
            toast.error("Failed to delete product");
          }
        }}
        />
      ),
      header: () => <span>Actions</span>,
    }),
  ];

  return (
    <AdminListCard>
      <h4 className="text-[18px] font-semibold text-black-500">
        Products list
      </h4>
      <Table data={data?.data ?? []} columns={columns} isLoading = {isLoading}/>
    </AdminListCard>
  );
};
export default ProductList;