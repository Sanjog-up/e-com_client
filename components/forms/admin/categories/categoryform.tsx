"use client";
import Input from "@/components/common/ui/input";
import React, { useEffect } from "react";
import { useForm, useController } from "react-hook-form";
import AdminListCard from "@/components/forms/admin/list-card";
import Button from "@/components/common/ui/button";
import ImageInput from "@/components/common/ui/image-input";
import { categorySchema, TCategoryInput  } from "@/schema/category.scgema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import api from "@/api";

interface CategoryFormProps {
  defaultValues?: TCategoryInput & { image?: {path: string; public_id:string}};
  categoryId?: string;
}

const CategoryForm = ({ defaultValues,categoryId}: CategoryFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(categoryId);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<TCategoryInput>({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      image: defaultValues?.image?.path ?? undefined,
      category: defaultValues?.category ?? "",
    },
  });
  console.log(errors)

  // useEffect(()=> {
  //   if(defaultValues){
  //     reset({
  //       ...defaultValues,
  //     image: defaultValues.image?.path})
  //   }
  // }, [defaultValues, reset])

  useEffect(() => {
    if(defaultValues){
      reset (defaultValues)
    }
  } , [defaultValues, reset])

   const { field, fieldState } = useController({
    name: "image",
    control,
  })

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (isEditMode) {
        return api.patch(`/categories/${categoryId}`, formData);
      }
      return api.post("/categories", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      router.push("/admin/categories");
    },
  });


  const onSumbit = (data:TCategoryInput)=>{
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category ?? "");
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }
    mutation.mutate(formData);
    console.log(data)
  }

  return (
    <AdminListCard>
      <div>
        <h4 className="text-[18px] font-semibold text-black/80 my-8">
          {isEditMode ? "Edit Category" : "Category Form"}
        </h4>

        <form 
        onSubmit={handleSubmit(onSumbit)}
        noValidate
        className="max-w-120 mx-auto flex gap-4 flex-col border border-gray-200 px-4 py-10 rounded-md">
          <Input
            label="Name"
            name="name"
            type="text"
            id={"name"}
            placeholder="Caliber"
            register={register}
            error={errors.name?.message}
            required
          />

          <Input
            label="Category"
            name="category"
            type="text"
            id={"category"}
            placeholder="categorize your product"
            register={register}
            required
            error={errors.category?.message}
            multiline={false}
          />

          <ImageInput
          label="product" 
          id="products_category" 
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
          required={!isEditMode}/>
          <div>

            <Button 
            label={mutation.isPending ? "Saving..." : "Submit"}
            type="submit"
            isLoading= {mutation.isPending} />
          </div>
        </form>
      </div>
    </AdminListCard>
  );
};
export default CategoryForm;
