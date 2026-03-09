"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, CircleCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ProductItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
  detailsHref?: string;
}

interface ProductCardProps {
  product: ProductItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group h-full overflow-hidden rounded-2xl border-0 bg-white shadow-none">
      <CardContent className="flex h-full flex-col p-0">
        <div className="p-3 pb-0">
          <div className="relative h-[190px] overflow-hidden rounded-xl bg-[#f3f3f3] sm:h-[210px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
          <h3 className="text-[30px] font-semibold leading-none text-slate-900 md:text-[32px]">
            {product.name}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-500">
            {product.description}
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-green-600">
            <CircleCheck className="h-4 w-4" />
            {product.inStock ? "In Stock" : "Out of Stock"}
          </div>

          <div className="mt-3 text-[22px] font-bold leading-none text-slate-900">
            ${product.price.toFixed(2)}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Button
              asChild
              variant="secondary"
              className="h-9 flex-1 rounded-md bg-[#d8d8d8] text-xs font-medium text-slate-700 hover:bg-[#cfcfcf]"
            >
              <Link href={product.detailsHref ?? "/products"}>View Details</Link>
            </Button>

            <Button className="h-9 flex-1 rounded-md bg-sky-500 text-xs font-medium text-white hover:bg-sky-600">
              <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
              Add To Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}