"use client";
import React from "react";
import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";
import { CiTrash } from "react-icons/ci";
import { MdEditDocument } from "react-icons/md";
import AdminListCard from "../list-card";
import Table from "../table";
const ProductList = () => {
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

    columnHelper.accessor((row) => row.logo, {
      id: "logo",
      cell: (info) => {
        console.log(info.row.original.name);
        return (
          <div className="h-16 max-w-20 mx-auto ">
            <Image
              src={info.getValue().path}
              alt={`${info.row.original.name}-logo`}
              width={100}
              height={100}
              className="object-contain h-full w-full "
            />
          </div>
        );
      },
      header: () => <span>Logo</span>,
    }),

    columnHelper.accessor((row) => row.description, {
      id: "description",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Description</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor((row) => row.created_at, {
      id: "created_at",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Created At</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor((row) => row, {
      id: "_",
      cell: (info) => (
        <div className="flex gap-2 justify-center">
          <CiTrash
            title="Delete"
            className="text-red-500 text-[20px] cursor-pointer"
          />
          <MdEditDocument
            title="Edit"
            className="text-blue-500 text-[20px] cursor-pointer"
          />
        </div>
      ),
      header: () => <span>Actions</span>,
    }),
    columnHelper.accessor((row) => row.updated_at, {
      id: "updated_at",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Updated At</span>,
      footer: (info) => info.column.id,
    }),
  ];

  return (
    <AdminListCard>
      <h4 className="text-[18px] font-semibold text-black-500">
        Products list
      </h4>
      <Table data={defaultData} columns={columns} />
    </AdminListCard>
  );
};
export default ProductList;
