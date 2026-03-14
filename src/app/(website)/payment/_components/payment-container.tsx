"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from "@/components/context/cart-context";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

type PaymentMethod = "stripe" | "cod";

type DeliveryInfo = {
  type: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  address: string;
};

type CartItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  inStock?: number;
  size?: string[] | string;
  quantity: number;
};

type OrderResponse = {
  status: boolean;
  message: string;
  data?: {
    type?: string;
    url?: string;
    order?: unknown;
  };
};

export default function PaymentContainer() {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken?: string })?.accessToken;

  const router = useRouter();
  const { subtotal, clearOrderData } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

  const getCartItemsFromStorage = (): CartItem[] => {
    try {
      const raw = localStorage.getItem("product_cart");
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (error) {
      console.error("Failed to parse product_cart:", error);
      return [];
    }
  };

  const getDeliveryInfoFromStorage = (): DeliveryInfo | null => {
    try {
      const raw = localStorage.getItem("product_delivery_info");
      if (!raw) return null;

      const parsed = JSON.parse(raw);

      return {
        type: parsed?.type || "",
        firstName: parsed?.firstName || "",
        lastName: parsed?.lastName || "",
        phone: parsed?.phone || "",
        email: parsed?.email || "",
        city: parsed?.city || "",
        area: parsed?.area || "",
        address: parsed?.address || "",
      };
    } catch (error) {
      console.error("Failed to parse product_delivery_info:", error);
      return null;
    }
  };

  const clearCheckoutStorage = () => {
    localStorage.removeItem("product_cart");
    localStorage.removeItem("product_delivery_info");
  };

  const cartItems = useMemo(() => {
    if (typeof window === "undefined") return [];
    return getCartItemsFromStorage();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const items = getCartItemsFromStorage();
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [router]);

  const buildOrderPayload = (paymentMethod: PaymentMethod) => {
    const items = getCartItemsFromStorage();
    const delivery = getDeliveryInfoFromStorage();

    if (!items.length) {
      throw new Error("Cart is empty");
    }

    if (!delivery) {
      throw new Error("Delivery information not found");
    }

    const mappedItems = items.map((item) => ({
      productId: item.id,
      size: Array.isArray(item.size) ? item.size[0] || "" : item.size || "",
      quantity: item.quantity,
    }));

    return {
      items: mappedItems,
      delivery,
      paymentMethod,
    };
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-order"],
    mutationFn: async (paymentMethod: PaymentMethod): Promise<OrderResponse> => {
      const payload = buildOrderPayload(paymentMethod);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data?.status) {
        throw new Error(data?.message || "Failed to create order");
      }

      return data;
    },
    onSuccess: (data, paymentMethod) => {
      if (paymentMethod === "stripe") {
        const stripeUrl = data?.data?.url;

        if (!stripeUrl) {
          setSelectedPayment(null);
          toast.error("Stripe checkout URL not found");
          return;
        }

        window.location.href = stripeUrl;
        return;
      }

      if (paymentMethod === "cod") {
        clearOrderData();
        clearCheckoutStorage();

        toast.success("Order placed successfully");
        router.push("/products");
      }

      setSelectedPayment(null);
    },
    onError: (error: Error) => {
      setSelectedPayment(null);
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleStripePayment = () => {
    if (isPending) return;
    setSelectedPayment("stripe");
    mutate("stripe");
  };

  const handleCashOnDelivery = () => {
    if (isPending) return;
    setSelectedPayment("cod");
    mutate("cod");
  };

  if (cartItems.length === 0) return null;

  const isStripeLoading = isPending && selectedPayment === "stripe";
  const isCodLoading = isPending && selectedPayment === "cod";

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
                disabled={isPending}
              >
                {isStripeLoading ? "Processing Stripe..." : "Stripe"}
              </Button>

              <Button
                variant="outline"
                className="h-16 min-w-[140px] border-slate-300 text-slate-500"
                onClick={handleCashOnDelivery}
                disabled={isPending}
              >
                {isCodLoading ? "Placing Order..." : "Cash On Delivery"}
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


// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { useCart } from "@/components/context/cart-context";

// export default function PaymentContainer() {
//   const router = useRouter();
//   const { cartItems, subtotal, clearOrderData } = useCart();

//   useEffect(() => {
//     if (cartItems.length === 0) {
//       router.replace("/cart");
//     }
//   }, [cartItems, router]);

//   const handleStripePayment = async () => {
//     try {
//       // later তোমার stripe api hit এখানে করবে
//       // await fetch("/api/stripe", { method: "POST", body: JSON.stringify(...) })

//       clearOrderData();
//       toast.success("Stripe payment completed");
//       router.push("/products");
//     } catch (error) {
//       console.error(error);
//       toast.error("Stripe payment failed");
//     }
//   };

//   const handleCashOnDelivery = () => {
//     clearOrderData();
//     toast.success("Order placed successfully");
//     router.push("/products");
//   };

//   if (cartItems.length === 0) return null;

//   return (
//     <main className="min-h-screen bg-[#eaf6fa] py-10 md:py-14">
//       <div className="container mx-auto px-4">
//         <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
//           <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
//             <h2 className="text-sm font-medium text-slate-900">Select Payment</h2>

//             <div className="mt-4 flex flex-wrap gap-3">
//               <Button
//                 variant="outline"
//                 className="h-16 min-w-[140px] border-slate-300 text-sky-500"
//                 onClick={handleStripePayment}
//               >
//                 Stripe
//               </Button>

//               <Button
//                 variant="outline"
//                 className="h-16 min-w-[140px] border-slate-300 text-slate-500"
//                 onClick={handleCashOnDelivery}
//               >
//                 Cash On Delivery
//               </Button>
//             </div>
//           </div>

//           <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
//             <h3 className="text-lg font-semibold text-slate-900">Order Summary</h3>

//             <div className="mt-5 flex items-center justify-between text-sm font-semibold">
//               <span>Total</span>
//               <span className="text-primary">${subtotal.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }