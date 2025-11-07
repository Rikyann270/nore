"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addItem } = useCart()

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-serif font-light tracking-tight mb-12">My Wishlist</h1>
          <div className="text-center py-20">
            <div className="text-6xl text-muted-foreground mx-auto mb-4 opacity-30">♡</div>
            <p className="text-lg text-muted-foreground font-sans mb-6">Your wishlist is empty</p>
            <Link href="/shop">
              <Button>Explore Products</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = (item: any) => {
    addItem({ ...item, quantity: 1, images: undefined })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-light tracking-tight mb-12">My Wishlist</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <div key={item.id} className="group animate-fade-in">
              <div className="relative h-64 bg-muted rounded-2xl overflow-hidden mb-4 shadow-sm transition-all duration-300 group-hover:shadow-md">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-300"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 p-2 bg-background/80 hover:bg-background rounded-full transition-colors text-lg"
                >
                  ♥
                </button>
              </div>

              <Link href={`/product/${item.id}`}>
                <h3 className="font-serif font-light text-lg hover:text-accent transition-colors">{item.name}</h3>
              </Link>
              <p className="text-muted-foreground text-sm mb-3 font-sans">{item.category}</p>
              <p className="text-lg font-serif font-light mb-4">${item.price}</p>

              <div className="space-y-2">
                <Button onClick={() => handleAddToCart(item)} className="w-full">
                  Add to Cart
                </Button>
                <Button
                  onClick={() => removeFromWishlist(item.id)}
                  variant="outline"
                  className="w-full bg-transparent font-sans"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
