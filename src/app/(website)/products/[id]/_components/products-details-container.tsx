"use client"

// import { useCart } from '@/components/context/cart-context'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ProductDetailsContainer = ({id}:{id:string}) => {
  //  const { addToCart } = useCart();
    console.log(id)

      const bullets = [
    "Helps improve the look of pores in just 1 week.",
    "Brightens and evens skin tone with every sleep.",
    "Kalahari Melon and Baobab Oils infuse deep, all-night hydration.",
    "Plumps skin and improves the look of wrinkles instantly and over time.",
    // "Rich yet lightweight gel-cream provides deep hydration for all skin types.",
    // "See more bounce and elasticity after just 1 week.",
    // "Refreshes with a lush, tropical fruit and floral scent.",
  ];
  return (
    <div>
        <section className="w-full bg-[#edf4f6] py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Left Image */}
          <div className="relative overflow-hidden rounded-2xl bg-[#d8d0c3] shadow-sm">
            <div className="relative aspect-[4/4.35] w-full">
              <Image
                src="/assets/images/products/product_details.jpg"
                alt="Premium Peptide XYZ product bottle"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
              Premium Peptide - XYZ
            </h2>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
              <div className="flex items-center gap-0.5 text-slate-900">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-current"
                    strokeWidth={1.8}
                  />
                ))}
              </div>
              <span>157 Reviews</span>
            </div>

            <div className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
              $49.99
            </div>

            <div className="mt-7">
              <h3 className="text-xl font-semibold text-slate-900">Details</h3>

              <p className="mt-4 text-sm leading-7 text-slate-700">
                Figma ipsum component variant main layer. Opacity draft.
              </p>

              <div className="mt-5">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                  Straight Up:
                </h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Lorem ipsum dolor sit amet consectetur. Augue dui sed sit
                  tristique elementum. Nullam tortor lectus dolor tristique ac.
                  Tincidunt feugiat gravida amet sed cras posuere nulla
                  suspendisse. Cursus elementum condimentum at.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                  The Lowdown:
                </h4>

                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  {bullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium text-slate-900">
                  What else?!
                </h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Lorem ipsum dolor sit amet consectetur. In tempus vel amet
                  etiam vehicula. In.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Button
              
              // onClick={() =>
              //   addToCart({
              //     id: product.id,
              //     name: product.name,
              //     description: product.description,
              //     price: product.price,
              //     image: product.image,
              //     inStock: product.inStock,
              //     detailsHref: product.detailsHref,
              //     quantity: 1,
              //   })
              // }

               className="h-11 rounded-lg bg-sky-500 px-6 text-sm font-semibold text-white hover:bg-sky-600">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default ProductDetailsContainer