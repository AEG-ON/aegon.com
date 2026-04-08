import { useFrame, useThree } from '@react-three/fiber'
import { useAppStore } from '../store'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'

export function CameraManager() {
  const { activeSection } = useAppStore()
  const { camera } = useThree()
  const targetPosition = useRef(new THREE.Vector3(0, 0, 10))
  const targetRotation = useRef(new THREE.Euler(0, 0, 0))

  useEffect(() => {
    switch (activeSection) {
      case 'home':
        targetPosition.current.set(0, 0, 10)
        targetRotation.current.set(0, 0, 0)
        break
      case 'dna':
        targetPosition.current.set(5, 2, 8)
        targetRotation.current.set(0, 0.5, 0)
        break
      case 'services':
        targetPosition.current.set(-5, -2, 12)
        targetRotation.current.set(0, -0.4, 0)
        break
      case 'portfolio':
        targetPosition.current.set(0, 0.15, 7.4)
        targetRotation.current.set(0, 0, 0)
        break
      case 'contact':
        targetPosition.current.set(0, 0, 8)
        targetRotation.current.set(0, 0, 0)
        break
      default:
        targetPosition.current.set(0, 0, 10)
        targetRotation.current.set(0, 0, 0)
    }
  }, [activeSection])

  useFrame((state, delta) => {
    // Interpolação suave (Damping) para movimento de câmera fluido
    state.camera.position.lerp(targetPosition.current, 2 * delta)
    
    // Para rotação, usamos Quaternion para evitar Gimbal Lock, mas para simplicidade aqui usaremos lerp em Euler convertido
    // Nota: Lerp direto em rotação pode ser tricky, idealmente usaria Quaternion.slerp
    // Vamos simplificar movendo apenas posição por enquanto para garantir estabilidade, 
    // ou usar lookAt se quisermos focar no centro (0,0,0)
    
    // Opção: Câmera sempre olha para (0,0,0) ou um ponto de interesse
    state.camera.lookAt(0, 0, 0)
    
    // Se quisermos rotação customizada além do lookAt:
    // state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, targetRotation.current.x, 2 * delta)
    // state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, targetRotation.current.y, 2 * delta)
  })

  return null
}
