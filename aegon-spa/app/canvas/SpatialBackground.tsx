import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SpatialBackground() {
  const pointsRef = useRef<THREE.Points>(null)
  
  const particlesCount = 8000
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60
    }
    return pos
  }, [])

  const sizes = useMemo(() => {
    const s = new Float32Array(particlesCount)
    for (let i = 0; i < particlesCount; i++) {
      s[i] = Math.random()
    }
    return s
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      // Movimento orbital suave
      pointsRef.current.rotation.y += 0.0003
      pointsRef.current.rotation.x += 0.0001
      
      // Reatividade ao mouse (parallax suave)
      const targetX = state.mouse.x * 2
      const targetY = state.mouse.y * 2
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.05)
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.05)
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#0057ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
