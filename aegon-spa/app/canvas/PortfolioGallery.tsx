import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const cards = [
  { id: 1, title: 'NEXUS SYSTEM', category: 'SaaS PLATFORM', year: '2025', color: '#1d4ed8' },
  { id: 2, title: 'VORTEX BRAND', category: 'IDENTIDADE VISUAL', year: '2025', color: '#2563eb' },
  { id: 3, title: 'LUMINA APP', category: 'MOBILE EXPERIENCE', year: '2024', color: '#3b82f6' },
  { id: 4, title: 'STRATOS DATA', category: 'BUSINESS INTELLIGENCE', year: '2024', color: '#60a5fa' },
]

function Card({
  title,
  category,
  year,
  color,
  x,
  z,
}: {
  title: string
  category: string
  year: string
  color: string
  x: number
  z: number
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const swayY = Math.sin(state.clock.elapsedTime * 0.8 + x) * 0.02
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, swayY, 0.08)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.mouse.x * 0.08, 0.06)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, state.mouse.y * 0.04, 0.06)
  })

  return (
    <group ref={ref} position={[x, 0, z]}>
      <mesh>
        <planeGeometry args={[3.8, 2.4]} />
        <meshBasicMaterial color="#0b1220" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[3.95, 2.55]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.9} />
      </mesh>
      <group position={[0, 0.28, 0.04]}>
        <Text fontSize={0.22} color="white" maxWidth={3.3} textAlign="center" anchorY="middle">
          {title}
        </Text>
      </group>
      <group position={[0, -0.16, 0.04]}>
        <Text fontSize={0.11} color="#bfdbfe" maxWidth={3.4} textAlign="center" anchorY="middle">
          {category} | {year}
        </Text>
      </group>
    </group>
  )
}

export function PortfolioGallery() {
  const rootRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!rootRef.current) return
    rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, state.mouse.x * 0.12, 0.04)
  })

  return (
    <group ref={rootRef} position={[0, -0.5, 0]}>
      <mesh position={[0, -1.8, -0.8]}>
        <planeGeometry args={[14, 0.08]} />
        <meshBasicMaterial color="#1d4ed8" transparent opacity={0.35} />
      </mesh>
      {cards.map((card, index) => {
        const spacing = 2.7
        const start = -((cards.length - 1) * spacing) / 2
        return (
          <Card
            key={card.id}
            title={card.title}
            category={card.category}
            year={card.year}
            color={card.color}
            x={start + index * spacing}
            z={-Math.abs(index - 1.5) * 0.32}
          />
        )
      })}
    </group>
  )
}
