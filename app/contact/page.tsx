"use client"

import type React from "react"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Cart from "@/components/cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [showCart, setShowCart] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form:", formData)
    alert("Thank you for reaching out! We'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/*<Navbar onCartClick={() => setShowCart(!showCart)} />*/}
      {showCart && <Cart onClose={() => setShowCart(false)} />}

      <main>
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="mb-16 text-center">
            <p className="text-sm tracking-widest text-muted-foreground mb-4 uppercase">Get in Touch</p>
            <h1 className="text-5xl font-light tracking-tight mb-6 text-balance">We'd love to hear from you</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <div className="flex gap-4 mb-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-light text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground">hello@nore.com</p>
                    <p className="text-muted-foreground">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex gap-4 mb-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-light text-lg mb-1">Phone</h3>
                    <p className="text-muted-foreground">+256 761495876</p>
                    <p className="text-muted-foreground">Monday - Saturday, 9am - 5pm EST</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex gap-4 mb-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-light text-lg mb-1">Location</h3>
                    <p className="text-muted-foreground">Ssali Road, Ntinda, UG</p>
                    <p className="text-muted-foreground">Available for partnerships and Wholesale</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-muted/40 rounded-lg p-8 border border-border">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input
                  type="text"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background min-h-32"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
