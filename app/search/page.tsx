"use client"

import type React from "react"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { StarRating } from "@/components/star-rating"
import { Input } from "@/components/ui/input"
import Footer from "@/components/footer"

const ALL_PRODUCTS = [
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
  {
    id: 5,
    name: "Night Renewal Mask",
    category: "Masks",
    price: 68,
    image: "/luxury-skincare-night-mask.jpg",
    description: "Intensive overnight recovery treatment",
    likes: 456,
    rating: 4.8,
  },
]

export default function SearchPage() {
  const { addItem } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase()
    return ALL_PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query),
    )
  }, [searchQuery])

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    addItem({ ...product, quantity: 1 })
    setAddedToCart(product.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <main className="pt-20 pb-20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Search Header */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 text-balance">
                Discover Your Skincare
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Search our collection to find the perfect skincare products for your routine
              </p>

              <div className="max-w-md mx-auto mb-12">
                <Input
                  type="text"
                  placeholder="Search by product name, category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl bg-secondary/50 border-accent/30 text-foreground placeholder:text-muted-foreground h-12 px-6"
                />
              </div>
            </div>

            {/* Results */}
            {searchQuery.trim() ? (
              <div>
                {filteredProducts.length > 0 ? (
                  <>
                    <div className="mb-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        Found <span className="font-semibold text-foreground">{filteredProducts.length}</span> result
                        {filteredProducts.length !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {filteredProducts.map((product, idx) => (
                        <Link key={product.id} href={`/product/${product.id}`}>
                          <div
                            className="group cursor-pointer animate-fade-in"
                            style={{ animationDelay: `${idx * 100}ms` }}
                          >
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
                  </>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-lg text-muted-foreground mb-6">
                      No products found matching "<span className="font-semibold text-foreground">{searchQuery}</span>"
                    </p>
                    <p className="text-sm text-muted-foreground mb-8">
                      Try searching for different keywords or browse our full collection
                    </p>
                    <Link href="/shop">
                      <Button className="rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90">
                        Browse All Products
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">Start typing to search our skincare collection</p>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
