"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { SingleProductApiResponse } from "./single-product-data-type";
import { useCart } from "@/components/context/cart-context";

const ProductDetailsContainer = ({ id }: { id: string }) => {
  const { addToCart } = useCart();
  const [selectImage, setSelectImage] = useState<string | null | undefined>("");

  const { data, isLoading, isError } = useQuery<SingleProductApiResponse>({
    queryKey: ["single-product", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${id}`,
      );

      const data: SingleProductApiResponse = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message || "Failed to fetch product");
      }

      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 text-lg font-semibold">
        Loading Product...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-20 text-red-500 text-lg">
        Failed to load product
      </div>
    );
  }

  const productData = data?.data?.product;

  const mainImage = selectImage || productData?.image;

  const allImages = [productData?.image, ...(productData?.subImages || [])];

  return (
    <section className="w-full py-8 md:py-10 lg:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {/* LEFT IMAGE SECTION */}
          <div>
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-xl shadow-[3px_4px_30px_0px_#0000001A]">
              <div className="relative aspect-square w-full">
                <Image
                  src={mainImage || ""}
                  alt={productData?.name || "product"}
                  fill
                  className="object-cover transition-all duration-300"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-5 gap-2 md:gap-3 lg:gap-4 pt-6">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectImage(img)}
                  className={`overflow-hidden rounded-[12px] border-[4px] transition-all
                    ${
                      mainImage === img
                        ? "border-primary"
                        : "border-gray-300 hover:border-primary"
                    }`}
                >
                  <Image
                    src={img || ""}
                    alt="product thumbnail"
                    width={120}
                    height={120}
                    className="w-full h-[90px] object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            {/* Product Title */}
            <h2 className="text-2xl md:text-[28px] lg:text-[32px] font-semibold text-[#18181B] leading-normal">
              {productData?.name || "N/A"}
            </h2>

            {/* Review */}
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
              <div className="flex items-center gap-1 text-[#111827]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-current"
                    strokeWidth={1.8}
                  />
                ))}
              </div>

              <span className="text-sm font-medium leading-normal text-[#52525B]">{productData?.reviewCount || 0} Reviews</span>
            </div>

            {/* Price */}
            <div className="mt-5 text-2xl md:text-3xl lg:text-4xl font-semibold text-[#18181B] leading-normal">
              ${productData?.offerPrice || "N/A"} <del className="text-xl md:text-2xl lg:text-3xl text-[#424242] font-normal">${productData?.price || "N/A"}</del>
            </div>

            {/* Description */}
            <div className="mt-7">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-black leading-normal">Details</h3>

              <p className="mt-4 text-sm md:text-base font-normal text-[#424242] leading-normal">
                {productData?.description || "No description available"}
              </p>
            </div>

            {/* Add To Cart */}
            <div className="mt-8">
              <Button
                onClick={() =>
                  addToCart({
                    id: productData?._id ?? "",
                    name: productData?.name ?? "",
                    description: productData?.description ?? "",
                    price: productData?.price ?? 0,
                    offerPrice: productData?.offerPrice ?? 0,
                    image: productData?.image ?? "",
                    inStock: productData?.stock ?? 0,
                    size: productData?.size ?? [] ,
                    quantity: 1,
                  })
                }
                className="h-10 rounded-[12px] bg-primary px-6 text-sm font-semibold text-white hover:bg-sky-600 transition"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsContainer;

