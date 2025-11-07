"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function EmailCapture() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store email or send to API
    console.log("Email captured:", email)
    setSubmitted(true)
    setEmail("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4 text-balance">Join Our Ritual</h2>
        <p className="text-muted-foreground mb-8">Get 25% off your first order and stay informed about new releases</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-background border-border"
          />
          <Button type="submit" className="px-8">
            {submitted ? "Subscribed!" : "Subscribe"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  )
}
