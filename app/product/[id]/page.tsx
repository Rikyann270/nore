"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

const PRODUCTS: Record<number, any> = {
  1: {
    id: 1,
    name: "Clarity Serum",
    category: "Serums",
    price: 58,
    images: [
      "/luxury-skincare-serum-bottle.jpg",
      "/luxury-skincare-serum-bottle.jpg",
      "/luxury-skincare-serum-bottle.jpg",
    ],
    description: "Lightweight essence for radiant skin",
    fullDescription:
      "Formulated with hyaluronic acid and botanical extracts, our Clarity Serum delivers deep hydration and promotes a brighter, more even complexion. Perfect for morning and evening rituals.",
    ingredients: ["Hyaluronic Acid", "Green Tea Extract", "Vitamin C", "Niacinamide", "Squalane"],
    size: "30ml",
    skinType: "All skin types",
    image: "/luxury-skincare-serum-bottle.jpg",
  },
  2: {
    id: 2,
    name: "Renewal Cream",
    category: "Moisturizers",
    price: 72,
    images: ["/luxury-skincare-cream-jar.jpg", "/luxury-skincare-cream-jar.jpg", "/luxury-skincare-cream-jar.jpg"],
    description: "Rich, restorative facial moisturizer",
    fullDescription:
      "A luxurious moisturizer that nourishes and repairs. Infused with botanical oils and peptides to restore elasticity and smooth texture.",
    ingredients: ["Shea Butter", "Peptides", "Rose Hip Oil", "Vitamin E", "Ceramides"],
    size: "50ml",
    skinType: "Dry to combination",
    image: "/luxury-skincare-cream-jar.jpg",
  },
  3: {
    id: 3,
    name: "Gentle Cleanser",
    category: "Cleansers",
    price: 44,
    images: ["/luxury-skincare-cleanser.jpg", "/luxury-skincare-cleanser.jpg", "/luxury-skincare-cleanser.jpg"],
    description: "Soft gel cleanser for daily ritual",
    fullDescription:
      "A gentle yet effective cleansing gel that removes makeup and impurities without disrupting the skin barrier. Perfect for sensitive skin.",
    ingredients: ["Micellar Water", "Chamomile Extract", "Aloe Vera", "Glycerin"],
    size: "200ml",
    skinType: "Sensitive to all",
    image: "/luxury-skincare-cleanser.jpg",
  },
  4: {
    id: 4,
    name: "Essence Oil",
    category: "Oils",
    price: 65,
    images: ["/luxury-skincare-face-oil.jpg", "/luxury-skincare-face-oil.jpg", "/luxury-skincare-face-oil.jpg"],
    description: "Nourishing botanical oil blend",
    fullDescription:
      "A precious blend of lightweight oils that deeply nourishes without clogging. Use as the final step in your skincare ritual.",
    ingredients: ["Jojoba Oil", "Argan Oil", "Rosemary Oil", "Vitamin A"],
    size: "30ml",
    skinType: "All skin types",
    image: "/luxury-skincare-face-oil.jpg",
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem, isInWishlist, addToWishlist, removeFromWishlist } = useCart()
  // const product = PRODUCTS[Number.parseInt(params.id)]



  const { id } = React.use(params)
   const product = PRODUCTS[Number.parseInt(id)]

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-light mb-4">Product not found</h1>
          <Link href="/shop" className="text-accent hover:underline font-sans">
            Return to shop
          </Link>
        </div>
      </div>
    )
  }
  const handleAddToCart = () => {
    addItem({ ...product, quantity, images: undefined })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({ ...product, quantity: 1, images: undefined })
    }
  }

  const inWishlist = isInWishlist(product.id)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link
          href="/shop"
          className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block btn-underline font-sans"
        >
          Back to shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative h-96 md:h-[600px] bg-muted rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx ? "border-accent" : "border-border"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                className="p-2 hover:bg-muted rounded-2xl transition-colors text-lg"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                className="p-2 hover:bg-muted rounded-2xl transition-colors text-lg"
              >
                →
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-3 uppercase font-sans">
                {product.category}
              </p>
              <h1 className="text-5xl font-serif font-light tracking-tight mb-6">{product.name}</h1>
              <p className="text-3xl font-serif font-light mb-6">${product.price}</p>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-sans">{product.fullDescription}</p>

              <div className="space-y-6 mb-8">
                <div>
                  <p className="text-sm font-medium mb-3 font-sans">Key Ingredients</p>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient: string) => (
                      <span
                        key={ingredient}
                        className="px-3 py-1 bg-muted text-sm rounded-full text-foreground font-sans"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-border font-sans">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Size</p>
                    <p className="font-light">{product.size}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Best For</p>
                    <p className="font-light">{product.skinType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 font-sans">
                <span className="text-sm">Quantity:</span>
                <div className="flex items-center gap-2 border border-border rounded-2xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-lg"
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              <Button
                onClick={handleAddToCart}
                className={`w-full py-6 text-lg rounded-2xl transition-all duration-300 ${
                  addedToCart ? "bg-accent" : ""
                }`}
              >
                {addedToCart ? <span className="flex items-center gap-2">✓ Added to Cart</span> : "Add to Cart"}
              </Button>
              <Button
                onClick={handleWishlist}
                variant="outline"
                className={`w-full py-6 text-lg bg-transparent rounded-2xl btn-underline transition-colors ${
                  inWishlist ? "bg-accent/10 border-accent" : ""
                }`}
              >
                <span className="mr-2 text-lg">{inWishlist ? "♥" : "♡"}</span>
                {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20 border-t border-border pt-20">
          <h2 className="text-3xl font-serif font-light tracking-tight mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {Object.values(PRODUCTS)
              .filter((p: any) => p.id !== product.id)
              .map((p: any, idx: number) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="relative h-64 bg-muted rounded-2xl overflow-hidden mb-4 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                    <Image
                      src={p.image || "/placeholder.svg"}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-serif font-light text-lg mb-1">{p.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3 font-sans">${p.price}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
