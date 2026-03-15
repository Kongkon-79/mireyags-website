"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import { SingleOrderApiResponse } from "./single-order-data-type";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import ShareExperienceForm from "./share-your-exprience";

const OrderDetails = ({ orderId }: { orderId: string }) => {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken?: string })?.accessToken;

  const { data, isLoading, error, isError } = useQuery<SingleOrderApiResponse>({
    queryKey: ["single-order", orderId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/${orderId}`,
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

  const order = data?.data;

  const productId = order?.items?.[0]?.productId;
  console.log(order);

  console.log(isError, error, isLoading);
  return (
    <div>
      <div className="py-10">
        <div className="container bg-white border border-[#EBEBEB] shadow-[0px_2px_4px_0px_#00000040] rounded-[8px] p-4">
          <div className="pb-2">
            <Link
              href="/orders"
              className="text-lg md:text-xl font-semibold text-[#13279F] leading-normal underline"
            >
              Back
            </Link>
          </div>
          <div
            key={order?._id}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4"
          >
            {/* left side  */}
            <div className="md:col-span-1">
              {order?.items?.map((img) => {
                return (
                  <div key={img?.name}>
                    <Link href={`/orders/${order?._id}`}>
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
              {order?.items?.map((info) => {
                return (
                  <div key={info?.name}>
                    <div className="w-full flex items-center justify-between">
                      <h3 className="text-base md:text-lg font-semibold text-[#242424] leading-normal pb-1">
                        {info?.name}
                      </h3>
                      <button className="bg-primary text-white text-sm font-medium leading-normal py-1 px-3 rounded-full">
                        {order?.payment?.paymentStatus}
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
                        {moment(order?.createdAt).format("DD MMM, YYYY")}
                      </span>
                    </p>
                    <p className="text-base font-normal text-[#8B8B8B] leading-normal py-1">
                      Payment :{" "}
                      <span className="text-[#363636] font-medium">
                        {" "}
                        {order?.payment?.method}
                      </span>{" "}
                    </p>
                    <p className="text-base font-normal text-[#8B8B8B] leading-normal">
                      Address :{" "}
                      <span className="text-[#363636] font-medium">
                        {order?.delivery?.address}
                      </span>{" "}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ShareExperienceForm productId={productId} />
    </div>
  );
};

export default OrderDetails;
