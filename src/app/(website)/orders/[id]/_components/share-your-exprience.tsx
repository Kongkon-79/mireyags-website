"use client";

import { z } from "zod";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  rating: z.number().min(1, { message: "Please rate us!" }),
  comment: z
    .string()
    .min(10, { message: "Review must be at least 10 characters." })
    .max(500),
});

type FormValues = z.infer<typeof formSchema>;

export default function ShareExperienceForm({productId}:{productId?:string}) {

  const { data: session } = useSession();
    const token = (session?.user as { accessToken?: string })?.accessToken;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["share-your-exprience"],
    mutationFn: (values: FormValues) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Review and Rating added successfully!");
      form.reset();
    },
  });

  const onSubmit = (values: FormValues) => {
    const payload = {
        productId : productId,
        rating: values?.rating,
        comment: values?.comment
    }
    mutate(payload);
  };

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  };

  return (
    <div className="container bg-white border border-[#EBEBEB] shadow-[0px_2px_4px_0px_#00000040] rounded-[8px] p-4">
      <h4 className="text-lg md:text-xl font-semibold text-[#13279F] leading-normal">
          Write Review and Rating
        </h4>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-6 pt-10"
          >
            {/* Rating Field */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="text-base font-medium text-[#333333] leading-[120%] mt-2">
                    Rate Us
                  </FormLabel>
                  <FormControl className="">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isActive = star <= field.value;
                        return (
                          <button
                            type="button"
                            key={star}
                            onClick={() => field.onChange(star)}
                            className="transition-colors duration-150"
                          >
                            <Star
                              className={`h-6 w-6 ${isActive
                                ? "fill-[#FACC15] text-[#FACC15]"
                                : "text-[#FACC15] hover:text-[#FACC15]/90"
                                }`}
                            />
                          </button>
                        );
                      })}
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {getRatingText(field.value)}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-[#333333] leading-[120%]">
                    Give us a review
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience..."
                      className="h-[128px] w-full rounded-[4px] border-[#C0C3C1] p-3 placeholder:text-[#8E959F] text-[#1E1E1E] text-base ring-0 outline-none leading-[120%] font-medium"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500">
                    {field.value.length}/200 characters
                  </p>{" "}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center">
              <Button
                disabled={isPending}
                className="my-5 h-[51px] bg-primary rounded-[8px] text-[#F4F4F4] text-base font-medium leading-[120%] py-4 px-[47px]"
                type="submit"
              >
                {isPending ? "Saving...." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}