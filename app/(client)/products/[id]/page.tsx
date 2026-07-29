"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/product.api";
import { TProduct } from "@/types/product.types";
import Image from "next/image";
import Link from "next/link";
import { useAddToCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { MdOutlineCloudOff } from "react-icons/md";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

  const product: TProduct | undefined = data?.data;
  const addToCart = useAddToCart();

  const handleAddToCart = () => {
    if (!product) return;
    addToCart.mutate(
      { productId: product._id, quantity: 1 },
      {
        onSuccess: () => toast.success("Added to cart"),
        onError: (err: any) =>
          toast.error(err?.message || "Could not add to cart"),
      }
    );
  };

  if (isLoading) {
    return (
      <main className="min-h-[80vh] bg-blue-100 px-4 sm:px-8 lg:px-16 xl:px-24 py-10">
        <div className="animate-pulse grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-200 rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="h-10 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="min-h-[80vh] bg-blue-100 flex flex-col items-center justify-center py-20">
        <MdOutlineCloudOff className="text-indigo-300" size={48} />
        <p className="text-gray-600 font-medium mt-3">Product not found</p>
        <Link href="/products" className="mt-4 text-indigo-600 hover:underline text-sm">
          Back to products
        </Link>
      </main>
    );
  }

  const categoryName =
    typeof product.category === "object"
      ? product.category?.name
      : undefined;

  return (
    <main className="min-h-[80vh] bg-blue-100">
      <div className="px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        <Link
          href="/products"
          className="text-sm text-indigo-600 hover:underline mb-6 inline-block"
        >
          ← Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-black border border-indigo-100">
              <Image
                src={product.cover_image?.path}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {product.images?.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-md overflow-hidden bg-black"
                  >
                    <Image
                      src={img.path}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
              {product.name}
            </h1>

            <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-500">
              {categoryName && (
                <span className="px-2 py-0.5 bg-white rounded border">
                  {categoryName}
                </span>
              )}
              
              {product.new_arrival && (
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded">
                  New
                </span>
              )}
            </div>

            <p className="text-2xl font-bold text-indigo-600 mt-4">
              Rs. {product.price}
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Stock:{" "}
              <span
                className={
                  product.stock > 0 ? "text-green-600" : "text-red-500"
                }
              >
                {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
              </span>
            </p>

            <button
              onClick={handleAddToCart}
              disabled={product.stock < 1 || addToCart.isPending}
              className="mt-6 w-full sm:w-auto px-8 py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {addToCart.isPending ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}