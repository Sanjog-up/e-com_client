"use client";
import Input from "@/components/common/ui/input";
import { useController, useForm } from "react-hook-form";
import AdminListCard from "../list-card";
import Button from "@/components/common/ui/button";
import ImageInput from "@/components/common/ui/image-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { brandSchema, TBrabdInput } from "@/schema/brand.schema";
import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "@/api";

interface BrandFormProps {
  defaultValues?: TBrabdInput;
  brandId?: string;
}

const BrandForm = ({ defaultValues, brandId }: BrandFormProps) => {

  const isEditMode = !!brandId;
  const router = useRouter();
  const queryClient = useQueryClient();



  const {
    register, 
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      logo: defaultValues?.logo ?? undefined,
    },
    resolver:yupResolver(brandSchema)
  });


  // useEffect(() => {
  //   if (defaultValues) {
  //     reset({
  //       name: defaultValues.name,
  //       description: defaultValues.description,
  //       logo: defaultValues.logo,
  //     });
  //   }
  // }, [defaultValues, reset]);


  useEffect(() => { 
    if(defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);
  
  const { field, fieldState } = useController({
    name: "logo",
    control,
  })

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (isEditMode) {
        return api.patch(`/brands/${brandId}`, formData);
      }
      return api.post("/brands", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      router.push("/admin/brands");
    },
  });

  const onSumbit = (data:TBrabdInput)=>{
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description ?? "");
    if (data.logo instanceof File) {
      formData.append("brand_logo", data.logo);
    }
    mutation.mutate(formData);
    console.log(data)
  }
  return (
    <AdminListCard>
      <div>
        <h4 className="text-[18px] font-semibold text-black/80 my-8">
          {isEditMode ? "Edit Brand" : "Brand Form"}
        </h4>

        <form onSubmit={handleSubmit(onSumbit)} className="max-w-120 mx-auto flex gap-4 flex-col border border-gray-200 px-4 py-10 rounded-md">
          <Input
            label="Name"
            name="name"
            type="text"
            id={"name"}
            error={errors?.name?.message}
            placeholder="Caliber"
            register={register}
            required
          />
          <Input
            label="Description"
            name="description"
            type="text"
            id={"description"}
            placeholder="Describe your brand [at least 25 chars]"
            register={register}
            error={errors?.description?.message}
            required
            multiline={true}
          />

          <ImageInput  label="logo" id="brand_logo"
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
          required={!isEditMode}
           />
          <div>
            <Button label={mutation.isPending ? "Saving.." : "Submit"} 
            type="submit" />
          </div>
        </form>
      </div>
    </AdminListCard>
  );
};
export default BrandForm;
