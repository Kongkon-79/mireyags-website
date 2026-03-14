"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { OrdersApiResponse } from "./order-data-type";
import MireyagsPagination from "@/components/ui/mireyags-pagination";
import { useSession } from "next-auth/react";
import Image from "next/image";

const OrderContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
     const { data: session } = useSession();
   const token = (session?.user as { accessToken?: string })?.accessToken;

  const { data, isLoading, error, isError } = useQuery<OrdersApiResponse>({
    queryKey: ["all-orders", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order?page=${currentPage}&limit=8`,{
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

      return res.json();
    },
  });

  const orders = data?.data?.data;
  console.log(orders)

  console.log(isError, error, isLoading);
  return (
    <div className="py-10">
      <div className="container bg-white border border-[#EBEBEB] shadow-[0px_2px_4px_0px_#00000040] rounded-[8px] p-4">
      <div className="pb-6">
        <h2>Order</h2>
      </div>
        <div>
          {
            orders?.map((item)=>{
              return <div key={item?._id} className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-5">
                {/* left side  */}
                <div className="md:grid-cols-1">
                  {
                    item?.items?.map((img)=>{
                      return <div key={img?.name}>
                        <Image  src={img?.image} alt={img?.name} width={600} height={600} />
                      </div>
                      
                    })
                  }
                </div>
                {/* right side  */}
                <div className="md:grid-cols-2">
                 {
                    item?.items?.map((info)=>{
                      return <div key={info?.name}>
                       <h3>{info?.name}</h3>
                       <p>Size : {info?.size}</p>
                       <h4>$ {info?.offerPrice} <del>${info?.price}</del></h4>
                       <p>Order Date : {item?.createdAt}</p>
                       <p>Payment : {item?.payment?.method} </p>
                       <p>Address : {item?.delivery?.address}</p>
                      </div>
                      
                    })
                  }
                </div>
              </div>
            })
          }
        </div>
        {/* pagination  */}
        {data &&
          data?.data &&
          data?.data?.pagination &&
          data?.data?.pagination?.totalPages > 1 && (
            <div className="w-full flex items-center justify-between py-2">
              <p className="text-base font-normal text-[#68706A] leading-[150%]">
                Showing {currentPage} to 8 of{" "}
                {data?.data?.pagination?.totalData} results
              </p>
              <div>
                <MireyagsPagination
                  currentPage={currentPage}
                  totalPages={data?.data?.pagination?.totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default OrderContainer;

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import moment from "moment";
// import { useState } from "react";
// import { useSession } from "next-auth/react";
// import { useQuery } from "@tanstack/react-query";

// import { OrdersApiResponse } from "./order-data-type";
// import MireyagsPagination from "@/components/ui/mireyags-pagination";

// export default function OrdersContainer() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [statusFilter, setStatusFilter] = useState("");

//   const { data: session } = useSession();
//   const token = (session?.user as { accessToken?: string })?.accessToken;

//   const { data, isLoading, isError } = useQuery<OrdersApiResponse>({
//     queryKey: ["orders", currentPage],
//     queryFn: async () => {
//       // if (!token) {
//       //   throw new Error("Unauthorized. Please login again.");
//       // }

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/order?page=${currentPage}&limit=10`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           cache: "no-store",
//         },
//       );

//       const result: OrdersApiResponse = await res.json();

//       if (!res.ok || !result.status) {
//         throw new Error(result.message || "Failed to fetch orders");
//       }

//       return result;
//     },
//     enabled: !!token,
//   });

//   const orders = data?.data?.data ?? [];
//   const pagination = data?.data?.pagination;

//   const filteredOrders = statusFilter
//     ? orders.filter((order) => order.orderStatus === statusFilter)
//     : orders;

//   return (
//     <div className="p-6">
//       <div className="container rounded-[8px] border border-[#E4E4E4] bg-white p-6">
//         <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
//           <h4 className="text-lg font-semibold leading-normal text-[#252471] md:text-xl lg:text-2xl">
//             Order
//           </h4>

//           <div className="w-full md:w-[180px]">
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="h-[36px] w-full rounded-[6px] border border-[#D8D8D8] bg-white px-3 text-sm text-[#666]"
//             >
//               <option value="">Status</option>
//               <option value="placed">Placed</option>
//               <option value="ongoing">Ongoing</option>
//               <option value="delivered">Delivered</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="py-10 text-center text-sm text-[#6C757D]">
//             Loading orders...
//           </div>
//         ) : isError ? (
//           <div className="py-10 text-center text-sm text-red-500">
//             Failed to load orders.
//           </div>
//         ) : filteredOrders.length === 0 ? (
//           <div className="py-10 text-center text-sm text-[#6C757D]">
//             No orders found.
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {filteredOrders.map((order) => {
//               const firstItem = order.items[0];

//               return (
//                 <div
//                   key={order._id}
//                   className="grid grid-cols-1 overflow-hidden rounded-[6px] border border-[#EAEAEA] md:grid-cols-[122px_1fr_auto]"
//                 >
//                  <div className="flex items-center">
//                    <div className="relative h-auto w-full md:w-[200px]">
//                     <Image
//                       src={firstItem?.image || "/placeholder.png"}
//                       alt={firstItem?.name || "Product"}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>

//                   <div className="p-4">
//                     <h5 className="text-sm font-semibold text-[#2B2B2B]">
//                       {firstItem?.name}
//                     </h5>

//                     <p className="mt-1 text-xs text-[#7B7B7B]">
//                       Weight: Approx. {order.items[0]?.quantity ?? 1} item(s)
//                     </p>

//                     <p className="text-xs text-[#7B7B7B]">
//                       Size : {firstItem?.size || "N/A"}
//                     </p>

//                     <p className="mt-2 text-xl font-bold text-[#252471]">
//                       ${order.totalAmount}
//                     </p>

//                     <div className="mt-2 space-y-1 text-xs text-[#555]">
//                       <p>
//                         Order Date:{" "}
//                         {moment(order.createdAt).format("DD MMM, YYYY")}
//                       </p>
//                       <p>
//                         Payment:{" "}
//                         {order.payment?.method === "stripe"
//                           ? "Stripe"
//                           : order.payment?.method || "N/A"}
//                       </p>
//                       <p>
//                         Address:{" "}
//                         {`${order.delivery?.address}, ${order.delivery?.area}, ${order.delivery?.city}`}
//                       </p>
//                     </div>
//                   </div>
//                  </div>

//                   <div className="flex items-start justify-end p-4">
//                     <div className="flex flex-col items-end gap-3">
//                       <span
//                         className={`rounded-[6px] px-3 py-1 text-xs font-medium capitalize ${
//                           order.orderStatus === "placed"
//                             ? "bg-orange-100 text-orange-500"
//                             : order.orderStatus === "delivered"
//                               ? "bg-green-100 text-green-600"
//                               : "bg-slate-100 text-slate-600"
//                         }`}
//                       >
//                         {order.orderStatus}
//                       </span>

//                       <Link
//                         href={`/review/${order._id}?productId=${firstItem?.productId}`}
//                         className="text-sm font-medium text-[#12B5D3]"
//                       >
//                         Review
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//             {pagination && pagination.totalPages > 1 && (
//               <div className="flex flex-col justify-between gap-3 py-4 md:flex-row md:items-center">
//                 <p className="text-sm text-[#68706A]">
//                   Showing page {pagination.currentPage} of{" "}
//                   {pagination.totalPages}
//                 </p>

//                 <MireyagsPagination
//                   currentPage={currentPage}
//                   totalPages={pagination.totalPages}
//                   onPageChange={(page) => setCurrentPage(page)}
//                 />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
