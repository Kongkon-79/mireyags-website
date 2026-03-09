"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard, { ProductItem } from "@/app/(website)/_components/product-card";

const relatedProducts: ProductItem[] = [
  {
    id: 1,
    name: "BPC-157",
    description: "Body Protection Compound-157 for tissue repair research",
    price: 89.99,
    image: "/assets/images/products/1.jpg",
    inStock: true,
    detailsHref: "/products/1",
  },
  {
    id: 2,
    name: "BPC-157",
    description: "Body Protection Compound-157 for tissue repair research",
    price: 89.99,
    image: "/assets/images/products/2.jpg",
    inStock: true,
    detailsHref: "/products/2",
  },
  {
    id: 3,
    name: "BPC-157",
    description: "Body Protection Compound-157 for tissue repair research",
    price: 89.99,
    image: "/assets/images/products/3.jpg",
    inStock: true,
    detailsHref: "/products/3",
  },
  {
    id: 4,
    name: "BPC-157",
    description: "Body Protection Compound-157 for tissue repair research",
    price: 89.99,
    image: "/assets/images/products/2.jpg",
    inStock: true,
    detailsHref: "/products/4",
  },
];

export default function RelatedProductsSection() {
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
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} compact />
            //  <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}