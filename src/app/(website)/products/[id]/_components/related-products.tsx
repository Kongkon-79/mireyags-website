"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/app/(website)/_components/product-card";
import { useQuery } from "@tanstack/react-query";
import { AllProductsApiResponse } from "@/components/types/products-data-type";



export default function RelatedProductsSection() {

    const {data, isLoading, error, isError} = useQuery<AllProductsApiResponse>({
    queryKey: ["all-products"],
    queryFn: async ()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get-all-products`)

      return res.json();
    }
  })

  const products = data?.data 

  console.log(isError, error, isLoading)
  return (
    <section className="w-full bg-[#f7f7f7] py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Related Products
          </h2>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
          >
            View all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products?.data?.map((product) => (
            <ProductCard key={product._id} product={product} compact />
            //  <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}