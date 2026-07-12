"use client";

import React from "react";
import AdminListCard from "../list-card";
import Table from "../table";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { getAllBrands } from "@/api/brand.api";
import { useQuery } from "@tanstack/react-query";
import ActionButtons from "@/components/common/ui/action-button";
import { toast } from "react-hot-toast";

const BrandList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getAllBrands,
    queryKey: ["get-all-brands"],
  });
  console.log(data, isLoading, isError, error);

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
    columnHelper.accessor((row) => row.image, {
      id: "image",
      cell: (info) => {
        console.log(info.row.original.name);
        return (
          <div className="h-16 max-w-20 mx-auto ">
            <Image
              src={info.getValue()?.path}
              alt={`${info.row.original.name}-logo`}
              width={100}
              height={100}
              className="object-contain h-full w-full"
            />
          </div>
        );
      },
      header: () => <span>Logo</span>,
    }),
    columnHelper.accessor((row) => row.description, {
      id: "description",
      cell: (info) => (
        <div className="max-w-60 mx-auto text-start text-ellipsis line-clamp-3 text-wrap">
          <i>{info.getValue()}</i>
        </div>
      ),
      header: () => <span>Description</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdAt, {
      id: "createdAt",
      cell: (info) => (
        <b>
          {new Date(info.getValue()).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </b>
      ),
      header: () => <span>Created At</span>,
    }),

    columnHelper.accessor((row) => row, {
      id: "_",
      cell: (info) => (
        <ActionButtons
          editLink={`/admin/brands/edit/${info.row.original._id}`}
          onDelete={() => {
            toast.success(`brand:${info.row.original.name} deleted`);
          }}
        />
      ),
      header: () => <span>Actions</span>,
    }),
  ];

  return (
    <AdminListCard>
      <h4 className="text-[18px] font-semibold text-black-500">Brand Lists</h4>

      {/* table */}
      <div className="w-full h-full rounded-sm">
        <Table data={data?.data ?? []} columns={columns} />
      </div>
    </AdminListCard>
  );
};

export default BrandList;
