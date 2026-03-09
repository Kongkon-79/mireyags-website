"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/context/cart-context";

export default function CartContainer() {
  const {
    cartItems,
    subtotal,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useCart();

  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#eaf6fa] py-10 md:py-14">
      <div className="container mx-auto px-4">
        {cartItems.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h1 className="text-2xl font-semibold text-slate-900">Your cart is empty</h1>
            <p className="mt-3 text-slate-500">Add some products to continue shopping.</p>
            <Button
              className="mt-6 bg-sky-500 text-white hover:bg-sky-600"
              onClick={() => router.push("/products")}
            >
              Go to Products
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_290px]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[180px_1fr]"
                >
                  <div className="relative h-[180px] w-full overflow-hidden rounded-md bg-slate-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">{item.name}</h2>
                      <p className="mt-2 text-sm text-slate-500">
                        {item.description}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ${(item.price + 20).toFixed(0)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex h-9 w-[110px] items-center justify-between rounded-md border border-primary px-3 text-primary">
                        <button
                          type="button"
                          onClick={() => decrementQuantity(item.id)}
                          className="transition hover:opacity-70"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="text-sm font-medium">{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() => incrementQuantity(item.id)}
                          className="transition hover:opacity-70"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <Button
                        variant="secondary"
                        className="mt-3 h-9 min-w-[140px] bg-[#a7a7a7] text-white hover:bg-[#929292]"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Order Summary</h3>

              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping Cost</span>
                  <span>$0</span>
                </div>

                <div className="border-t border-slate-200 pt-3 font-semibold text-primary">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                className="mt-6 h-11 w-full bg-sky-500 text-white hover:bg-sky-600"
                onClick={() => router.push("/checkout")}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}