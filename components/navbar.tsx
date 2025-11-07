"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import Cart from "@/components/cart"
import { ShoppingBag, Heart,Search } from 'lucide-react';

export default function Navbar() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const { items, wishlist } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlist.length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput)}`)
      setSearchInput("")
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#fff7f4] border-b border-border ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <Link href="/" className="italic text-2xl font-serif font-light tracking-tight">
            Noré
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 bg-muted/30 border-border rounded-2xl font-sans"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm"><Search /></span>
            </form>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-sm btn-underline transition-colors font-sans">
              Shop
            </Link>
            <Link href="/about" className="text-sm btn-underline transition-colors font-sans">
              About
            </Link>
            <Link href="/consult" className="text-sm btn-underline transition-colors font-sans">
              Consult
            </Link>
            <Link href="/contact" className="text-sm btn-underline transition-colors font-sans">
              Contact
            </Link>
            <Link href="/wishlist" className="relative p-2 hover:bg-muted/50 transition-colors rounded-2xl text-lg">
              <Heart className="h-4 w-4"/>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full text-xs flex items-center justify-center text-foreground font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 hover:bg-muted/50 transition-colors rounded-2xl text-lg"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full text-xs flex items-center justify-center text-foreground font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="absolute ml-20 md:hidden p-2 hover:bg-muted/50 transition-colors rounded-2xl text-lg"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

          <div className="md:hidden flex gap-2">

            <Link href="/wishlist" className="relative p-2 hover:bg-muted/50 transition-colors rounded-2xl text-lg">
              <Heart className="h-4 w-4"/>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full text-xs flex items-center justify-center text-foreground font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 hover:bg-muted/50 transition-colors rounded-2xl text-lg"
            >
               <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full text-xs flex items-center justify-center text-foreground font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Removed duplicate navigation, now only shows search */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border  bg-background">
            <div className="px-4 py-4 space-y-3 font-sans">
              <form onSubmit={handleSearch} className="relative w-full mb-3">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10 bg-muted/30 border-border rounded-2xl font-sans"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm"><Search /></span>
              </form>
              <Link href="/shop" className="block text-sm py-2 btn-underline" onClick={() => setMobileMenuOpen(false)}>
                Shop
              </Link>
              <Link href="/about" className="block text-sm py-2 btn-underline" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link
                href="/consult"
                className="block text-sm py-2 btn-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Consult
              </Link>
              <Link
                href="/contact"
                className="block text-sm py-2 btn-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </>
  )
}
