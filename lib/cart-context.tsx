"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  category?: string
  description?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  total: number
  clearCart: () => void
  wishlist: CartItem[]
  addToWishlist: (item: CartItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem("nore-cart")
    const savedWishlist = localStorage.getItem("nore-wishlist")

    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to load cart:", error)
      }
    }

    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Failed to load wishlist:", error)
      }
    }

    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("nore-cart", JSON.stringify(items))
    }
  }, [items, isHydrated])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("nore-wishlist", JSON.stringify(wishlist))
    }
  }, [wishlist, isHydrated])

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i))
      }
      return [...prev, item]
    })
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeItem(id)
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
    }
  }

  const addToWishlist = (item: CartItem) => {
    setWishlist((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      return existing ? prev : [...prev, item]
    })
  }

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id))
  }

  const isInWishlist = (id: number) => {
    return wishlist.some((i) => i.id === id)
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        total,
        clearCart,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
