import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommittedToScientific() {
  return (
    <section className="w-full bg-[#D0F6FF] py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Image */}
          <div className="relative overflow-hidden rounded-2xl shadow-md">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/assets/images/committed_to_scientific.jpg"
                alt="Scientific research laboratory with microscope and test tubes"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority={false}
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Committed to Scientific Excellence
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-700 md:text-base text-justify">
              ResearchPeptides is dedicated to providing the highest quality
              research peptides to the scientific community. Our products
              undergo rigorous testing and quality control to ensure you receive
              only the best materials for your research.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base text-justify">
              With years of experience in peptide synthesis and a commitment to
              customer satisfaction, we are your trusted partner in scientific
              discovery.
            </p>

            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-sky-500 px-6 text-base font-semibold text-white shadow-sm hover:bg-sky-600"
              >
                <Link href="/about-us" className="inline-flex items-center gap-2">
                  Learn More About Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}