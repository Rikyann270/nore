"use client"

import type React from "react"

// import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Cart from "@/components/cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function ConsultPage() {
  const [showCart, setShowCart] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skinType: "",
    concerns: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Consultation request:", formData)
    alert("Thank you! We'll be in touch soon with personalized recommendations.")
    setFormData({ name: "", email: "", skinType: "", concerns: "" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/*<Navbar onCartClick={() => setShowCart(!showCart)} />*/}
      {showCart && <Cart onClose={() => setShowCart(false)} />}

      <main>
        <div className="max-w-2xl mx-auto px-4 py-20">
          <div className="mb-16 text-center">
            <p className="text-sm tracking-widest text-muted-foreground mb-4 uppercase">Free Consultation</p>
            <h1 className="text-5xl font-light tracking-tight mb-6 text-balance">Find your perfect routine</h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your skin and we'll recommend products tailored to your needs
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-muted/40 rounded-lg p-8 border border-border">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Skin Type</label>
              <select
                value={formData.skinType}
                onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                required
              >
                <option value="">Select your skin type</option>
                <option value="dry">Dry</option>
                <option value="oily">Oily</option>
                <option value="combination">Combination</option>
                <option value="sensitive">Sensitive</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Main Skin Concerns</label>
              <textarea
                placeholder="e.g., acne, aging, sensitivity, hydration..."
                value={formData.concerns}
                onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background min-h-24"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Get My Recommendations
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
