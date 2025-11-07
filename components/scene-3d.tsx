"use client"

import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, Environment, Float } from "@react-three/drei"
import { useEffect, useState } from "react"

function BottleModel() {
  return (
    <mesh position={[0, 0, 0]}>
      {/* Bottle body */}
      <cylinderGeometry args={[0.4, 0.5, 2, 32]} />
      <meshStandardMaterial color="#cfaf95" metalness={0.6} roughness={0.3} />
    </mesh>
  )
}

function SphereOrb() {
  return (
    <mesh position={[3, 2, -2]}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial color="#e8d4c4" metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

function TorusRing() {
  return (
    <mesh position={[-3, 1, -1]} rotation={[0.5, 0.5, 0.3]}>
      <torusGeometry args={[0.8, 0.2, 16, 32]} />
      <meshStandardMaterial color="#d4a574" metalness={0.7} roughness={0.25} />
    </mesh>
  )
}

export default function Scene3D() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Canvas>
      <PerspectiveCamera position={[0, 0, 8]} fov={50} />
      <Environment preset="studio" />

      <Float speed={2} rotationIntensity={0.5} floatingRange={[-0.1, 0.1]}>
        <BottleModel />
      </Float>

      <Float speed={3} rotationIntensity={0.3} floatingRange={[-0.15, 0.15]}>
        <SphereOrb />
      </Float>

      <Float speed={2.5} rotationIntensity={0.4} floatingRange={[-0.12, 0.12]}>
        <TorusRing />
      </Float>

      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
    </Canvas>
  )
}
