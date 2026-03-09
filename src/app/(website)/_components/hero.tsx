"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/hero_bg.jpg"
        alt="Cinema campaign hero background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay for better readability */}
      {/* <div className="absolute inset-0 bg-black/50" /> */}

      {/* Optional soft gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" /> */}

      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl py-24 md:py-32">

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-normal text-white ">
              Premium Research Peptides for 
              <span className="block ">Scientific Excellence</span>
            </h1>

            <p className="mt-6 max-w-2xl leading-7 text-white text-base md:text-lg lg:text-xl">
              High-purity peptides for research and educational purposes. All products are third-party tested for quality assurance.
            </p>

            <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="w-[165px] md:w-auto h-12 rounded-[12px] px-8 text-base font-semibold shadow-lg"
              >
                <Link href="/products">See Products <ArrowRight /></Link>
              </Button>

              {/* <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-[12px] border-primary bg-transparent text-primary px-8 text-base font-semibold hover:bg-white/90"
              >
                <Link href="#">Learn More</Link>
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}













