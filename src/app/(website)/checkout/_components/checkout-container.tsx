"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCart } from "@/components/context/cart-context";
import { DeliveryInfo } from "@/components/types/cart";

export default function CheckoutContainer() {
  const router = useRouter();
  const { cartItems, saveDeliveryInfo, deliveryInfo } = useCart();

  const [form, setForm] = useState<DeliveryInfo>(
    deliveryInfo ?? {
      type: "home",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      city: "",
      area: "",
      address: "",
    }
  );

  useEffect(() => {
    if (cartItems.length === 0) {
      router.replace("/cart");
    }
  }, [cartItems, router]);

  const handleChange = (key: keyof DeliveryInfo, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleProceed = () => {
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.city.trim() ||
      !form.area.trim() ||
      !form.address.trim()
    ) {
      toast.error("Please fill all delivery information");
      return;
    }

    saveDeliveryInfo(form);
    router.push("/payment");
  };

  if (cartItems.length === 0) return null;

  return (
    <main className="min-h-screen bg-[#eaf6fa] py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-primary">Delivery Information</h2>

          <div className="mt-4 flex items-center gap-4 text-sm text-slate-700">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={form.type === "home"}
                onChange={() => handleChange("type", "home")}
              />
              Home
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={form.type === "office"}
                onChange={() => handleChange("type", "office")}
              />
              Office
            </label>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Input
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />

            <Input
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />

            <Input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />

            <Input
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />

            <Input
              placeholder="City"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />

            <Input
              placeholder="Area"
              value={form.area}
              onChange={(e) => handleChange("area", e.target.value)}
            />
          </div>

          <div className="mt-4">
            <Input
              placeholder="Address"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              className="h-10 min-w-[140px] bg-sky-500 text-white hover:bg-sky-600"
              onClick={handleProceed}
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}