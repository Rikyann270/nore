"use client"

// import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Cart from "@/components/cart"
import { useState } from "react"

export default function AboutPage() {
  const [showCart, setShowCart] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/*<Navbar onCartClick={() => setShowCart(!showCart)} />*/}
      {showCart && <Cart onClose={() => setShowCart(false)} />}

      <main>
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="mb-16">
            <p className="text-sm tracking-widest text-muted-foreground mb-4 uppercase">About Nore</p>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">
              Skincare as a ritual, not a chore
            </h1>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-light mb-4">Our Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Nore was born from a simple observation: most skincare routines feel rushed and impersonal. We believed
                there had to be a better way—one that celebrates the ritual and respects both your skin and the planet.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In 2020, we started formulating products with intention. Each ingredient selected for its efficacy and
                purity. Each formula designed to be both effective and a pleasure to use.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-light mb-4">Our Values</h2>
              <ul className="space-y-3">
                {[
                  "Clean, transparent ingredient sourcing",
                  "Sustainable and recyclable packaging",
                  "Dermatologist-approved formulations",
                  "Supporting ethical beauty practices",
                  "Creating moments of mindfulness",
                ].map((value, idx) => (
                  <li key={idx} className="flex gap-3 text-lg text-muted-foreground">
                    <span className="text-primary">→</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-light mb-4">Our Commitment</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're committed to creating skincare that works as beautifully as it looks. Every product is tested,
                every ingredient sourced responsibly, and every ritual designed to bring a moment of calm to your day.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
