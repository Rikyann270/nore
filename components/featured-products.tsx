"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { StarRating } from "@/components/star-rating"

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Clarity Serum",
    category: "Serums",
    price: 58,
    image: "/luxury-skincare-serum-bottle.jpg",
    description: "Lightweight essence for radiant skin",
    likes: 342,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Renewal Cream",
    category: "Moisturizers",
    price: 72,
    image: "/luxury-skincare-cream-jar.jpg",
    description: "Rich, restorative facial moisturizer",
    likes: 298,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Gentle Cleanser",
    category: "Cleansers",
    price: 44,
    image: "/luxury-skincare-cleanser.jpg",
    description: "Soft gel cleanser for daily ritual",
    likes: 267,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Essence Oil",
    category: "Oils",
    price: 65,
    image: "/luxury-skincare-face-oil.jpg",
    description: "Nourishing botanical oil blend",
    likes: 189,
    rating: 4.6,
  },
]

export default function FeaturedProducts() {
  const { addItem } = useCart()
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    addItem({ ...product, quantity: 1 })
    setAddedToCart(product.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-xs tracking-widest text-accent mb-3 uppercase font-sans font-semibold">
            Curated Selection
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-4 text-balance">
            Essential Rituals
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed font-sans">
            Discover our signature products designed for morning and evening rituals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product, idx) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="group cursor-pointer animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="relative h-80 bg-gradient-to-br from-secondary/50 to-accent/20 rounded-2xl overflow-hidden mb-4 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-300"
                  />
                </div>
                <p className="text-xs tracking-widest text-accent mb-2 uppercase font-sans font-semibold">
                  {product.category}
                </p>
                <h3 className="text-lg font-serif font-light mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 font-sans">{product.description}</p>
                <div className="mb-3">
                  <StarRating rating={product.rating} />
                </div>
                <p className="text-xs text-muted-foreground mb-4 font-sans">{product.likes} liked this</p>
                <div className="flex gap-2">
                  <p className="text-lg font-serif font-light flex-1">${product.price}</p>
                </div>
                <Button
                  onClick={(e) => handleAddToCart(e, product)}
                  variant={addedToCart === product.id ? "default" : "outline"}
                  className="w-full mt-4 rounded-2xl transition-all duration-300 bg-accent/10 hover:bg-accent/20 text-accent border-accent/30 hover:border-accent"
                >
                  {addedToCart === product.id ? (
                    <span className="flex items-center gap-2">✓ Added</span>
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/shop">
            <Button
              variant="outline"
              className="px-8 py-3 bg-transparent rounded-2xl btn-underline border-accent/30 text-accent hover:bg-accent/5"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
