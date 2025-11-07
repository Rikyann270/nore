"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { useRouter } from "next/navigation"
import { BaggageClaim } from 'lucide-react';

const Scene3D = dynamic(() => import("./scene-3d"), { ssr: false })

export default function Hero() {
  const router = useRouter()

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Fallback Image */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1748543668676-ea8241cb3886?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1615"
      >
        <source src="././page_utilities/video_bg.mp4" type="video/mp4" />
        {/* Fallback image if video not supported */}
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />

      {/* 3D Elements */}
{/*      <Suspense fallback={null}>
        <div className="absolute inset-0 z-0">
          <Scene3D />
        </div>
      </Suspense>*/}

      {/* Text + Buttons */}
      <div className="relative z-10 mt-100 text-center max-w-2xl mx-auto px-4 space-y-6">
      <h1 className="text-6xl md:text-7xl font-serif font-light tracking-tight text-balance animate-fade-in mix-blend-difference text-white">
        Everything Skin
      </h1>

        <p
          className="text-lg md:text-xl text-white/80 text-balance leading-relaxed animate-fade-in font-sans"
          style={{ animationDelay: "100ms" }}
        >
          From daily care to deep renewal — discover every product your skin could ask for.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <a
            href="/shop"
            className="px-8 py-3 bg-white text-primary rounded-2xl hover:bg-white/90 transition-all duration-300 font-medium btn-underline"
          >
            Explore Collection
          </a>
          <button className="px-8 py-3 border border-white text-white hover:bg-white/10 rounded-2xl transition-all font-medium btn-underline">
            Learn Our Story
          </button>
        </div>
      </div>
    </section>
  )
}
