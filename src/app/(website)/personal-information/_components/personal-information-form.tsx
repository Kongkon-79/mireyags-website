"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  country: z.string().optional(),
  cityState: z.string().optional(),
  roadArea: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

type UserProfileResponse = {
  status: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    dob: string | null;
    gender: string;
    role: string;
    stripeAccountId: string | null;
    bio: string;
    profileImage: string;
    multiProfileImage: string[];
    pdfFile: string;
    otp: string | null;
    otpExpires: string | null;
    otpVerified: boolean;
    resetExpires: string | null;
    isVerified: boolean;
    refreshToken: string;
    hasActiveSubscription: boolean;
    subscriptionExpireDate: string | null;
    blockedUsers: string[];
    language: string;
    phoneNumber?: string;
    address: {
      country: string;
      cityState: string;
      roadArea: string;
      postalCode: string;
      taxId: string;
    };
  };
};

type UpdateProfileResponse = {
  status: boolean;
  message: string;
  data: UserProfileResponse["data"];
};

function splitName(fullName: string) {
  const trimmed = fullName?.trim() || "";
  if (!trimmed) {
    return { firstName: "", lastName: "" };
  }

  const parts = trimmed.split(" ");
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ");

  return { firstName, lastName };
}

export default function PersonalInformationForm() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = (session?.user as { accessToken?: string })?.accessToken;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      country: "",
      cityState: "",
      roadArea: "",
    },
  });

  const { isLoading, isError, refetch } = useQuery<UserProfileResponse>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!token) {
        throw new Error("Unauthorized. Please login again.");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      const data: UserProfileResponse = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      return data;
    },
    enabled: !!token,
  });

  const { mutate, isPending } = useMutation<
    UpdateProfileResponse,
    Error,
    ProfileFormValues
  >({
    mutationKey: ["update-profile"],
    mutationFn: async (values) => {
      if (!token) {
        throw new Error("Unauthorized. Please login again.");
      }

      const fullName = `${values.firstName} ${values.lastName || ""}`.trim();

      const payload = {
        name: fullName,
        email: values.email,
        phoneNumber: values.phoneNumber || "",
        address: {
          country: values.country || "",
          cityState: values.cityState || "",
          roadArea: values.roadArea || "",
        },
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data: UpdateProfileResponse = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message || "Failed to update profile");
      }

      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "Profile updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error) => {
      toast.error(error.message || "Update failed");
    },
  });

  const profileData = queryClient.getQueryData<UserProfileResponse>(["user-profile"]);

  React.useEffect(() => {
    const currentData = profileData?.data;
    if (!currentData) return;

    const { firstName, lastName } = splitName(currentData.name);

    form.reset({
      firstName,
      lastName,
      phoneNumber: currentData.phoneNumber || "",
      email: currentData.email || "",
      country: currentData.address?.country || "",
      cityState: currentData.address?.cityState || "",
      roadArea: currentData.address?.roadArea || "",
    });
  }, [profileData, form]);

  const onSubmit = (values: ProfileFormValues) => {
    mutate(values);
  };

  if (isLoading) {
    return (
      <div className="rounded-[8px] border border-[#E4E4E4] bg-white p-6">
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="flex items-center gap-3 text-slate-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading profile...</span>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-[8px] border border-[#E4E4E4] bg-white p-6">
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
          <p className="text-sm text-red-500">Failed to load profile data.</p>
          <Button onClick={() => refetch()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[8px] border border-[#E4E4E4] bg-white p-6 shadow-sm">
      <h3 className="pb-6 text-lg font-semibold leading-normal text-[#252471]">
        Personal Information
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#4B5563]">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter first name"
                      className="h-[48px] rounded-[8px] border border-[#CECECE] text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#4B5563]">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter last name"
                      className="h-[48px] rounded-[8px] border border-[#CECECE] text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#4B5563]">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="+880-123456789"
                      className="h-[48px] rounded-[8px] border border-[#CECECE] text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#4B5563]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email"
                      className="h-[48px] rounded-[8px] border border-[#CECECE] text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#4B5563]">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter country"
                      className="h-[48px] rounded-[8px] border border-[#CECECE] text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cityState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#4B5563]">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter city"
                      className="h-[48px] rounded-[8px] border border-[#CECECE] text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="roadArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#4B5563]">
                  Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter address"
                    className="h-[48px] rounded-[8px] border border-[#CECECE] text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="h-[44px] min-w-[168px] rounded-[8px] bg-[#12B5D3] px-8 text-base font-medium text-white hover:bg-[#0ea5c0]"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}