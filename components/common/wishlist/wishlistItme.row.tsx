'use client'

import Image from "next/image";
import Link from "next/link";
import { TWishlistItem } from "@/types/wishlist.types";
import { useToggleWishlist } from "@/hooks/wishlist.hook";
import { useAddToCart } from "@/hooks/useCart";
import { HiOutlineTrash, HiOutlineShoppingBag } from "react-icons/hi2";
import toast from "react-hot-toast";

const WishlistItemRow = ({ item }: { item: TWishlistItem }) => {
  const product = item.product_id;
  const { mutate: toggleWishlist, isPending: isRemoving } = useToggleWishlist();
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();

  const handleRemove = () => {
    toggleWishlist(product._id, {
      onSuccess: () => toast.success(`Removed ${product.name} from wishlist`),
      onError: (error: any) => toast.error(error?.message || "Couldn't remove item"),
    });
  };

  const handleAddToCart = () => {
    addToCart(
      { productId: product._id, quantity: 1 },
      {
        onSuccess: () => toast.success("Added to cart"),
        onError: (error: any) => toast.error(error?.message || "Couldn't add to cart"),
      }
    );
  };

  const isBusy = isRemoving || isAdding;

  return (
    <div className={`flex items-center gap-4 py-4 border-b ${isBusy ? "opacity-60" : ""}`}>
      <Link
        href={`/products/${product._id}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100"
      >
        <Image
          src={product.cover_image.path}
          alt={product.name}
          fill
          className="object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/products/${product._id}`} className="font-medium truncate hover:underline">
          {product.name}
        </Link>
        <p className="text-sm text-gray-500">Rs. {product.price.toLocaleString()}</p>
        {product.stock === 0 && (
          <p className="text-xs text-red-500 mt-1">Out of stock</p>
        )}
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isBusy || product.stock === 0}
        className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg bg-indigo-400 hover:bg-indigo-600 disabled:bg-indigo-200 text-white font-medium transition-colors"
      >
        <HiOutlineShoppingBag size={16} />
        {isAdding ? "Adding.." : "Add to cart"}
      </button>

      <button
        type="button"
        onClick={handleRemove}
        disabled={isBusy}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <HiOutlineTrash className="h-5 w-5" />
      </button>
    </div>
  );
};

export default WishlistItemRow;