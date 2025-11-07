"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"

interface CartProps {
  onClose: () => void
}

export default function Cart({ onClose }: CartProps) {
  const { items, removeItem, updateQuantity, total } = useCart()

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/30" onClick={onClose} />

      {/* Cart Panel */}
      <div className="w-full max-w-md bg-background border-l border-border flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-light font-serif">Shopping Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors text-lg">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 font-sans">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                <div className="relative w-20 h-20 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 font-sans">
                  <h3 className="font-light mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">${item.price}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="w-6 h-6 flex items-center justify-center border border-border rounded hover:bg-muted"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center border border-border rounded hover:bg-muted"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-xs text-muted-foreground hover:text-foreground"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4 font-sans">
            <div className="flex justify-between text-lg font-serif">
              <span className="font-light">Total:</span>
              <span className="font-light">${total.toFixed(2)}</span>
            </div>
            <Link href="/checkout" onClick={onClose}>
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
            <Button variant="outline" className="w-full bg-transparent" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
