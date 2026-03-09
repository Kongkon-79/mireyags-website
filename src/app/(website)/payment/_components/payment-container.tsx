"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from "@/components/context/cart-context";

export default function PaymentContainer() {
  const router = useRouter();
  const { cartItems, subtotal, clearOrderData } = useCart();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.replace("/cart");
    }
  }, [cartItems, router]);

  const handleStripePayment = async () => {
    try {
      // later তোমার stripe api hit এখানে করবে
      // await fetch("/api/stripe", { method: "POST", body: JSON.stringify(...) })

      clearOrderData();
      toast.success("Stripe payment completed");
      router.push("/products");
    } catch (error) {
      console.error(error);
      toast.error("Stripe payment failed");
    }
  };

  const handleCashOnDelivery = () => {
    clearOrderData();
    toast.success("Order placed successfully");
    router.push("/products");
  };

  if (cartItems.length === 0) return null;

  return (
    <main className="min-h-screen bg-[#eaf6fa] py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-medium text-slate-900">Select Payment</h2>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="h-16 min-w-[140px] border-slate-300 text-sky-500"
                onClick={handleStripePayment}
              >
                Stripe
              </Button>

              <Button
                variant="outline"
                className="h-16 min-w-[140px] border-slate-300 text-slate-500"
                onClick={handleCashOnDelivery}
              >
                Cash On Delivery
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Order Summary</h3>

            <div className="mt-5 flex items-center justify-between text-sm font-semibold">
              <span>Total</span>
              <span className="text-primary">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}