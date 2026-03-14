"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, CircleCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/context/cart-context";
import { Product } from "@/components/types/products-data-type";

export interface ProductItem {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string[];
  image: string;
  inStock: string | number;
  detailsHref?: string;
}

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({
  product,
  compact = false,
}: ProductCardProps) {
  const { addToCart } = useCart();
  return (
    <Card
      className={cn(
        "group h-full overflow-hidden border-0 bg-white shadow-none",
        compact ? "rounded-none bg-transparent" : "rounded-2xl",
      )}
    >
      <CardContent className="flex h-full flex-col p-0">
        <div className={cn(compact ? "p-0" : "p-3 pb-0")}>
          <div
            className={cn(
              "relative overflow-hidden bg-[#f3f3f3]",
              compact
                ? "h-[160px] rounded-lg sm:h-[180px] lg:h-[190px]"
                : "h-[190px] rounded-xl sm:h-[210px]",
            )}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col",
            compact ? "px-0 pb-0 pt-4" : "px-4 pb-4 pt-4",
          )}
        >
          <h3
            className={cn(
              "font-semibold text-slate-900",
              compact
                ? "text-[20px] leading-tight md:text-[22px]"
                : "text-xl leading-none md:text-2xl",
            )}
          >
            {product.name}
          </h3>

          <p
            className={cn(
              "line-clamp-2 text-slate-500",
              compact ? "mt-2 text-xs leading-5" : "mt-3 text-sm leading-5",
            )}
          >
            {product.description}
          </p>

          <div
            className={cn(
              "flex items-center gap-1.5 font-medium text-green-600",
              compact ? "mt-2 text-xs" : "mt-3 text-sm",
            )}
          >
            <CircleCheck className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
            {product.stock ? "In Stock" : "Out of Stock"}
          </div>

          <div
            className={cn(
              "font-bold text-slate-900",
              compact
                ? "mt-2 text-[18px] leading-none"
                : "mt-3 text-[22px] leading-none",
            )}
          >
            ${product?.offerPrice?.toFixed(2)}
          </div>

          <div
            className={cn("flex items-center gap-2", compact ? "mt-3" : "mt-4")}
          >
            <Button
              asChild
              variant="secondary"
              className={cn(
                "flex-1 rounded-md text-xs font-medium",
                compact
                  ? "h-8 bg-[#d8d8d8] text-[10px] text-slate-700 hover:bg-[#cfcfcf]"
                  : "h-9 bg-[#d8d8d8] text-slate-700 hover:bg-[#cfcfcf]",
              )}
            >
              <Link href={`/products/${product?._id}`}>View Details</Link>
            </Button>

            <Button
              onClick={() =>
                addToCart({
                  id: product._id,
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  offerPrice: product.offerPrice,
                  image: product.image,
                  inStock: product.stock,
                  size: product?.size,
                  // detailsHref: product.detailsHref,
                  quantity: 1,
                })
              }
              className={cn(
                "flex-1 rounded-md bg-sky-500 text-xs font-medium text-white hover:bg-sky-600",
                compact ? "h-8 text-[10px]" : "h-9",
              )}
            >
              <ShoppingCart
                className={cn("mr-1.5", compact ? "h-3 w-3" : "h-3.5 w-3.5")}
              />
              Add To Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// update code :

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { ShoppingCart, CircleCheck } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useCart } from "@/components/context/cart-context";

// export interface ProductItem {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   inStock: boolean;
//   detailsHref?: string;
// }

// interface ProductCardProps {
//   product: ProductItem;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const { addToCart } = useCart();

//   return (
//     <Card className="group h-full overflow-hidden rounded-2xl border-0 bg-white shadow-none">
//       <CardContent className="flex h-full flex-col p-0">
//         <div className="p-3 pb-0">
//           <div className="relative h-[190px] overflow-hidden rounded-xl bg-[#f3f3f3] sm:h-[210px]">
//             <Image
//               src={product.image}
//               alt={product.name}
//               fill
//               className="object-cover transition-transform duration-500 group-hover:scale-105"
//             />
//           </div>
//         </div>

//         <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
//           <h3 className="text-[24px] font-semibold leading-tight text-slate-900 md:text-[28px]">
//             {product.name}
//           </h3>

//           <p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-500">
//             {product.description}
//           </p>

//           <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-green-600">
//             <CircleCheck className="h-4 w-4" />
//             {product.inStock ? "In Stock" : "Out of Stock"}
//           </div>

//           <div className="mt-3 text-[22px] font-bold leading-none text-slate-900">
//             ${product.price.toFixed(2)}
//           </div>

//           <div className="mt-4 flex items-center gap-2">
//             <Button
//               asChild
//               variant="secondary"
//               className="h-9 flex-1 rounded-md bg-[#d8d8d8] text-xs font-medium text-slate-700 hover:bg-[#cfcfcf]"
//             >
//               <Link href={product.detailsHref ?? "/products"}>View Details</Link>
//             </Button>

//             <Button
//               className="h-9 flex-1 rounded-md bg-sky-500 text-xs font-medium text-white hover:bg-sky-600"
//               onClick={() =>
//                 addToCart({
//                   id: product.id,
//                   name: product.name,
//                   description: product.description,
//                   price: product.price,
//                   image: product.image,
//                   inStock: product.inStock,
//                   detailsHref: product.detailsHref,
//                   quantity: 1,
//                 })
//               }
//             >
//               <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
//               Add To Cart
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { ShoppingCart, CircleCheck } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// export interface ProductItem {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   inStock: boolean;
//   detailsHref?: string;
// }

// interface ProductCardProps {
//   product: ProductItem;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   return (
//     <Card className="group h-full overflow-hidden rounded-2xl border-0 bg-white shadow-none">
//       <CardContent className="flex h-full flex-col p-0">
//         <div className="p-3 pb-0">
//           <div className="relative h-[190px] overflow-hidden rounded-xl bg-[#f3f3f3] sm:h-[210px]">
//             <Image
//               src={product.image}
//               alt={product.name}
//               fill
//               className="object-cover transition-transform duration-500 group-hover:scale-105"
//             />
//           </div>
//         </div>

//         <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
//           <h3 className="text-[30px] font-semibold leading-none text-slate-900 md:text-[32px]">
//             {product.name}
//           </h3>

//           <p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-500">
//             {product.description}
//           </p>

//           <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-green-600">
//             <CircleCheck className="h-4 w-4" />
//             {product.inStock ? "In Stock" : "Out of Stock"}
//           </div>

//           <div className="mt-3 text-[22px] font-bold leading-none text-slate-900">
//             ${product.price.toFixed(2)}
//           </div>

//           <div className="mt-4 flex items-center gap-2">
//             <Button
//               asChild
//               variant="secondary"
//               className="h-9 flex-1 rounded-md bg-[#d8d8d8] text-xs font-medium text-slate-700 hover:bg-[#cfcfcf]"
//             >
//               <Link href={product.detailsHref ?? "/products"}>View Details</Link>
//             </Button>

//             <Button className="h-9 flex-1 rounded-md bg-sky-500 text-xs font-medium text-white hover:bg-sky-600">
//               <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
//               Add To Cart
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
