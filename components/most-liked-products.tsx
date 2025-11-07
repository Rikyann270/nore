"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { StarRating } from "@/components/star-rating"

const MOST_LIKED = [
  {
    id: 2,
    name: "Renewal Cream",
    category: "Moisturizers",
    price: 72,
    image: "/luxury-skincare-cream-jar.jpg",
    description: "Rich, restorative facial moisturizer",
    likes: 1240,
    rating: 4.9,
  },
  {
    id: 1,
    name: "Clarity Serum",
    category: "Serums",
    price: 58,
    image: "/luxury-skincare-serum-bottle.jpg",
    description: "Lightweight essence for radiant skin",
    likes: 1089,
    rating: 4.8,
  },
  {
    id: 4,
    name: "Essence Oil",
    category: "Oils",
    price: 65,
    image: "/luxury-skincare-face-oil.jpg",
    description: "Nourishing botanical oil blend",
    likes: 856,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Gentle Cleanser",
    category: "Cleansers",
    price: 44,
    image: "/luxury-skincare-cleanser.jpg",
    description: "Soft gel cleanser for daily ritual",
    likes: 723,
    rating: 4.7,
  },
]

export default function MostLikedProducts() {
  const { addItem } = useCart()
  const [likedByUser, setLikedByUser] = useState<number[]>([])

  const handleLike = (productId: number) => {
    setLikedByUser((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-secondary/50 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-xs tracking-widest text-accent mb-3 uppercase font-sans font-semibold">
            Customer Favorites
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-4 text-balance">Most Loved</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed font-sans">
            Discover what our community is loving most
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOST_LIKED.map((product, idx) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <Link href={`/product/${product.id}`} className="group">
                <div className="relative h-80 bg-gradient-to-br from-secondary/50 to-accent/20 rounded-2xl overflow-hidden mb-4 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-300"
                  />

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleLike(product.id)
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all text-lg shadow-md"
                  >
                    {likedByUser.includes(product.id) ? "♥" : "♡"}
                  </button>
                </div>
              </Link>
              <p className="text-xs tracking-widest text-accent mb-2 uppercase font-sans font-semibold">
                {product.category}
              </p>
              <Link href={`/product/${product.id}`}>
                <h3 className="text-lg font-serif font-light mb-1 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground mb-3 font-sans">{product.description}</p>
              <div className="mb-3">
                <StarRating rating={product.rating} />
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-serif font-light">${product.price}</p>
                <p className="text-xs text-muted-foreground font-sans">{product.likes} likes</p>
              </div>
              <Button
                onClick={() => addItem({ ...product, quantity: 1 })}
                variant="outline"
                className="w-full rounded-2xl btn-underline bg-accent/10 hover:bg-accent/20 text-accent border-accent/30 hover:border-accent"
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
