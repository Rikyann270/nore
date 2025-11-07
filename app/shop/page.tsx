"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import Footer from "@/components/footer"


import Cart from "@/components/cart"

const PRODUCTS = require("../products_db.json")

const CATEGORIES = ["All", "Serums", "Moisturizers", "Cleansers", "Oils", "Masks", "Toners", "Eye Care", "Sun Care"]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showCart, setShowCart] = useState(false)
  const { addItem } = useCart()

  const filtered = selectedCategory === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      {/*<Navbar onCartClick={() => setShowCart(!showCart)} />*/}
      {showCart && <Cart onClose={() => setShowCart(false)} />}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-16 border-b border-border">
        <h1 className="text-5xl font-light tracking-tight mb-3">Shop</h1>
        <p className="text-muted-foreground">Browse our complete collection of skincare essentials</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-12 flex gap-3 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="group cursor-pointer">
                <div className="relative h-80 bg-muted rounded-lg overflow-hidden mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs tracking-widest text-muted-foreground mb-2 uppercase">{product.category}</p>
                <h3 className="text-lg font-light mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <p className="text-lg font-light mb-4">UGX{product.price}</p>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    addItem({ ...product, quantity: 1 })
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Add to Cart
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
      
    </div>
  )
}
