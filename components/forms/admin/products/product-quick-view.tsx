// "use client";

// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import Image from "next/image";
// import { X } from 
// import { api } from "@/lib/api";
// import { useProductModal } from "@/context/ProductModalContext";
// import { useCart } from "@/context/CartContext";

// export default function ProductQuickView() {
//   const { productId, closeProduct } = useProductModal();
//   const { addToCart } = useCart();
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [qty, setQty] = useState(1);

//   const { data: product, isLoading } = useQuery({
//     queryKey: ["product", productId],
//     queryFn: async () => {
//       const res = await api.get(`/products/${productId}`);
//       return res.data.data; // matches your sendResponse { success, message, data }
//     },
//     enabled: !!productId,
//   });

//   // reset local state whenever a different product opens
//   useEffect(() => {
//     setSelectedSize(null);
//     setQty(1);
//   }, [productId]);

//   if (!productId) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6">
//         <button
//           onClick={closeProduct}
//           className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-100"
//         >
//           <X size={20} />
//         </button>

//         {isLoading || !product ? (
//           <div className="h-96 animate-pulse bg-gray-100 rounded-lg" />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
//               <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm text-gray-500">{product.brand}</p>
//                 <h2 className="text-xl font-semibold">{product.name}</h2>
//                 <p className="mt-1 font-semibold">Rs. {product.discountPrice ?? product.price}</p>
//               </div>

//               <p className="text-sm text-gray-600">{product.description}</p>

//               {/* whatever admin-defined variant fields you have, e.g. sizes[] */}
//               {product.sizes?.length > 0 && (
//                 <div>
//                   <p className="text-sm font-medium mb-1">Size</p>
//                   <div className="flex gap-2 flex-wrap">
//                     {product.sizes.map((s: string) => (
//                       <button
//                         key={s}
//                         onClick={() => setSelectedSize(s)}
//                         className={`px-3 py-1 border rounded ${
//                           selectedSize === s ? "border-black bg-black text-white" : "border-gray-300"
//                         }`}
//                       >
//                         {s}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="flex items-center gap-3">
//                 <p className="text-sm font-medium">Qty</p>
//                 <div className="flex items-center border rounded">
//                   <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1">-</button>
//                   <span className="px-3">{qty}</span>
//                   <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1">+</button>
//                 </div>
//               </div>

//               <button
//                 disabled={product.sizes?.length > 0 && !selectedSize}
//                 onClick={() => {
//                   addToCart({
//                     productId: product._id,
//                     name: product.name,
//                     price: product.discountPrice ?? product.price,
//                     image: product.images[0],
//                     size: selectedSize,
//                     qty,
//                   });
//                   closeProduct();
//                 }}
//                 className="w-full py-2.5 rounded bg-black text-white font-medium disabled:opacity-40"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }