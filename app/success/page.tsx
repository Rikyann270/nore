"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

function SuccessContent() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-light tracking-tight mb-4">Order Confirmed</h1>
        <p className="text-lg text-muted-foreground mb-2">Thank you for your purchase</p>
        <p className="text-sm text-muted-foreground mb-8">
          A confirmation email has been sent to your email address. Your order will be processed and shipped within 2-3
          business days.
        </p>

        <div className="space-y-3">
          <Link href="/shop">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SuccessContent />
    </Suspense>
  )
}
