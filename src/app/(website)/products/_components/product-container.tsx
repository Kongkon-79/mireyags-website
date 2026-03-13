"use client";

import {  useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "../../_components/product-card";
import { useQuery } from "@tanstack/react-query";
import { AllProductsApiResponse } from "@/components/types/products-data-type";

export default function ProductsContainer() {
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("featured");

   const {data, isLoading, error, isError} = useQuery<AllProductsApiResponse>({
    queryKey: ["all-products"],
    queryFn: async ()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get-all-products`)

      return res.json();
    }
  })

  const products = data?.data 

  console.log(isError, error, isLoading)

  // const filteredProducts = useMemo(() => {
  //   const filtered = products?.data?.filter((product) =>
  //     product.name.toLowerCase().includes(search.toLowerCase())
  //   );

  //   switch (sortValue) {
  //     case "price-low":
  //       return [...filtered].sort((a, b) => a.price - b.price);
  //     case "price-high":
  //       return [...filtered].sort((a, b) => b.price - a.price);
  //     case "name-asc":
  //       return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  //     default:
  //       return filtered;
  //   }
  // }, [search, sortValue]);

  return (
    <main className="min-h-screen bg-[#eaf4f7] py-10 md:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Research Products
          </h1>
          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Browse our premium catalog of research peptides and compounds.
          </p>
        </div>

        {/* Toolbar */}
        <div className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px]">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10"
          />

          <Select value={sortValue} onValueChange={setSortValue}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mt-6">
          <p className="text-sm text-slate-600">
            Showing {products?.data?.length} products
          </p>
        </div>

        {/* Product Grid */}
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {products?.data?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}





























// "use client";

// import { useMemo, useState } from "react";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import ProductCard, { ProductItem } from "../../_components/product-card";

// const allProducts: ProductItem[] = [
//   {
//     id: 1,
//     name: "BPC-157",
//     description: "Body Protection Compound-157 supports tissue repair research.",
//     price: 89.99,
//     image: "/assets/images/products/1.jpg",
//     inStock: true,
//     detailsHref: "/products/1",
//   },
//   {
//     id: 2,
//     name: "BPC-157",
//     description: "Body Protection Compound-157 supports tissue repair research.",
//     price: 89.99,
//     image: "/assets/images/products/2.jpg",
//     inStock: true,
//     detailsHref: "/products/2",
//   },
//   {
//     id: 3,
//     name: "BPC-157",
//     description: "Body Protection Compound-157 supports tissue repair research.",
//     price: 89.99,
//     image: "/assets/images/products/3.jpg",
//     inStock: true,
//     detailsHref: "/products/3",
//   },
//   {
//     id: 4,
//     name: "BPC-157",
//     description: "Body Protection Compound-157 supports tissue repair research.",
//     price: 89.99,
//     image: "/assets/images/products/4.jpg",
//     inStock: true,
//     detailsHref: "/products/4",
//   },
//   {
//     id: 5,
//     name: "BPC-157",
//     description: "Body Protection Compound-157 supports tissue repair research.",
//     price: 89.99,
//     image: "/assets/images/products/5.jpg",
//     inStock: true,
//     detailsHref: "/products/5",
//   },
//   {
//     id: 6,
//     name: "BPC-157",
//     description: "Body Protection Compound-157 supports tissue repair research.",
//     price: 89.99,
//     image: "/assets/images/products/1.jpg",
//     inStock: true,
//     detailsHref: "/products/6",
//   },
//   {
//     id: 7,
//     name: "BPC-157",
//     description: "Body Protection Compound-157 supports tissue repair research.",
//     price: 89.99,
//     image: "/assets/images/products/2.jpg",
//     inStock: true,
//     detailsHref: "/products/7",
//   },
//   {
//     id: 8,
//     name: "BPC-157",
//     description: "Body Protection Compound-157 supports tissue repair research.",
//     price: 89.99,
//     image: "/assets/images/products/3.jpg",
//     inStock: true,
//     detailsHref: "/products/8",
//   },
//   {
//     id: 9,
//     name: "BPC-157",
//     description: "Body Protection Compound-157 supports tissue repair research.",
//     price: 89.99,
//     image: "/assets/images/products/4.jpg",
//     inStock: true,
//     detailsHref: "/products/9",
//   },
//   {
//     id: 10,
//     name: "BPC-157",
//     description: "Body Protection Compound-157 supports tissue repair research.",
//     price: 89.99,
//     image: "/assets/images/products/5.jpg",
//     inStock: true,
//     detailsHref: "/products/10",
//   },
//   {
//     id: 11,
//     name: "BPC-157",
//     description: "Body Protection Compound-157 supports tissue repair research.",
//     price: 89.99,
//     image: "/assets/images/products/3.jpg",
//     inStock: true,
//     detailsHref: "/products/11",
//   },
//   {
//     id: 12,
//     name: "BPC-157",
//     description: "Body Protection Compound-157 supports tissue repair research.",
//     price: 89.99,
//     image: "/assets/images/products/2.jpg",
//     inStock: true,
//     detailsHref: "/products/12",
//   },
// ];

// export default function ProductsContainer() {
//   const [search, setSearch] = useState("");
//   const [sortValue, setSortValue] = useState("featured");

//   const filteredProducts = useMemo(() => {
//     const filtered = allProducts.filter((product) =>
//       product.name.toLowerCase().includes(search.toLowerCase())
//     );

//     switch (sortValue) {
//       case "price-low":
//         return [...filtered].sort((a, b) => a.price - b.price);
//       case "price-high":
//         return [...filtered].sort((a, b) => b.price - a.price);
//       case "name-asc":
//         return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
//       default:
//         return filtered;
//     }
//   }, [search, sortValue]);

//   return (
//     <main className="min-h-screen bg-[#eaf4f7] py-10 md:py-14">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="max-w-3xl">
//           <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
//             Research Products
//           </h1>
//           <p className="mt-2 text-sm text-slate-500 md:text-base">
//             Browse our premium catalog of research peptides and compounds.
//           </p>
//         </div>

//         {/* Toolbar */}
//         <div className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px]">
//           <Input
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="h-10"
//           />

//           <Select value={sortValue} onValueChange={setSortValue}>
//             <SelectTrigger className="h-10">
//               <SelectValue placeholder="Sort by" />
//             </SelectTrigger>
//             <SelectContent className="bg-white">
//               <SelectItem value="featured">Featured</SelectItem>
//               <SelectItem value="price-low">Price: Low to High</SelectItem>
//               <SelectItem value="price-high">Price: High to Low</SelectItem>
//               <SelectItem value="name-asc">Name: A to Z</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Results */}
//         <div className="mt-6">
//           <p className="text-sm text-slate-600">
//             Showing {filteredProducts.length} products
//           </p>
//         </div>

//         {/* Product Grid */}
//         <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
//           {filteredProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }