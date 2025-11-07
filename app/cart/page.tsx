"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-serif font-light tracking-tight mb-12">Shopping Cart</h1>
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground font-sans mb-6">Your cart is empty</p>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-light tracking-tight mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 p-6 bg-muted/20 rounded-2xl">
                <div className="relative w-28 h-28 bg-background rounded-lg flex-shrink-0 overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-serif text-lg font-light hover:text-accent transition-colors">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground font-sans mt-1">{item.category}</p>
                    <p className="text-lg font-serif font-light mt-2">${item.price}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-border rounded-2xl p-1">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-lg font-sans"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-sans text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-lg font-sans"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-serif font-light text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-2 font-sans"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-muted/20 rounded-2xl p-8 sticky top-24 h-fit space-y-6">
              <h2 className="text-2xl font-serif font-light">Order Summary</h2>

              <div className="space-y-3 text-sm font-sans pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-serif font-light pt-4">
                <span>Total</span>
                <span>${(total * 1.1).toFixed(2)}</span>
              </div>

              <Link href="/checkout" className="block">
                <Button className="w-full py-6 text-base">Proceed to Checkout</Button>
              </Link>

              <Link href="/shop" className="block">
                <Button variant="outline" className="w-full py-6 text-base bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
