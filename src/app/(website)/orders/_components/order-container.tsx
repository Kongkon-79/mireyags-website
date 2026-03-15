"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { OrdersApiResponse } from "./order-data-type";
import MireyagsPagination from "@/components/ui/mireyags-pagination";
import { useSession } from "next-auth/react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

const OrderContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession();
  const token = (session?.user as { accessToken?: string })?.accessToken;

  const { data, isLoading, error, isError } = useQuery<OrdersApiResponse>({
    queryKey: ["all-orders", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order?page=${currentPage}&limit=8`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.json();
    },
    enabled: !!token,
  });

  const orders = data?.data?.data;
  console.log(orders);

  console.log(isError, error, isLoading);
  return (
    <div className="py-10">
      <div className="container bg-white border border-[#EBEBEB] shadow-[0px_2px_4px_0px_#00000040] rounded-[8px] p-4">
        <div className="pb-2">
          <h2 className="text-lg md:text-xl font-semibold text-[#13279F] leading-normal">
            Order
          </h2>
        </div>
        <div>
          {orders?.map((item) => {
            return (
              <div
                key={item?._id}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-[#D6D6D6] pt-4"
              >
                {/* left side  */}
                <div className="md:col-span-1">
                  {item?.items?.map((img) => {
                    return (
                      <div key={img?.name}>
                        <Link href={`/orders/${item?._id}`}>
                          <Image
                            src={img?.image}
                            alt={img?.name}
                            width={600}
                            height={600}
                            className="w-full h-[200px] rounded-l-[12px] object-cover"
                          />
                        </Link>
                      </div>
                    );
                  })}
                </div>
                {/* right side  */}
                <div className="md:col-span-2">
                  {item?.items?.map((info) => {
                    return (
                      <div key={info?.name}>
                        <div className="w-full flex items-center justify-between">
                          <h3 className="text-base md:text-lg font-semibold text-[#242424] leading-normal pb-1">
                            {info?.name}
                          </h3>
                          <button className="bg-primary text-white text-sm font-medium leading-normal py-1 px-3 rounded-full">
                            {item?.payment?.paymentStatus}
                          </button>
                        </div>

                        <p className="text-base font-normal text-[#8B8B8B] leading-normal">
                          Size : {info?.size}
                        </p>
                        <h4 className="text-lg md:text-xl font-semibold text-[#171D98] leading-normal py-1">
                          ${info?.offerPrice}{" "}
                          <del className="text-base font-normal text-[#666666]">
                            ${info?.price}
                          </del>
                        </h4>
                        <p className="text-base font-normal text-[#8B8B8B] leading-normal">
                          Order Date :{" "}
                          <span className="text-[#363636] font-medium">
                            {moment(item?.createdAt).format("DD MMM, YYYY")}
                          </span>
                        </p>
                        <p className="text-base font-normal text-[#8B8B8B] leading-normal py-1">
                          Payment :{" "}
                          <span className="text-[#363636] font-medium">
                            {" "}
                            {item?.payment?.method}
                          </span>{" "}
                        </p>
                        <p className="text-base font-normal text-[#8B8B8B] leading-normal">
                          Address :{" "}
                          <span className="text-[#363636] font-medium">
                            {item?.delivery?.address}
                          </span>{" "}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {/* pagination  */}
        <div className="pt-4">
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
    </div>
  );
};

export default OrderContainer;


