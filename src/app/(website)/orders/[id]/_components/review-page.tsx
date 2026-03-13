"use client";

import * as React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Star, Loader2 } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { OrdersApiResponse, ReviewResponse } from "../../_components/order-data-type";

const reviewSchema = z.object({
  comment: z.string().min(2, "Review message is required"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export default function ReviewPage({ orderId }: { orderId: string }) {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";

  const { data: session } = useSession();
  const token = (session?.user as { accessToken?: string })?.accessToken;

  const [rating, setRating] = React.useState(0);
  const [hovered, setHovered] = React.useState(0);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
    },
  });

  const { data, isLoading, isError } = useQuery<OrdersApiResponse>({
    queryKey: ["order-list-for-review"],
    queryFn: async () => {
      if (!token) {
        throw new Error("Unauthorized. Please login again.");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const result: OrdersApiResponse = await res.json();

      if (!res.ok || !result.status) {
        throw new Error(result.message || "Failed to fetch orders");
      }

      return result;
    },
    enabled: !!token,
  });

  const selectedOrder = data?.data?.data?.find((order) => order._id === orderId);
  const selectedItem = selectedOrder?.items?.find((item) => item.productId === productId);

  const { mutate, isPending } = useMutation<
    ReviewResponse,
    Error,
    ReviewFormValues
  >({
    mutationKey: ["submit-review", productId],
    mutationFn: async (values) => {
      if (!token) {
        throw new Error("Unauthorized. Please login again.");
      }

      if (!productId) {
        throw new Error("Product id is missing");
      }

      if (rating < 1) {
        throw new Error("Please select a rating");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          rating,
          comment: values.comment,
        }),
      });

      const result: ReviewResponse = await res.json();

      if (!res.ok || !result.status) {
        throw new Error(result.message || "Failed to submit review");
      }

      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Review submitted");
      form.reset();
      setRating(0);
    },
    onError: (error) => {
      toast.error(error.message || "Submit failed");
    },
  });

  const onSubmit = (values: ReviewFormValues) => {
    mutate(values);
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="rounded-[8px] border border-[#E4E4E4] bg-white p-6 text-center">
          Loading...
        </div>
      </div>
    );
  }

  if (isError || !selectedOrder || !selectedItem) {
    return (
      <div className="p-4 md:p-6">
        <div className="rounded-[8px] border border-[#E4E4E4] bg-white p-6 text-center text-red-500">
          Failed to load review details.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="overflow-hidden rounded-[8px] border border-[#E4E4E4] bg-white">
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto]">
          <div className="relative h-[120px] w-full md:w-[120px]">
            <Image
              src={selectedItem.image}
              alt={selectedItem.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4">
            <h4 className="text-sm font-semibold text-[#2B2B2B]">
              {selectedItem.name}
            </h4>
            <p className="mt-1 text-xs text-[#7B7B7B]">
              Weight: Approx. 300-350g per pair
            </p>
            <p className="text-xs text-[#7B7B7B]">Size : {selectedItem.size}</p>

            <p className="mt-2 text-xl font-bold text-[#252471]">
              ${selectedItem.offerPrice || selectedItem.price}
            </p>

            <div className="mt-2 space-y-1 text-xs text-[#555]">
              <p>Order Date: {selectedOrder.createdAt.slice(0, 10)}</p>
              <p>Payment: {selectedOrder.payment?.method}</p>
              <p>
                Address:{" "}
                {`${selectedOrder.delivery.address}, ${selectedOrder.delivery.area}, ${selectedOrder.delivery.city}`}
              </p>
            </div>
          </div>

          <div className="p-4">
            <span className="rounded-[6px] bg-orange-100 px-3 py-1 text-xs font-medium capitalize text-orange-500">
              {selectedOrder.orderStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-[8px] border border-[#E4E4E4] bg-white p-6">
        <h4 className="mb-4 text-sm font-medium text-[#2B2B2B]">Give Rating</h4>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[100px_1fr] md:items-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#111]">{rating}</h2>
            <p className="text-sm text-[#666]">/5</p>

            <div className="mt-3 flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= (hovered || rating);

                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    className="transition"
                  >
                    <Star
                      className={`h-7 w-7 ${
                        active ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[8px] border border-[#E4E4E4] bg-white p-6">
        <h4 className="mb-4 text-sm font-medium text-[#2B2B2B]">Give Review</h4>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write your review message"
                      className="min-h-[90px] rounded-[8px] border border-[#D9D9D9]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className="h-[42px] min-w-[140px] rounded-[8px] bg-[#12B5D3] text-white hover:bg-[#0ea5c0]"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submit...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}