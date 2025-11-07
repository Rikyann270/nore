"use client"

import { useState } from "react"
import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import MostLikedProducts from "@/components/most-liked-products"
import EmailCapture from "@/components/email-capture"
import Footer from "@/components/footer"
import Cart from "@/components/cart"
import BenefitsSection from "@/components/benefits-section"
import TextureSection from "@/components/texture-section"
import TrustSection from "@/components/trust-section"

export default function Home() {
  const [showCart, setShowCart] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Cart Sidebar */}
      {showCart && <Cart onClose={() => setShowCart(false)} />}

      {/* Main Content */}
      <main>
        <Hero />
        <FeaturedProducts />
        <MostLikedProducts />
        <BenefitsSection />
        <TextureSection />
        <TrustSection />
        <EmailCapture />
      </main>

      <Footer />
    </div>
  )
}
