"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: formData,
        }),
      })

      if (!response.ok) {
        throw new Error("Checkout failed")
      }

      const { sessionId } = await response.json()

      if (sessionId) {
        clearCart()
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-light mb-4">Your cart is empty</h1>
          <Link href="/shop" className="text-primary hover:underline font-sans">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-light tracking-tight mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleCheckout} className="space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-serif font-light mb-6">Contact Information</h2>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mb-4 bg-muted/30 border-border font-sans"
                />
              </div>

              {/* Shipping Information */}
              <div>
                <h2 className="text-xl font-serif font-light mb-6">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="bg-muted/30 border-border font-sans"
                  />
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="bg-muted/30 border-border font-sans"
                  />
                </div>
                <Input
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mb-4 bg-muted/30 border-border font-sans"
                />
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <Input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="bg-muted/30 border-border font-sans"
                  />
                  <Input
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="bg-muted/30 border-border font-sans"
                  />
                  <Input
                    name="zip"
                    placeholder="ZIP Code"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                    className="bg-muted/30 border-border font-sans"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="text-xl font-serif font-light mb-6">Payment</h2>
                <p className="text-sm text-muted-foreground mb-4 font-sans">
                  Click "Complete Purchase" to proceed to secure Stripe payment processing.
                </p>
              </div>

              <Button type="submit" disabled={loading} className="w-full py-6 text-lg">
                {loading ? "Processing..." : "Complete Purchase"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-muted/30 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-serif font-light mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
                    <div className="relative w-16 h-16 bg-background rounded flex-shrink-0 overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 font-sans">
                      <p className="font-light text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-light mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-6 font-sans">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-serif font-light border-t border-border pt-3 mt-3">
                  <span>Total</span>
                  <span>${(total * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
