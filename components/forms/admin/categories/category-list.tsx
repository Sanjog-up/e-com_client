"use client";
import AdminListCard from "@/components/forms/admin/list-card";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Table from "../table";
import { getAllCategories } from "@/api/category.api";
import { useQuery } from "@tanstack/react-query";
import ActionButtons from "@/components/common/ui/action-button";
import { toast } from "react-hot-toast";

const CategoryList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getAllCategories,
    queryKey: ["get-all-categories"],
  });
  console.log(data, isLoading, isError, error);
  console.log(data?.data?.[0]);

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
    columnHelper.accessor((row) => row.image, {
      id: "image",
      cell: (info) => {
        console.log(info.row.original.name);
        return (
          <div className="h-16 w-16 rounded overflow-hidden shrink-0 mx-auto ">
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
      header: () => <span>Image</span>,
    }),

    columnHelper.accessor((row) => row.description,{
      id:"description",
      cell:(info) => <div className="max-w-80 mx-auto text-start text-ellipsis line-clamp-3 text-wrap">
        <i>{info.getValue()}</i>
        </div>,
      header: () => <span>Description</span>,
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
          })}
        </b>
      ),
      header: () => <span>Created At</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor((row) => row, {
      id: "_",
      cell: (info) => (
        <ActionButtons
          editLink={`/admin/categories/edit/${info.row.original._id}`}
          onDelete={() => {
            toast.success(`category:${info.row.original.name} deleted`);
          }}
        />
      ),
      header: () => <span>Actions</span>,
    }),
  ];

  return (
    <AdminListCard>
      <h4 className="text-[18px]  font-semibold text-black-500">
        Category list
      </h4>
      <div className="w-full h-full rounded-sm">
        <Table data={data?.data ?? []} columns={columns} />
      </div>
    </AdminListCard>
  );
};

export default CategoryList;
