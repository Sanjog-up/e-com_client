"use client";
import Input from "@/components/common/ui/input";
import { useForm, useController  } from "react-hook-form";
import { useEffect, useRef } from "react";
import AdminListCard from "@/components/forms/admin/list-card";
import Button from "@/components/common/ui/button";
import ImageInput from "@/components/common/ui/image-input";
import { productsSchema, TProductInput } from "@/schema/products.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { getAllCategories } from "@/api/category.api";
import { getAllBrands } from "@/api/brand.api";
import api from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Select from "@/components/common/ui/select";

interface ProductFormProps {
  defaultValues?: Partial <TProductInput> | null;
  productId?: string;
}

const ProductForm = ({ defaultValues, productId}: ProductFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(productId);

  const { data: categories} = useQuery({queryFn:getAllCategories,
    queryKey:["get-all-categories"]
  })
  const { data: brands } = useQuery({queryFn: getAllBrands, queryKey:["get-all-brands"]})

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    control,
  } = useForm<TProductInput>({
    resolver: yupResolver(productsSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      price: defaultValues?.price ?? undefined,
      stock: defaultValues?.stock ?? undefined,
      category: defaultValues?.category ?? "",
      brand: defaultValues?.brand ?? "",
      cover_image: defaultValues?.cover_image ?? undefined,
      images: defaultValues?.images ?? [],
      new_arrival: defaultValues?.new_arrival ?? false,
      featured: defaultValues?.featured ?? false,
    },
  });
  const resetOnce = useRef(false);
useEffect(()=> {
  if(defaultValues && !resetOnce.current){
    reset({
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      price: defaultValues?.price ?? undefined,
      stock: defaultValues?.stock ?? undefined,
      category: defaultValues?.category ?? "",
      brand: defaultValues?.brand ?? "",
      cover_image: defaultValues?.cover_image ?? undefined,
      images: defaultValues?.images ?? [],
      new_arrival: defaultValues?.new_arrival ?? false,
      featured: defaultValues?.featured ?? false,
    });
    resetOnce.current = true;
  }
},[defaultValues, resetOnce])

  const { field: coverField, fieldState: coverState } = useController({ name: "cover_image", control });
  
  const mutation = useMutation({
    mutationFn: async (formData: FormData)=> {
      if(isEditMode)return api.patch(`/products/${productId}`, formData);
      return api.post("/products", formData);
    },
    onSuccess:()=> {
      queryClient.invalidateQueries({ queryKey: ["products"]});
      router.push("/admin/products");
    }
  })

  const onSubmit = (data: TProductInput) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("stock", String(data.stock));
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    formData.append("new_arrival", String(data.new_arrival ?? false));
    formData.append("featured", String(data.featured ?? false));


    if(data.cover_image instanceof File) formData.append("cover_image", data.cover_image);
    (data.images?? []).forEach((img)=> {
      if(img instanceof File) formData.append("images", img)
    });
  mutation.mutate(formData);
  }
  
  return (
    <AdminListCard>
      <div>
        <h4 className="text-[18px] font-semibold text-black/80 my-8">
          {isEditMode ? "Edit product" : "Product form"}
        </h4>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-120 mx-auto flex gap-4 flex-col border border-gray-200 px-4 py-10 rounded-md">
          <Input
            label="Name"
            name="name"
            type="text"
            id={"name"}
            placeholder="Caliber"
            register={register}
            required
            error={errors.name?.message}
          />
          <Input
        label='Descrption'
        name='description'
        type='text'
        id={'description'}
        placeholder='Describe your brand [at least 25 chars]'
        register={register}
        required
        multiline={true}
        error={errors.description?.message}
        
        />

          <Input
            label="Price"
            name="price"
            type="number"
            id={"price"}
            placeholder="0.00"
            error={errors.price?.message}
            register={register}
            required
          />

          <Input
          label="Stock"
          name="stock"
          type="number"
          id="stock"
          placeholder="0"
          register={register}
          error={errors.stock?.message}
          />

          <Select label="Category"
          name="category"
          id="category"
          register={register}
          error={errors.category?.message}
          required
          options={(categories?.data ?? []).map((c:any)=> ({
            label: c.name, value: c._id
          }))}/>

          <Select label="brand"
          name="brand"
          id="brand"
          register={register}
          error={errors.brand?.message}
          required
          options={(brands?.data??[]).map((b:any)=> ({label: b.name, value: b._id}))}
          />

          <ImageInput 
          label="Cover image" id="products_cover"
          value={coverField.value}
          onChange={coverField.onChange}
          error={coverState.error?.message}
          required={!isEditMode}
          />

          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("new_arrival")}/>New Arrival
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("featured")}/>Featured
          </label>

          <div>
            <Button label={mutation.isPending ? "Saving..." : "Submit"} type="submit" 
            isLoading={mutation.isPending}/>
          </div>
        </form>
      </div>
    </AdminListCard>
  );
};
export default ProductForm;
