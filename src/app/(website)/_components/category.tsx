import Image from "next/image";
import {
  ShieldCheck,
  FlaskConical,
  Truck,
  BadgeHelp,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type FeatureItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
};

const features: FeatureItem[] = [
  {
    id: 1,
    title: "Quality Assured",
    description: "Third-party tested for purity and authenticity",
    image: "/assets/images/cat_1.jpg",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Research Grade",
    description: "98%+ purity for reliable research results",
    image: "/assets/images/cat_2.jpg",
    icon: FlaskConical,
  },
  {
    id: 3,
    title: "Fast Shipping",
    description: "Quick and secure delivery worldwide",
    image: "/assets/images/cat_3.jpg",
    icon: Truck,
  },
  {
    id: 4,
    title: "Expert Support",
    description: "Knowledgeable team ready to assist",
    image: "/assets/images/cat_4.jpg",
    icon: BadgeHelp,
  },
];

export default function FeatureHighlightsSection() {
  return (
    <section className="w-full bg-[#eaf4f7] py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.id}
                className="group overflow-hidden rounded-xl border border-sky-300 bg-transparent shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="p-2.5 pb-0">
                    <div className="relative h-[170px] overflow-hidden rounded-lg sm:h-[180px]">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col items-center px-5 pb-6 pt-4 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <Icon className="h-5 w-5 text-slate-600" strokeWidth={1.9} />
                    </div>

                    <h3 className="mt-4 text-[28px] font-semibold leading-tight text-slate-800 md:text-[30px]">
                      {feature.title}
                    </h3>

                    <p className="mt-2 max-w-[220px] text-sm leading-6 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}