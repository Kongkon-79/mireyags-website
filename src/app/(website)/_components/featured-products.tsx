"use client";

import * as React from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard, { ProductItem } from "./product-card";

const products: ProductItem[] = [
  {
    id: 1,
    name: "BPC-157",
    description:
      "Body Protection Compound-157 for tissue repair research",
    price: 89.99,
    image: "/assets/images/products/1.jpg",
    inStock: true,
    detailsHref: "/products/1",
  },
  {
    id: 2,
    name: "BPC-157",
    description:
      "Body Protection Compound-157 for tissue repair research",
    price: 89.99,
    image: "/assets/images/products/2.jpg",
    inStock: true,
    detailsHref: "/products/2",
  },
  {
    id: 3,
    name: "BPC-157",
    description:
      "Body Protection Compound-157 for tissue repair research",
    price: 89.99,
    image: "/assets/images/products/3.jpg",
    inStock: true,
    detailsHref: "/products/3",
  },
  {
    id: 4,
    name: "BPC-157",
    description:
      "Body Protection Compound-157 for tissue repair research",
    price: 89.99,
    image: "/assets/images/products/4.jpg",
    inStock: true,
    detailsHref: "/products/4",
  },
  {
    id: 5,
    name: "BPC-157",
    description:
      "Body Protection Compound-157 for tissue repair research",
    price: 89.99,
    image: "/assets/images/products/5.jpg",
    inStock: true,
    detailsHref: "/products/5",
  },
  {
    id: 6,
    name: "BPC-157",
    description:
      "Body Protection Compound-157 for tissue repair research",
    price: 89.99,
    image: "/assets/images/products/1.jpg",
    inStock: true,
    detailsHref: "/products/6",
  },
];

export default function FeaturedResearchPeptidesSection() {
  const plugin = React.useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section className="w-full bg-[#eaf4f7] py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Featured Research Peptides
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">
            Explore our most popular products
          </p>
        </div>

        <div className="relative mt-10">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-4">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="-left-4 hidden border-slate-200 bg-white text-slate-700 shadow-sm md:flex" />
            <CarouselNext className="-right-4 hidden border-slate-200 bg-white text-slate-700 shadow-sm md:flex" />
          </Carousel>
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            className="h-12 rounded-lg bg-sky-500 px-7 text-base font-semibold text-white hover:bg-sky-600"
          >
            <Link href="/products" className="inline-flex items-center gap-2">
              See All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}